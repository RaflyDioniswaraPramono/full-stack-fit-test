import { Modal } from "antd";
import { errorIcon } from "../../assets";
import { errorModalState } from "../../states/alertState";

const ErrorAlert = () => {
  const { isOpen, text, close } = errorModalState();

  return (
    <Modal
      centered
      destroyOnClose
      style={{ fontFamily: "Poppins" }}
      open={isOpen}
      closable={false}
      footer={null}
      width={500}>
      <div className="flex flex-col items-center py-2">
        <img src={errorIcon} alt="Warning Icon" className="w-full h-auto max-w-20 mb-3" />
        <div className="text-center mb-4">
          <h1 className="font-bold text-lg tracking-wide">ERROR</h1>
          <p className="text-sm text-zinc-500">{text}</p>
        </div>
        <button
          className="w-full py-3 px-5 rounded-sm bg-main hover:bg-main-hover transition-colors duration-150 text-white leading-none text-xs"
          onClick={() => close()}>
          OK
        </button>
      </div>
    </Modal>
  );
};

export default ErrorAlert;
