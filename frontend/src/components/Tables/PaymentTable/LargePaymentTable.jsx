import PropTypes from "prop-types";
import { date } from "../../../utils/date-time";

const LargePaymentTable = ({ paymentDatas }) => {
  return (
    <table className="w-full mb-4">
      <thead>
        <tr>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[30%]">
            Data Penghuni
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[30%]">
            Alamat Rumah
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[20%]">
            Jumlah Pembayaran
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[20%]">
            Tanggal Pembayaran
          </th>
        </tr>
      </thead>
      <tbody>
        {paymentDatas?.data?.map((payments) => {
          const { id, Bill, payment_amount, payment_date } = payments;

          return (
            <tr key={id}>
              <td className="p-2 text-xs text-start border-b w-fit">{Bill?.Resident?.full_name}</td>
              <td className="p-2 text-xs text-start border-b w-fit">
                {Bill?.Resident?.House?.house_block} No. {Bill?.Resident?.House?.house_number}
              </td>
              <td className="p-2 text-xs text-start border-b w-fit">Rp. {payment_amount}</td>
              <td className="p-2 text-xs text-start border-b w-fit">{date(payment_date)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

LargePaymentTable.propTypes = {
  paymentDatas: PropTypes.any,
};

export default LargePaymentTable;
