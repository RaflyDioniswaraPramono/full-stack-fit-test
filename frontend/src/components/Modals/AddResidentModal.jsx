import FormField from "../FormField/FormField";
import { Modal } from "antd";
import { addResidentState } from "../../states/addResidentState";
import { Form, Formik } from "formik";
import { AddCircleOutline } from "@mui/icons-material";
import { confirmModalState, successModalState } from "../../states/alertState";
import { ResidentServices } from "../../services/ResidentServices";
import { useState } from "react";
import { refreshHouseData, refreshResidentData } from "../../states/refreshState";

const AddResidentModal = () => {
  const [file, setFile] = useState();

  const { isAddResidentModalOpen, houseId, closeAddResidentModal } = addResidentState();
  const { open: openConfirmModal, close: closeConfirmModal } = confirmModalState();
  const { open: openSuccessModal } = successModalState();
  const { setRefresh: setRefreshHouseData } = refreshHouseData();
  const { setRefresh: setRefreshResidentData } = refreshResidentData();

  const initialValues = {
    house_id: houseId,
    resident_status: "Penghuni Kontrak",
    marital_status: "Belum Menikah",
    full_name: "",
    phone_number: "",
  };

  const handleSubmit = (values) => {
    openConfirmModal({
      title: "Tambah Data Penghuni Rumah",
      text: "Apakah Anda yakin ingin menambahkan data penghuni rumah tersebut?",
      okAction: async () => {
        try {
          const response = await ResidentServices.addResident({
            house_id: values.house_id,
            resident_status: values.resident_status,
            marital_status: values.marital_status,
            full_name: values.full_name,
            identity_card_image: file,
            phone_number: values.phone_number,
          });

          if (response.success === true) {
            closeConfirmModal();

            openSuccessModal({
              text: response.message,
              onClose: () => {
                closeAddResidentModal();
                setRefreshHouseData(true);
                setRefreshResidentData(true);
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
      open={isAddResidentModalOpen}
      onCancel={() => closeAddResidentModal()}
      className="font-sans"
      title="Tambah Penghuni"
      footer={false}
      destroyOnClose
      width={500}
      centered>
      <div className="mt-6">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isValid }) => {
            return (
              <Form encType="multipart/form-data">
                <div className="mb-6">
                  <FormField label="Nama Penghuni" name="full_name" type="text" />
                </div>

                <div className="mb-6">
                  <FormField label="Status Penghuni" name="resident_status" type="text" as="select">
                    <option value="Penghuni Kontrak">Penghuni Kontrak</option>
                    <option value="Penghuni Tetap">Penghuni Tetap</option>
                  </FormField>
                </div>

                <div className="mb-6">
                  <FormField label="Status Pernikahan" name="marital_status" type="text" as="select">
                    <option value="Belum Menikah">Belum Menikah</option>
                    <option value="Sudah Menikah">Sudah Menikah</option>
                  </FormField>
                </div>

                <div className="mb-6">
                  <FormField label="Nomor Telepon" name="phone_number" type="text" />
                </div>

                <div className="mb-6">
                  <p className="text-xs text-zinc-500 mb-2">Foto KTP</p>
                  <input
                    required
                    type="file"
                    name="identity_card_image"
                    autoComplete="off"
                    className="w-full p-3 text-sm leading-none focus:outline-none border border-zinc-300 rounded-sm"
                    onChange={(event) => {
                      setFile(event.target.files[0]);
                    }}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="py-3 px-5 flex justify-center items-center gap-3 leading-none text-sm bg-main hover:bg-secondary transition-colors duration-150 text-white rounded-md">
                    <AddCircleOutline fontSize="inherit" /> <p>Tambah</p>
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

export default AddResidentModal;
