import { useCallback, useEffect, useState } from "react";
import { ContentTitle, LargeResidentTable } from "../../components";
import { ResidentServices } from "../../services/ResidentServices";

const Residents = () => {
  const [residentDatas, setResidentDatas] = useState("");

  const fetchGetResidents = useCallback(async () => {
    try {
      const response = await ResidentServices.getResidents();

      setResidentDatas(response?.payload);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchGetResidents();
  }, [fetchGetResidents]);

  return (
    <div className="h-full">
      <div className="mb-8">
        <ContentTitle
          title="Data List Penghuni Rumah"
          description="Berikut ini merupakan data list dari penghuni yang terdaftar. Petugas dapat melihat tagihan, detail penghuni dan jumlah keluarga dalam satu rumah."
        />
      </div>
      <div className="bg-white rounded-md shadow-md px-4 py-2">
        <LargeResidentTable residentDatas={residentDatas} />
      </div>
    </div>
  );
};

export default Residents;
