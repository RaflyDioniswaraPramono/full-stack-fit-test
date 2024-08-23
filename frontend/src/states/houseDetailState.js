import { create } from "zustand";

export const houseDetailState = create((set) => ({
  isHouseDetailModalOpen: false,
  houseData: null,
  openHouseDetailModal: (houseData) =>
    set({
      isHouseDetailModalOpen: true,
      houseData: houseData,
    }),
  closeHouseDetailModal: () =>
    set({
      isHouseDetailModalOpen: false,
    }),
}));
