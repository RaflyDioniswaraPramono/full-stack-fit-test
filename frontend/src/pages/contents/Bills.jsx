import { useCallback, useEffect, useState } from "react";
import { ContentTitle, LargeBillTable } from "../../components";
import { BillServices } from "../../services/BillServices";
import { AddCircleOutline } from "@mui/icons-material";
import { addBillModalState } from "../../states/billState";
import { refreshBillData } from "../../states/refreshState";

const Bills = () => {
  const [billDatas, setBillDatas] = useState("");

  const { openAddBillModal } = addBillModalState();
  const { isRefresh, setRefresh } = refreshBillData();

  const fetchBills = useCallback(async () => {
    try {
      const response = await BillServices.getBills();

      setBillDatas(response?.payload);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  useEffect(() => {
    if (isRefresh === true) {
      fetchBills().finally(() => {
        setRefresh(false);
      });
    }
  }, [fetchBills, isRefresh]);

  return (
    <div>
      <div className="mb-8">
        <ContentTitle
          title="Manajemen Tagihan Iuran"
          description="Berikut ini meripakan tampilan untuk memanajemen tagihan. Petugas dapat membuat, mengedit, melihat dan menghapus tagihan yang ada."
        />
      </div>
      <div className="bg-white rounded-md shadow-md px-4 py-2 mb-6">
        <LargeBillTable billDatas={billDatas} />
        <button
          onClick={() => openAddBillModal()}
          className="py-3 px-5 rounded-md bg-main hover:bg-secondary transition-colors duration-150 text-white text-xs leading-none flex justify-center items-center gap-2">
          <AddCircleOutline fontSize="inherit" />
          Tagihan Iuran Baru
        </button>
      </div>
    </div>
  );
};

export default Bills;
