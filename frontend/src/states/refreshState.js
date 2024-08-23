import { create } from "zustand";

export const refreshHouseData = create((set) => ({
  isRefresh: false,
  setRefresh: (setRefresh) =>
    set({
      isRefresh: setRefresh,
    }),
}));

export const refreshBillData = create((set) => ({
  isRefresh: false,
  setRefresh: (setRefresh) =>
    set({
      isRefresh: setRefresh,
    }),
}));

export const refreshResidentData = create((set) => ({
  isRefresh: false,
  setRefresh: (setRefresh) =>
    set({
      isRefresh: setRefresh,
    }),
}));

export const refreshExpenditureData = create((set) => ({
  isRefresh: false,
  setRefresh: (setRefresh) =>
    set({
      isRefresh: setRefresh,
    }),
}));
