import { Menu, Person } from "@mui/icons-material";

const Navbar = () => {
  return (
    <div className="h-full flex justify-between items-center shadow-md px-4 bg-white">
      <button className="bg-[#0D6AAB] rounded-full p-1 text-white">
        <Menu />
      </button>
      <button className="py-2 px-5 hover:shadow-md transition-shadow duration-150 flex items-center gap-3 rounded-full border border-zinc-300 w-fit">
        <div className="bg-[#0D6AAB] rounded-full p-1 text-white">
          <Person />
        </div>
        <div className="text-start">
          <p className="text-xs">Rafly Dioniswara Pramono</p>
          <p className="text-[0.65em] text-zinc-600">Signin as Ketua RT</p>
        </div>
      </button>
    </div>
  );
};

export default Navbar;
