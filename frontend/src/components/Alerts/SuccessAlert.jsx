import { Modal } from "antd";
import { successModalState } from "../../states/alertState";
import { successIcon } from "../../assets";
import { useEffect } from "react";

const SuccessAlert = () => {
  const { isOpen, text, onClose, close } = successModalState();

  useEffect(() => {
    if (isOpen === true) {
      const timeout = setTimeout(() => {
        close();
        onClose();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [close, isOpen, onClose]);

  return (
    <Modal
      centered
      destroyOnClose
      style={{ fontFamily: "Poppins" }}
      open={isOpen}
      closable={false}
      footer={null}
      width={500}>
      <div className="flex flex-col items-center">
        <img src={successIcon} alt="Warning Icon" className="w-full h-auto max-w-20 mb-3" />
        <div className="text-center">
          <h1 className="font-bold text-lg tracking-wide">BERHASIL</h1>
          <p className="text-sm text-zinc-500">{text}</p>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessAlert;
