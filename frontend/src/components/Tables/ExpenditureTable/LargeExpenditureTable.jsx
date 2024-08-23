import PropTypes from "prop-types";
import { date } from "../../../utils/date-time";
import { useEffect, useState } from "react";

const LargeExpenditureTable = ({ expenditureDatas }) => {
  const [totalAmountState, setTotalAmountState] = useState(0);

  useEffect(() => {
    let total = 0;
    expenditureDatas?.data?.forEach((expenditures) => {
      total += expenditures.expenditure_amount;
    });
    setTotalAmountState(total);
  }, [expenditureDatas]);

  return (
    <div>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[20%]">
              Penanggung Jawab Pengeluaran
            </th>
            <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[20%]">
              Kebutuhan Pengeluaran
            </th>
            <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[20%]">
              Tanggal Pengeluaran
            </th>
            <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-start font-semibold w-[20%]">
              Jumlah Pengeluaran
            </th>
            <th className="p-2 border-b border-zinc-300 text-xs text-zinc-500 text-center font-semibold w-[20%]">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {expenditureDatas?.data?.map((expenditures) => {
            const { id, User, expenditure_need, expenditure_amount, expenditure_date } = expenditures;

            return (
              <tr key={id}>
                <td className="p-2 text-xs text-start border-b w-fit">{User?.name}</td>
                <td className="p-2 text-xs text-start border-b w-fit">{expenditure_need}</td>
                <td className="p-2 text-xs text-start border-b w-fit">{date(expenditure_date)}</td>
                <td className="p-2 text-xs text-start border-b w-fit">Rp. {expenditure_amount}</td>

                <td className="p-2 text-xs text-center border-b w-fit">
                  <div className="flex justify-center items-center gap-3">
                    <button className="disabled:bg-zinc-400 py-3 px-5 rounded-md bg-orange-400 hover:bg-orange-500 leading-none text-white transition-colors duration-150">
                      Edit
                    </button>
                    <button className="disabled:bg-zinc-400 py-3 px-5 rounded-md bg-red-400 hover:bg-red-500 leading-none text-white transition-colors duration-150">
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="p-2 mb-4 flex justify-start items-center gap-5">
        <p className="text-sm font-semibold text-zinc-500">Total Pengeluaran</p>
        <p className="text-sm font-semibold">Rp. {totalAmountState}</p>
      </div>
    </div>
  );
};

LargeExpenditureTable.propTypes = {
  expenditureDatas: PropTypes.any,
};

export default LargeExpenditureTable;
