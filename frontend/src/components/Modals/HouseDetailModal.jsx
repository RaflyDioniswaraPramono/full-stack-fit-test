import { blockIcon, houseDetailImage, pointIcon } from "../../assets";
import { houseDetailState } from "../../states/houseDetailState";
import { Modal } from "antd";

const HouseDetailModal = () => {
  const { isHouseDetailModalOpen, houseData, closeHouseDetailModal } = houseDetailState();

  return (
    <Modal
      open={isHouseDetailModalOpen}
      onCancel={() => closeHouseDetailModal()}
      className="font-sans"
      title="Detail Data Rumah"
      footer={false}
      destroyOnClose
      width={1240}
      centered>
      <div className="mt-6 grid grid-cols-5 gap-5">
        <div className="col-span-3">
          <img src={houseDetailImage} alt="House Detail Image" className="rounded-xl w-full h-full object-cover" />
        </div>
        <div className="col-span-2">
          <div className="rounded-xl shadow-md py-6 px-5">
            <div className="mb-6 flex justify-start items-center gap-5">
              <img src={blockIcon} alt="Block Icon" className="w-full h-auto max-w-10" />
              <div>
                <h1 className="text-sm font-bold tracking-wide">Detail Data Penghuni Rumah</h1>
                <p className="text-xs text-zinc-500">
                  Detail penghuni rumah Kutorenon Indah {houseData?.house_block} No. {houseData?.house_number}
                </p>
              </div>
            </div>
            <div>
              <div className="mb-4 flex justify-start items-center gap-3">
                <img src={pointIcon} alt="Point Icon" className="w-full h-auto max-w-5" />
                <div>
                  <p className="text-sm mb-1">Nama Blok Rumah</p>
                  <p className="text-xs text-zinc-500">{houseData?.house_block}</p>
                </div>
              </div>
              <div className="mb-4 flex justify-start items-center gap-3">
                <img src={pointIcon} alt="Point Icon" className="w-full h-auto max-w-5" />
                <div>
                  <p className="text-sm mb-1">Nomor Rumah</p>
                  <p className="text-xs text-zinc-500">No. {houseData?.house_number}</p>
                </div>
              </div>
              <div className="mb-4 flex justify-start items-center gap-3">
                <img src={pointIcon} alt="Point Icon" className="w-full h-auto max-w-5" />
                <div>
                  <p className="text-sm mb-1">Alamat Rumah</p>
                  <p className="text-xs text-zinc-500">{houseData?.house_address}</p>
                </div>
              </div>
              <div className="mb-4 flex justify-start items-center gap-3">
                <img src={pointIcon} alt="Point Icon" className="w-full h-auto max-w-5" />
                <div>
                  <p className="text-sm mb-1">Nama Penghuni</p>
                  <p className="text-xs text-zinc-500">{houseData?.Resident ? houseData?.Resident?.full_name : "-"}</p>
                </div>
              </div>
              <div className="mb-4 flex justify-start items-center gap-3">
                <img src={pointIcon} alt="Point Icon" className="w-full h-auto max-w-5" />
                <div>
                  <p className="text-sm mb-1">Status Penghuni</p>
                  {houseData?.Resident ? (
                    <p className="text-xs text-green-600">{houseData?.Resident.resident_status}</p>
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
                    {houseData?.Resident ? houseData?.Resident.marital_status : "-"}
                  </p>
                </div>
              </div>
              <div className="mb-4 flex justify-start items-center gap-3">
                <img src={pointIcon} alt="Point Icon" className="w-full h-auto max-w-5" />
                <div>
                  <p className="text-sm mb-1">Nomor Telepon</p>
                  <p className="text-xs text-zinc-500">
                    {houseData?.Resident ? houseData?.Resident.phone_number : "Tidak Ada"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default HouseDetailModal;
