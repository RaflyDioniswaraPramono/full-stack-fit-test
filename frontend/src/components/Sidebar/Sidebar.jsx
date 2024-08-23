import { NavLink } from "react-router-dom";
import { sidebarMenuItems } from "./sidebar-menu-items";

const Sidebar = () => {
  return (
    <div className="h-full border-r border-zinc-300 py-2 px-2">
      {sidebarMenuItems.map((items) => {
        const { id, to, icon, text } = items;

        return (
          <NavLink
            key={id}
            to={to}
            className={({ isActive }) =>
              isActive
                ? "p-3 mb-1 leading-none rounded-md bg-main text-white flex justify-start items-center gap-2 text-xs"
                : "p-3 mb-1 leading-none rounded-md bg-white hover:bg-main text-zinc-500 hover:text-white transition-colors duration-150 flex justify-start items-center gap-2 text-xs"
            }
            end={to === "/dashboard"}>
            {icon}
            <p>{text}</p>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;
