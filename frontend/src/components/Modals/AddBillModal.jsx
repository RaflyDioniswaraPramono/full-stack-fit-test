import FormField from "../FormField/FormField";
import { Modal } from "antd";
import { addBillModalState } from "../../states/billState";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { ResidentServices } from "../../services/ResidentServices";
import { AddCircleOutline } from "@mui/icons-material";
import { confirmModalState, successModalState } from "../../states/alertState";
import { refreshBillData, refreshResidentData } from "../../states/refreshState";
import { BillServices } from "../../services/BillServices";

const AddBillModal = () => {
  const [residentDatas, setResidentDatas] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const { open: openConfirmModal, close: closeConfirmModal } = confirmModalState();
  const { open: openSuccessModal } = successModalState();
  const { isRefresh, setRefresh: setRefreshResidentData } = refreshResidentData();
  const { setRefresh: setRefreshHouseData } = refreshBillData();

  const fetchResidents = useCallback(async () => {
    try {
      const response = await ResidentServices.getResidents();

      setResidentDatas(response.payload);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchResidents();
  }, [fetchResidents]);

  useEffect(() => {
    if (isRefresh === true) {
      fetchResidents().finally(() => {
        setRefreshResidentData(false);
      });
    }
  }, [fetchResidents, isRefresh]);

  const { isAddBillModalOpen, closeAddBillModal } = addBillModalState();

  const initialValues = {
    bill_type_id: 1,
    bill_description: "Tagihan iuran bulanan untuk Keamanan sebesar Rp. 100.000",
  };

  const handleSubmit = (values) => {
    openConfirmModal({
      title: "Baut Tagihan Iuran Baru",
      text: "Apakah Anda yakin ingin menambahkan tagihan baru kepada penghuni yang dipilih?",
      okAction: async () => {
        try {
          for (const id of selectedIds) {
            await BillServices.addBill({
              resident_id: id,
              bill_type_id: values.bill_type_id,
              bill_description: values.bill_description,
            });
          }
        } catch (error) {
          console.log(error);
        } finally {
          closeConfirmModal();

          openSuccessModal({
            text: `Berhasil membuat ${values.bill_description}`,
            onClose: () => {
              closeAddBillModal();
              setRefreshHouseData(true);
            },
          });
        }
      },
    });
  };

  return (
    <Modal
      open={isAddBillModalOpen}
      onCancel={() => closeAddBillModal()}
      className="font-sans"
      title="Buat Tagihan Iuran"
      footer={false}
      destroyOnClose
      width={1024}
      centered>
      <div className="mt-6">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isValid, values, setFieldValue }) => {
            const handleCheckboxChange = (event, id) => {
              if (event.target.checked) {
                setSelectedIds((prevIds) => [...prevIds, id]);
              } else {
                setSelectedIds((prevIds) => prevIds.filter((selectedId) => selectedId !== id));
              }
            };

            const handleSelectAll = (event) => {
              if (event.target.checked) {
                const allIds = residentDatas?.data?.map((resident) => resident.id) || [];
                setSelectedIds(allIds);
              } else {
                setSelectedIds([]);
              }
            };

            const handleChangeDesc = (event) => {
              const billType = event.target.value;

              setFieldValue("bill_type_id", billType, true);

              if (billType == 1) {
                setFieldValue("bill_description", "Tagihan iuran bulanan untuk Keamanan sebesar Rp. 100.000", true);
              } else if (billType == 2) {
                setFieldValue("bill_description", "Tagihan iuran bulanan untuk Kebersihan sebesar Rp. 15.000", true);
              }
            };

            return (
              <Form>
                <p className="text-xs text-zinc-500 mb-2">Pilih Tujuan Tagihan Iuran Penghuni</p>
                <div className="flex justify-start items-center gap-3 py-2 px-4">
                  <input
                    disabled={residentDatas?.data?.length > 0 ? false : true}
                    onChange={handleSelectAll}
                    type="checkbox"
                    className="scale-150 cursor-pointer"
                  />
                  <p className={`${residentDatas?.data?.length > 0 ? "text-black" : "text-zinc-400"}`}>Pilih Semua</p>
                </div>
                <div className="mb-6 grid grid-cols-2 gap-2">
                  {residentDatas?.data?.map((residents) => {
                    const { id, House, full_name } = residents;

                    return (
                      <div key={id} className="flex justify-start items-center gap-3 border py-2 px-4">
                        <input
                          type="checkbox"
                          className="scale-150 cursor-pointer"
                          checked={selectedIds.includes(id)}
                          onChange={(event) => {
                            handleCheckboxChange(event, id);
                          }}
                        />
                        <p>
                          {full_name} - {House?.house_block} No. {House?.house_number}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mb-6">
                  <FormField
                    label="Jenis Tagihan Iuran"
                    name="bill_type_id"
                    type="text"
                    as="select"
                    onChange={handleChangeDesc}>
                    <option value={1}>Tagihan Iuran Keamanan/Satpam</option>
                    <option value={2}>Tagihan Iuran Kebersihan</option>
                  </FormField>
                </div>
                <div className="mb-6">
                  <FormField
                    disabled
                    label="Deksripsi Tagihan"
                    name="bill_descriptiom"
                    type="text"
                    value={values.bill_description}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="py-3 px-5 flex justify-center items-center gap-3 leading-none text-sm bg-main hover:bg-secondary transition-colors duration-150 text-white rounded-md">
                    <AddCircleOutline fontSize="inherit" /> <p>Buat Tagihan</p>
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

export default AddBillModal;
