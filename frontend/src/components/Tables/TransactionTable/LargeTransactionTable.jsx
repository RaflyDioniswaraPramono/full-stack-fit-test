import PropTypes from "prop-types";
import { date } from "../../../utils/date-time";

const LargeTransactionTable = ({ transactionDatas }) => {
  return (
    <table className="w-full mb-4">
      <thead>
        <tr>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-center font-semibold w-[5%]">No</th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[30%]">
            Nama Transaksi
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[30%]">
            Tipe Transaksi
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[20%]">
            Jumlah Transaksi
          </th>
          <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[20%]">
            Tanggal Transaksi
          </th>
        </tr>
      </thead>
      <tbody>
        {transactionDatas?.data?.length > 0 ? (
          transactionDatas?.data?.map((payments, index) => {
            const { id, transaction_name, transaction_type, transaction_amount, transaction_date } = payments;

            return (
              <tr key={id}>
                <td className="p-2 text-xs text-center border-b w-fit">{index + 1}</td>
                <td className="p-2 text-xs text-start border-b w-fit">{transaction_name}</td>
                <td
                  className={`${
                    transaction_type === "Pemasukan" ? "text-green-500" : "text-red-500"
                  } p-2 text-xs text-start border-b w-fit`}>
                  {transaction_type}
                </td>
                <td
                  className={`${
                    transaction_type === "Pemasukan" ? "text-green-500" : "text-red-500"
                  } p-2 text-xs text-start border-b w-fit`}>
                  {transaction_type === "Pemasukan" ? `+ Rp. ${transaction_amount}` : `- Rp. ${transaction_amount}`}
                </td>
                <td className="p-2 text-xs text-start border-b w-fit">{date(transaction_date)}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={7} className="p-2 text-xs text-center border-b w-full">
              <p>Data histori transaksi tidak ditemukan!</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

LargeTransactionTable.propTypes = {
  transactionDatas: PropTypes.any,
};

export default LargeTransactionTable;
