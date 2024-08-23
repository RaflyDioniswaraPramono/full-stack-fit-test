import { create } from "zustand";

export const confirmModalState = create((set) => ({
  isOpen: false,
  title: "",
  text: "",
  okAction: null,
  open: ({ title: title = "", text: text = "", okAction: okAction = null }) =>
    set({
      isOpen: true,
      title: title,
      text: text,
      okAction: okAction,
    }),
  close: () =>
    set({
      isOpen: false,
    }),
}));

export const successModalState = create((set) => ({
  isOpen: false,
  text: "",
  onClose: null,
  open: ({ text: text = "", onClose: onClose = null }) => {
    set({
      isOpen: true,
      text: text,
      onClose: onClose,
    });
  },
  close: () =>
    set({
      isOpen: false,
    }),
}));

export const errorModalState = create((set) => ({
  isOpen: false,
  text: "",
  open: (text) =>
    set({
      isOpen: true,
      text: text,
    }),
  close: () =>
    set({
      isOpen: false,
    }),
}));