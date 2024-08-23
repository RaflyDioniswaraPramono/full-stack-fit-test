import { create } from "zustand";

export const addResidentState = create((set) => ({
  isAddResidentModalOpen: false,
  houseId: "",
  openAddResidentModal: (houseId) =>
    set({
      houseId: houseId,
      isAddResidentModalOpen: true,
    }),
  closeAddResidentModal: () =>
    set({
      isAddResidentModalOpen: false,
    }),
}));
