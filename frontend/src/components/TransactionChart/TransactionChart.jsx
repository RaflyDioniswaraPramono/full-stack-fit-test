import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TransactionServices } from "../../services/TransactionServices";

const TransactionChart = ({ transactionDatas }) => {
  const [incomes, setIncomes] = useState("");

  const fetchIncomes = useCallback(async () => {
    try {
      const response = await TransactionServices.getIncomes(2024);

      setIncomes(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchIncomes();
  }, [fetchIncomes]);

  return (
    <ResponsiveContainer minHeight={400}>
      <LineChart
        width={500}
        height={300}
        data={incomes?.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="incomeTotal" name="Total Pemasukan" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="expendTotal" name="Total Pengeluaran" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

TransactionChart.propTypes = {
  transactionDatas: PropTypes.any,
};

export default TransactionChart;
