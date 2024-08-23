import { create } from "zustand";

export const addExpenditureModalState = create((set) => ({
  isAddExpenditureModalOpen: false,
  openAddExpenditureModal: () =>
    set({
      isAddExpenditureModalOpen: true,
    }),
  closeAddExpenditureModal: () =>
    set({
      isAddExpenditureModalOpen: false,
    }),
}));
