import FormField from "../FormField/FormField";
import { Modal } from "antd";
import { Form, Formik } from "formik";
import { editHouseModalState } from "../../states/houseState";
import { Edit } from "@mui/icons-material";
import { confirmModalState, successModalState } from "../../states/alertState";
import { HouseServices } from "../../services/HouseServices";
import { refreshHouseData } from "../../states/refreshState";
import { useState } from "react";
import { ResidentServices } from "../../services/ResidentServices";

const EditHouseModal = () => {
  const { isEditHouseModalOpen, houseData, closeEditHouseModal } = editHouseModalState();
  const { open: openConfirmModal, close: closeConfirmModal } = confirmModalState();
  const { open: openSuccessModal } = successModalState();
  const { setRefresh } = refreshHouseData();

  const [file, setFile] = useState(houseData?.Resident?.identity_card_image);
  const [isEditResident, setIsEditResident] = useState(false);

  const initialValues = {
    id: houseData?.id,
    house_block: houseData?.house_block,
    house_number: houseData?.house_number,
    house_address: houseData?.house_address,
    house_id: houseData?.id,
    resident_id: houseData?.Resident?.id,
    resident_status: houseData?.Resident?.resident_status,
    marital_status: houseData?.Resident?.marital_status,
    full_name: houseData?.Resident?.full_name,
    phone_number: houseData?.Resident?.phone_number,
  };

  const handleSubmit = (values) => {
    openConfirmModal({
      title: "Edit Data Rumah",
      text: "Apakah Anda yakin ingin mengedit data rumah tersebut?",
      okAction: async () => {
        try {
          const { id, house_block, house_number, house_address } = values;

          if (isEditResident === true) {
            await HouseServices.updateHouse(id, {
              house_block,
              house_number,
              house_address,
            });

            const updateResident = await ResidentServices.updateResidents(values.resident_id, {
              house_id: id,
              resident_status: values.resident_status,
              marital_status: values.marital_status,
              full_name: values.full_name,
              identity_card_image: file,
              phone_number: values.phone_number,
            });

            if (updateResident.success === true) {
              openSuccessModal({
                text: updateResident.message,
                onClose: () => {
                  setRefresh(true);
                  closeConfirmModal();
                  handleCloseForm();
                },
              });
            }
          } else if (isEditResident === false) {
            const response = await HouseServices.updateHouse(id, {
              house_block,
              house_number,
              house_address,
            });

            if (response.success === true) {
              openSuccessModal({
                text: response.message,
                onClose: () => {
                  setRefresh(true);
                  closeConfirmModal();
                  handleCloseForm();
                },
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  const handleCloseForm = () => {
    closeEditHouseModal();
    setIsEditResident(false);
  };

  return (
    <Modal
      open={isEditHouseModalOpen}
      onCancel={() => handleCloseForm()}
      className="font-sans"
      title="Edit Data Rumah / Penghuni Rumah"
      footer={false}
      destroyOnClose
      width={isEditResident ? 900 : 500}
      centered>
      <div className="mt-6">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isValid }) => {
            return (
              <Form encType="multipart/form-data">
                <div className={`grid ${isEditResident ? "grid-cols-2" : "grid-cols-1"} gap-5`}>
                  <div>
                    <div className="mb-6">
                      <FormField name="house_block" label="Blok Rumah" type="text" />
                    </div>
                    <div className="mb-6">
                      <FormField name="house_number" label="Nomor Rumah" type="text" />
                    </div>
                    <div className="mb-6">
                      <FormField name="house_address" label="Blok Rumah" type="text" as="textarea" />
                    </div>
                    <div className="mb-6 flex justify-start items-center gap-3">
                      <input
                        type="checkbox"
                        className="scale-150 cursor-pointer"
                        onChange={(event) => {
                          setIsEditResident(event.target.checked);
                        }}
                      />
                      <p className="text-sm">Edit Penghuni ?</p>
                    </div>
                  </div>
                  <div className={`${isEditResident ? "block" : "hidden"}`}>
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
                        type="file"
                        name="identity_card_image"
                        autoComplete="off"
                        className="w-full p-3 text-sm leading-none focus:outline-none border border-zinc-300 rounded-sm"
                        onChange={(event) => {
                          setFile(event.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="py-3 px-5 flex justify-center items-center gap-3 leading-none text-sm bg-main hover:bg-secondary transition-colors duration-150 text-white rounded-md">
                    <Edit fontSize="inherit" /> <p>Edit</p>
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

export default EditHouseModal;
