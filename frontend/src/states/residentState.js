import { create } from "zustand";

export const previewIdentityCardModalState = create((set) => ({
  isPreviewIdentityCardModalOpen: false,
  identityCardLink: "",
  openPreviewIdentityCardModal: (identityCardLink) =>
    set({
      isPreviewIdentityCardModalOpen: true,
      identityCardLink: identityCardLink
    }),
  closePreviewIdentityCardModal: () =>
    set({
      isPreviewIdentityCardModalOpen: false,
    }),
}));
