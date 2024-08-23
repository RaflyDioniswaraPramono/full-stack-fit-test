import { Dashboard, Hail, Home, Paid, Payment, Sell } from "@mui/icons-material";

export const sidebarMenuItems = [
  {
    id: 1,
    to: "/dashboard",
    icon: <Dashboard fontSize="small" />,
    text: "Menu Utama",
  },
  {
    id: 2,
    to: "/dashboard/rumah",
    icon: <Home fontSize="small" />,
    text: "Manajemen Rumah",
  },
  {
    id: 3,
    to: "/dashboard/penghuni",
    icon: <Hail fontSize="small" />,
    text: "Manajemen Penghuni",
  },
  {
    id: 4,
    to: "/dashboard/tagihan",
    icon: <Paid fontSize="small" />,
    text: "Manajemen Tagihan Iuran",
  },
  {
    id: 5,
    to: "/dashboard/pembayaran",
    icon: <Payment fontSize="small" />,
    text: "Manajemen Pembayaran Iuran",
  },
  {
    id: 6,
    to: "/dashboard/pengeluaran",
    icon: <Sell fontSize="small" />,
    text: "Manajemen Pengeluaran",
  },
];
