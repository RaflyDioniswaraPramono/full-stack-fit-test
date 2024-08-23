import { Modal } from "antd";
import { previewIdentityCardModalState } from "../../states/residentState";

const PreviewIdentityCardModal = () => {
  const { isPreviewIdentityCardModalOpen, identityCardLink, closePreviewIdentityCardModal } =
    previewIdentityCardModalState();

  return (
    <Modal
      open={isPreviewIdentityCardModalOpen}
      onCancel={() => closePreviewIdentityCardModal()}
      className="font-sans"
      title="Preview Foto KTP"
      footer={false}
      destroyOnClose
      width={500}
      centered>
      <div className="mt-6 flex justify-center items-center">
        <img
          src={`${import.meta.env.VITE_STATIC_FILE_LINK}${identityCardLink}`}
          alt="Identity Card Image"
          className="w-full h-auto"
        />
      </div>
    </Modal>
  );
};

export default PreviewIdentityCardModal;
