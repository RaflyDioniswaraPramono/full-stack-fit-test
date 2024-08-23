import { create } from "zustand";

export const addPaymentModalState = create((set) => ({
  isAddPaymentModalOpen: false,
  billData: null,
  openAddPaymentModal: (billData) =>
    set({
      isAddPaymentModalOpen: true,
      billData: billData,
    }),
  closeAddPaymentModal: () =>
    set({
      isAddPaymentModalOpen: false,
    }),
}));
