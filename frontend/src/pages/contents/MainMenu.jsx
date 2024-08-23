import { useCallback, useEffect, useState } from "react";
import { ContentTitle, LargeTransactionTable, MainMenuHeader, TransactionChart } from "../../components";
import { TransactionServices } from "../../services/TransactionServices";
import { pointIcon } from "../../assets";

const MainMenu = () => {
  const months = [
    { number: "01", monthName: "Januari" },
    { number: "02", monthName: "Februari" },
    { number: "03", monthName: "Maret" },
    { number: "04", monthName: "April" },
    { number: "05", monthName: "Mei" },
    { number: "06", monthName: "Juni" },
    { number: "07", monthName: "Juli" },
    { number: "08", monthName: "Agustus" },
    { number: "09", monthName: "September" },
    { number: "10", monthName: "Oktober" },
    { number: "11", monthName: "November" },
    { number: "12", monthName: "Desember" },
  ];

  const currentMonthIndex = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex].number);

  const [transactionDatas, setTransactionDatas] = useState([]);

  const fetchGetTransactions = useCallback(async () => {
    try {
      const response = await TransactionServices.getTransactionsByMonth(selectedMonth);
      setTransactionDatas(response?.payload);
    } catch (error) {
      if (error?.response) {
        setTransactionDatas([]);
        console.error("Error fetching transactions:", error.response?.data);
      }
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchGetTransactions();
  }, [fetchGetTransactions]);

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      <div className="mb-6">
        <ContentTitle
          title="Menu Utama"
          description="Berikut ini merupakan tampilan menu utama yang memberikan informasi secara umum. Informasi ini menampilkan total rumah dihuni, total rumah tersedia, dan total saldo."
        />
      </div>
      <MainMenuHeader />
      <div className="grid grid-cols-3 items-center">
        <div className="col-span-2 flex justify-start items-center gap-3 mb-2">
          <img src={pointIcon} alt="Point Icon" className="w-full h-auto max-w-5" />
          <p className="text-sm text-zinc-500">Histori Transaksi</p>
        </div>
        <div className="col-span-1 flex justify-end items-center gap-3">
          <select
            className="p-2 text-xs border w-full focus:outline-none"
            onChange={handleChange}
            value={selectedMonth}>
            <option value="" disabled>
              -- Pilih Bulan --
            </option>
            {months.map((month) => (
              <option key={month.number} value={month.number}>
                {month.monthName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-white rounded-md shadow-md px-4 py-2 mb-6">
        <LargeTransactionTable transactionDatas={transactionDatas} />
      </div>
      <div className="flex justify-start items-center gap-3 mb-4">
        <img src={pointIcon} alt="Point Icon" className="w-full h-auto max-w-5" />
        <p className="text-sm text-zinc-500">Grafik Transaksi</p>
      </div>
      <div className="flex w-[90%]">
        <TransactionChart />
      </div>
    </div>
  );
};

export default MainMenu;
