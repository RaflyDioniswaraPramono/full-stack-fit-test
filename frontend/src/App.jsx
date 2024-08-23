import React from "react";
import Routes from "./routes/Routes";
import {
  AddBillModal,
  AddPaymentModal,
  AddResidentModal,
  ConfirmAlert,
  HouseDetailModal,
  PreviewIdentityCardModal,
  EditHouseModal,
  SuccessAlert,
  AddExpenditureModal,
} from "./components";

const App = () => {
  return (
    <React.Fragment>
      <ConfirmAlert />
      <SuccessAlert />
      <AddResidentModal />
      <AddBillModal />
      <AddPaymentModal />
      <AddExpenditureModal />
      <PreviewIdentityCardModal />
      <EditHouseModal />
      <HouseDetailModal />
      <Routes />
    </React.Fragment>
  );
};

export default App;
