import PropTypes from "prop-types";
import { previewIdentityCardModalState } from "../../../states/residentState";

const LargeResidentTable = ({ residentDatas }) => {
  const { openPreviewIdentityCardModal } = previewIdentityCardModalState();

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-center font-semibold w-[5%]">No</th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[20%]">
            Nama Penghuni
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[15%]">
            Rumah Dihuni
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[15%]">
            Status Penghuni
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[15%]">
            Status Pernikahan
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[15%]">
            Nomor Telepon
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-center font-semibold w-[15%]">
            Foto KTP
          </th>
        </tr>
      </thead>
      <tbody>
        {residentDatas?.data?.map((residents) => {
          const { id, full_name, resident_status, marital_status, phone_number, identity_card_image, House } =
            residents;

          return (
            <tr key={id}>
              <td className="p-2 text-xs text-center border-b w-fit">{id}</td>
              <td className="p-2 text-xs text-start border-b w-fit">{full_name}</td>
              <td className="p-2 text-xs text-start border-b w-fit">
                {House?.house_block} No. {House?.house_number}
              </td>
              <td className="p-2 text-xs text-start border-b w-fit">{resident_status}</td>
              <td className="p-2 text-xs text-start border-b w-fit">{marital_status}</td>
              <td className="p-2 text-xs text-start border-b w-fit">{phone_number}</td>
              <td className="p-2 text-xs text-center border-b w-fit">
                <button
                  onClick={() => openPreviewIdentityCardModal(identity_card_image)}
                  className="text-blue-500 hover:underline">
                  Lihat
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

LargeResidentTable.propTypes = {
  residentDatas: PropTypes.any,
};

export default LargeResidentTable;
