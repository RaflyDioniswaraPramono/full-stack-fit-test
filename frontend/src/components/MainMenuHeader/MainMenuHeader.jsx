import { useCallback, useEffect, useState } from "react";
import { ResidentServices } from "../../services/ResidentServices";
import { TransactionServices } from "../../services/TransactionServices";

const MainMenuHeader = () => {
  const [residentDatas, setResidentDatas] = useState("");
  const [transactionDatas, setTransactionDatas] = useState([]);
  const [balance, setBalance] = useState(0);

  const fetchGetTransactions = useCallback(async () => {
    try {
      const response = await TransactionServices.getTransactions();

      const adjustedTransactions = response?.payload?.data?.map((transaction) => ({
        ...transaction,
        transaction_amount:
          transaction.transaction_type === "Pengeluaran"
            ? -(transaction.transaction_amount || 0)
            : transaction.transaction_amount || 0,
      }));

      setTransactionDatas(adjustedTransactions);
    } catch (error) {
      if (error?.response) {
        setTransactionDatas([]);
        console.error("Error fetching transactions:", error.response?.data);
      }
    }
  }, []);

  const fetchGetResidents = useCallback(async () => {
    try {
      const response = await ResidentServices.getResidents();

      setResidentDatas(response?.payload);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchGetTransactions();
    fetchGetResidents();
  }, [fetchGetResidents, fetchGetTransactions]);

  useEffect(() => {
    const total = transactionDatas.reduce((sum, transaction) => sum + (transaction.transaction_amount || 0), 0);

    setBalance(total);
  }, [transactionDatas]);

  return (
    <div className="grid grid-cols-3 gap-5 mb-6">
      <div className="rounded-lg shadow-md">
        <p className="text-sm text-white bg-indigo-800 px-5 py-2 mb-2 rounded-sm">Total Saldo</p>
        <div className="flex justify-start items-center gap-3 px-5 py-3">
          <p className="text-sm text-zinc-500">Rp. </p>
          <p className="text-4xl font-extrabold">{balance}</p>
        </div>
      </div>
      <div className="rounded-lg shadow-md">
        <p className="text-sm text-white bg-green-700 px-5 py-2 mb-2 rounded-sm">Total Rumah Dihuni</p>
        <div className="flex justify-start items-center gap-3 px-5 py-3">
          <p className="text-4xl font-extrabold">{residentDatas?.data?.length || 0}</p>
          <p className="text-sm text-zinc-500">Rumah</p>
        </div>
      </div>
      <div className="rounded-lg shadow-md">
        <p className="text-sm text-white bg-red-800 px-5 py-2 mb-2 rounded-sm">Total Rumah Siap Huni</p>
        <div className="flex justify-start items-center gap-3 px-5 py-3">
          <p className="text-4xl font-extrabold">{20 - residentDatas?.data?.length == 0 ? 0 : residentDatas?.data?.length}</p>
          <p className="text-sm text-zinc-500">Rumah</p>
        </div>
      </div>
    </div>
  );
};

export default MainMenuHeader;
