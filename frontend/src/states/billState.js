import { create } from "zustand";

export const addBillModalState = create((set) => ({
  isAddBillModalOpen: false,
  openAddBillModal: () =>
    set({
      isAddBillModalOpen: true,
    }),
  closeAddBillModal: () =>
    set({
      isAddBillModalOpen: false,
    }),
}));
