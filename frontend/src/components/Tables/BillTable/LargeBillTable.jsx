import PropTypes from "prop-types";
import { date } from "../../../utils/date-time";
import { addPaymentModalState } from "../../../states/paymentState";

const LargeBillTable = ({ billDatas }) => {
  const { openAddPaymentModal } = addPaymentModalState();

  return (
    <table className="w-full mb-4">
      <thead>
        <tr>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[15%]">
            Tagihan Iuran Untuk
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[15%]">
            Rumah Dihuni
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[20%]">
            Jenis Iuran
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[15%]">
            Tanggal Dibuat
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-center font-semibold w-[10%]">
            Status Tagihan
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-center font-semibold w-[10%]">
            Pembayaran
          </th>
        </tr>
      </thead>
      <tbody>
        {billDatas?.data?.map((bills) => {
          const { id, Resident, BillType, bill_date, bill_status } = bills;

          return (
            <tr key={id}>
              <td className="p-2 text-xs text-start border-b w-fit">{Resident?.full_name}</td>
              <td className="p-2 text-xs text-start border-b w-fit">
                {Resident?.House?.house_block} - No. {Resident?.House?.house_number}
              </td>
              <td className="p-2 text-xs text-start border-b w-fit">{BillType?.bill_type}</td>
              <td className="p-2 text-xs text-start border-b w-fit">{date(bill_date)}</td>
              <td className="p-2 text-xs text-center border-b w-fit">
                <p className={`${bill_status === "Belum Dibayar" ? "text-red-500" : "text-green-500"}`}>
                  {bill_status}
                </p>
              </td>
              <td className="p-2 text-xs text-center border-b w-fit">
                <button
                  disabled={bill_status === "Belum Dibayar" ? false : true}
                  onClick={() => openAddPaymentModal(bills)}
                  className="disabled:bg-zinc-400 py-3 px-5 rounded-md bg-main hover:bg-secondary leading-none text-white transition-colors duration-150">
                  {bill_status === "Belum Dibayar" ? "Pembayaran" : "Lunas"}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

LargeBillTable.propTypes = {
  billDatas: PropTypes.any,
};

export default LargeBillTable;
