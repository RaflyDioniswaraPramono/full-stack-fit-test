import { houseIcon } from "../../assets";

const Appbar = () => {
  return (
    <div className="flex justify-start items-center h-full px-2 shadow-md">
      <button onClick={() => window.location.reload()} className="flex justify-center items-center gap-3">
        <img src={houseIcon} alt="House Icon" className="w-full h-auto max-w-10" />
        <div className="text-start">
          <p className="text-sm font-bold">Perum Lumajang Indah</p>
          <p className="text-[0.7em]">Sistem Manajemen Prumahan Terpadu</p>
        </div>
      </button>
    </div>
  );
};

export default Appbar;
