import { Modal } from "antd";
import { confirmModalState } from "../../states/alertState";
import { warningIcon } from "../../assets";

const ConfirmAlert = () => {
  const { title, text, okAction, isOpen, close } = confirmModalState();

  return (
    <Modal
      centered
      destroyOnClose
      style={{ fontFamily: "Poppins" }}
      open={isOpen}
      closable={false}
      footer={null}
      width={500}>
      <div className="flex flex-col items-center mb-6">
        <img src={warningIcon} alt="Warning Icon" className="w-full h-auto max-w-20 mb-3" />
        <div className="text-center">
          <h1 className="font-bold text-lg tracking-wide">{title}</h1>
          <p className="text-sm text-zinc-500">{text}</p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-3">
        <button
          className="w-full py-3 px-5 rounded-sm bg-main hover:bg-main-hover transition-colors duration-150 text-white leading-none text-xs"
          onClick={() => okAction()}>
          OK
        </button>
        <button
          className="w-full py-3 px-5 rounded-sm bg-red-400 hover:bg-red-500 transition-colors duration-150 text-white leading-none text-xs"
          onClick={() => close()}>
          Batal
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmAlert;
