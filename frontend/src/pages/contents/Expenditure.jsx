import { AddCircleOutline } from "@mui/icons-material";
import { ContentTitle, LargeExpenditureTable } from "../../components";
import { useCallback, useEffect, useState } from "react";
import { ExpenditureServices } from "../../services/ExpenditureServices";
import { addExpenditureModalState } from "../../states/expenditureState";
import { refreshExpenditureData } from "../../states/refreshState";

const Expenditure = () => {
  const [expenditureDatas, setExpenditureDatas] = useState("");

  const { openAddExpenditureModal } = addExpenditureModalState();
  const { isRefresh, setRefresh } = refreshExpenditureData();

  const fetchGetExpendiutures = useCallback(async () => {
    try {
      const response = await ExpenditureServices.getExpenditures();

      setExpenditureDatas(response?.payload);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchGetExpendiutures();
  }, [fetchGetExpendiutures]);

  useEffect(() => {
    if (isRefresh === true) {
      fetchGetExpendiutures().finally(() => {
        setRefresh(false);
      });
    }
  }, [fetchGetExpendiutures, isRefresh]);

  return (
    <div>
      <div className="mb-8">
        <ContentTitle
          title="Manajemen Pengeluaran"
          description="Berikut ini merupakan tampilan manajemen pengeluaran yang dapat dikelola oleh petugas. Petugas dapat melakukan lihat, tambah, edit dan hapus pengeluaran."
        />
      </div>
      <div className="bg-white rounded-md shadow-md px-4 py-2 mb-6">
        <LargeExpenditureTable expenditureDatas={expenditureDatas} />
        <button
          onClick={() => openAddExpenditureModal()}
          className="py-3 px-5 rounded-md bg-main hover:bg-secondary transition-colors duration-150 text-white text-xs leading-none flex justify-center items-center gap-2">
          <AddCircleOutline fontSize="inherit" />
          Tambah Data Pengeluaran
        </button>
      </div>
    </div>
  );
};

export default Expenditure;
