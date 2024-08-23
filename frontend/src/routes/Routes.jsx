import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Dashboard,
  Root,
  Signup,
  Signin,
  MainMenu,
  Houses,
  Residents,
  HouseDetail,
  Bills,
  Pembayaran,
  Expenditure,
} from "../pages";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
          children: [
            {
              index: true,
              element: <MainMenu />,
            },
            {
              path: "rumah",
              element: <Houses />,
            },
            {
              path: "penghuni",
              element: <Residents />,
            },
            {
              path: "tagihan",
              element: <Bills />,
            },
            {
              path: "pembayaran",
              element: <Pembayaran />,
            },
            {
              path: "pengeluaran",
              element: <Expenditure />,
            },
          ],
        },
        {
          path: "signup",
          element: <Signup />,
        },
      ],
    },
    {
      path: "/signin",
      element: <Signin />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
