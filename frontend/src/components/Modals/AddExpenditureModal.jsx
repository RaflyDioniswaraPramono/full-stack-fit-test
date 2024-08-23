import FormField from "../FormField/FormField";
import { Modal } from "antd";
import { addExpenditureModalState } from "../../states/expenditureState";
import { Form, Formik } from "formik";
import { AddCircleOutline } from "@mui/icons-material";
import { confirmModalState, successModalState } from "../../states/alertState";
import { ExpenditureServices } from "../../services/ExpenditureServices";
import { refreshExpenditureData } from "../../states/refreshState";

const AddExpenditureModal = () => {
  const { isAddExpenditureModalOpen, closeAddExpenditureModal } = addExpenditureModalState();
  const { open: openConfirmModal, close: closeConfirmModal } = confirmModalState();
  const { open: openSuccessModal } = successModalState();
  const { setRefresh } = refreshExpenditureData();

  const initialValues = {
    expenditure_need: "",
    expenditure_amount: "",
  };

  const handleSubmit = (values) => {
    openConfirmModal({
      title: "Tambah Data Pengeluaran",
      text: "Apakah Anda yakin ingin menambahkan data pengeluaran?",
      okAction: async () => {
        try {
          const response = await ExpenditureServices.addExpenditure(values);

          if (response.success === true) {
            closeConfirmModal();

            openSuccessModal({
              text: response?.message,
              onClose: () => {
                closeAddExpenditureModal();
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
      open={isAddExpenditureModalOpen}
      onCancel={() => closeAddExpenditureModal()}
      className="font-sans"
      title="Buat Data Pengeluaran"
      footer={false}
      destroyOnClose
      width={500}
      centered>
      <div className="mt-6">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {() => {
            return (
              <Form>
                <div className="mb-6">
                  <FormField label="Nama Pengeluaran" name="expenditure_need" type="text" />
                </div>
                <div className="mb-6">
                  <FormField label="Total Pengeluaran" name="expenditure_amount" type="text" />
                </div>
                <div>
                  <button
                    type="submit"
                    className="py-3 px-5 flex justify-center items-center gap-3 leading-none text-sm bg-main hover:bg-secondary transition-colors duration-150 text-white rounded-md">
                    <AddCircleOutline fontSize="inherit" /> <p>Tambah Pengeluaran</p>
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};

export default AddExpenditureModal;
