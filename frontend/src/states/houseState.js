import { create } from "zustand";

export const editHouseModalState = create((set) => ({
  isEditHouseModalOpen: false,
  houseData: null,
  openEditHouseModal: (houseData) =>
    set({
      isEditHouseModalOpen: true,
      houseData: houseData,
    }),
  closeEditHouseModal: () =>
    set({
      isEditHouseModalOpen: false,
    }),
}));
