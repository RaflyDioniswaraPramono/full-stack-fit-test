import { Modal } from "antd";
import { addPaymentModalState } from "../../states/paymentState";
import {
  AccessTime,
  AddCircleOutline,
  AttachMoney,
  Description,
  Home,
  Person,
  ReceiptLong,
  RequestQuote,
} from "@mui/icons-material";
import { date, time } from "../../utils/date-time";
import { PaymentServices } from "../../services/PaymentServices";
import { confirmModalState, successModalState } from "../../states/alertState";
import { refreshBillData } from "../../states/refreshState";

const AddPaymentModal = () => {
  const { isAddPaymentModalOpen, billData, closeAddPaymentModal } = addPaymentModalState();
  const { open: openConfirmModal, close: closeConfirmModal } = confirmModalState();
  const { open: openSuccessModal } = successModalState();

  const { setRefresh } = refreshBillData();

  const handleSubmit = () => {
    openConfirmModal({
      title: "Pembayaran Tagihan Iuran",
      text: "Apakah Anda ingin menambahkan data pembayaran tagihan iuran?",
      okAction: async () => {
        try {
          const response = await PaymentServices.payment({
            bill_id: billData?.id,
            payment_amount: billData?.BillType?.bill_price,
          });

          if (response.success === true) {
            closeConfirmModal();

            openSuccessModal({
              text: response.message,
              onClose: () => {
                closeAddPaymentModal();
                setRefresh(true);
              },
            });
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  return (
    <Modal
      open={isAddPaymentModalOpen}
      onCancel={() => closeAddPaymentModal()}
      className="font-sans"
      title={`Pembayaran ${billData?.BillType?.bill_type}`}
      footer={false}
      destroyOnClose
      width={500}
      centered>
      <div className="mt-6">
        <div className="flex justify-start items-center gap-3 mb-4 border-b pb-4">
          <div className="w-9 h-9 rounded-full border-2 bordr-zinc-300 flex justify-center items-center text-main">
            <Person fontSize="small" />
          </div>
          <div>
            <p>Nama Penghuni</p>
            <p className="text-xs text-zinc-500">{billData?.Resident?.full_name}</p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-3 mb-4 border-b pb-4">
          <div className="w-9 h-9 rounded-full border-2 bordr-zinc-300 flex justify-center items-center text-main">
            <Home fontSize="small" />
          </div>
          <div>
            <p>Tempat Rumah Dihuni</p>
            <p className="text-xs text-zinc-500">
              {billData?.Resident?.House?.house_block} - No. {billData?.Resident?.House?.house_number}
            </p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-3 mb-4 border-b pb-4">
          <div className="w-9 h-9 rounded-full border-2 bordr-zinc-300 flex justify-center items-center text-main">
            <RequestQuote fontSize="small" />
          </div>
          <div>
            <p>Jenis Tagihan</p>
            <p className="text-xs text-zinc-500">{billData?.BillType?.bill_type}</p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-3 mb-4 border-b pb-4">
          <div className="w-9 h-9 rounded-full border-2 bordr-zinc-300 flex justify-center items-center text-main">
            <AttachMoney fontSize="small" />
          </div>
          <div>
            <p>Harga Tagihan Iuran</p>
            <p className="text-xs text-zinc-500">Rp. {billData?.BillType?.bill_price}</p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-3 mb-4 border-b pb-4">
          <div className="w-9 h-9 rounded-full border-2 bordr-zinc-300 flex justify-center items-center text-main">
            <Description fontSize="small" />
          </div>
          <div>
            <p>Deskripsi Tagihan</p>
            <p className="text-xs text-zinc-500">{billData?.bill_description}</p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-3 mb-4 border-b pb-4">
          <div className="w-9 h-9 rounded-full border-2 bordr-zinc-300 flex justify-center items-center text-main">
            <AccessTime fontSize="small" />
          </div>
          <div>
            <p>Waktu & Tanggal Dibuat</p>
            <p className="text-xs text-zinc-500">
              {date(billData?.bill_date)} - {time(billData?.bill_date)} wib
            </p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-3 mb-4 border-b pb-4">
          <div className="w-9 h-9 rounded-full border-2 bordr-zinc-300 flex justify-center items-center text-main">
            <ReceiptLong fontSize="small" />
          </div>
          <div>
            <p>Status Tagihan</p>
            <p className="text-xs text-red-500 font-medium">{billData?.bill_status}</p>
          </div>
        </div>
        <div>
          <button
            onClick={() => handleSubmit()}
            className="py-3 px-5 flex justify-center items-center gap-3 leading-none text-sm bg-main hover:bg-secondary transition-colors duration-150 text-white rounded-md">
            <AddCircleOutline fontSize="inherit" /> <p>Buat Pembayaran</p>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddPaymentModal;
