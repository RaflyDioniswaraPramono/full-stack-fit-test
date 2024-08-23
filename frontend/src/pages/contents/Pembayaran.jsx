import ContentTitle from "../../components/ContentTitle/ContentTitle";
import { useCallback, useEffect, useState } from "react";
import { LargePaymentTable } from "../../components";
import { PaymentServices } from "../../services/PaymentServices";

const Pembayaran = () => {
  const [paymentDatas, setPaymentDatas] = useState("");

  const fetchPayments = useCallback(async () => {
    try {
      const response = await PaymentServices.getPayments();

      setPaymentDatas(response.payload);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return (
    <div>
      <div className="mb-8">
        <ContentTitle
          title="Histori Pembayaran Tagihan"
          description="Berikut ini merupakan histori dari pembayaran yang telah dilakukan. Status tagihan akan menjadi lunas ketika terdapat data pembayaran yang sesuai dengan tagihan sebelumnya."
        />
      </div>
      <div className="bg-white rounded-md shadow-md px-4 py-2">
        <LargePaymentTable paymentDatas={paymentDatas} />
      </div>
    </div>
  );
};

export default Pembayaran;
