import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HouseServices } from "../../services/HouseServices";
import { ContentTitle } from "../../components";
import { blockIcon, houseDetailImage, pointIcon } from "../../assets";
import { Settings } from "@mui/icons-material";
import { addResidentState } from "../../states/addResidentState";

const HouseDetail = () => {
  const { id } = useParams();

  const [houseData, setHouseData] = useState("");

  const { openAddResidentModal } = addResidentState();

  const fetchHouseById = useCallback(async () => {
    try {
      const response = await HouseServices.getHouseById(id);

      setHouseData(response);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchHouseById();
  }, [fetchHouseById]);

  return (
    <div>
      <div className="mb-6">
        <ContentTitle
          title="Detail Data Penghuni Rumah"
          description="Berikut ini merupakan tampilan data detail rumah dan penghuni. Data penghuni yang ditampilkan merupakan penghuni yang sudah melakukan pendaftaran, jika tidak ada penghuni maka rumah masih bisa ditambahkan penghuni baru."
        />
      </div>
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-3">
          <img src={houseDetailImage} alt="House Detail Image" className="rounded-xl w-full h-full object-cover" />
        </div>
        <div className="col-span-2">
          <div className="rounded-xl shadow-md py-6 px-5">
            <div className="mb-6 flex justify-start items-center gap-5">
              <img src={blockIcon} alt="Block Icon" className="w-full h-auto max-w-10" />
              <div>
                <h1 className="text-sm font-bold tracking-wide">Detail Data Penghuni Rumah</h1>
                <p className="text-xs text-zinc-500">Detail penghuni rumah Kutorenon Indah {houseData?.payload?.data?.house_block} No. {houseData?.payload?.data?.house_number}</p>
              </div>
            </div>
            <div>
              <div className="mb-4 flex justify-start items-center gap-3">
                <img src={pointIcon} alt="Point Icon" className="w-full h-auto max-w-5" />
                <div>
                  <p className="text-sm mb-1">Nama Blok Rumah</p>
                  <p className="text-xs text-zinc-500">{houseData?.payload?.data?.house_block}</p>
                </div>
              </div>
              <div className="mb-4 flex justify-start items-center gap-3">
                <img src={pointIcon} alt="Point Icon" className="w-full h-auto max-w-5" />
                <div>
                  <p className="text-sm mb-1">Nomor Rumah</p>
                  <p className="text-xs text-zinc-500">No. {houseData?.payload?.data?.house_number}</p>
                </div>
              </div>
              <div className="mb-4 flex justify-start items-center gap-3">
                <img src={pointIcon} alt="Point Icon" className="w-full h-auto max-w-5" />
                <div>
                  <p className="text-sm mb-1">Nama Penghuni</p>
                  <p className="text-xs text-zinc-500">{houseData?.payload?.data?.Resident ? houseData?.payload?.data?.Resident?.full_name : "-"}</p>
                </div>
              </div>
              <div className="mb-4 flex justify-start items-center gap-3">
                <img src={pointIcon} alt="Point Icon" className="w-full h-auto max-w-5" />
                <div>
                  <p className="text-sm mb-1">Status Penghuni</p>
                  {houseData?.payload?.data?.Resident ? (
                    <p className="text-xs text-green-600">{houseData?.payload?.data?.Resident.resident_status}</p>
                  ) : (
                    <p className="text-xs text-red-500">Tidak Dihuni</p>
                  )}
                </div>
              </div>
              <div className="mb-4 flex justify-start items-center gap-3">
                <img src={pointIcon} alt="Point Icon" className="w-full h-auto max-w-5" />
                <div>
                  <p className="text-sm mb-1">Status Pernikahan</p>
                  <p className="text-xs text-zinc-500">
                    {houseData?.payload?.data?.Resident ? houseData?.payload?.data?.Resident.marital_status : "-"}
                  </p>
                </div>
              </div>
              <div className="mb-4 flex justify-start items-center gap-3">
                <img src={pointIcon} alt="Point Icon" className="w-full h-auto max-w-5" />
                <div>
                  <p className="text-sm mb-1">Nomor Telepon</p>
                  <p className="text-xs text-zinc-500">
                    {houseData?.payload?.data?.Resident ? houseData?.payload?.data?.Resident.phone_number : "Tidak Ada"}
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => openAddResidentModal(houseData?.payload?.data?.id)}
                  className="py-3 px-5 flex justify-center items-center gap-2 rounded-md text-xs leading-none bg-main hover:bg-secondary transition-colors duration-150 text-white">
                  <Settings fontSize="small" /> Tambah Penghuni
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseDetail;
