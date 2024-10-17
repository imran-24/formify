"use client";

import RenameFormModal from "@/components/modals/rename-form-modal";
import { useEffect, useState } from "react";

export const ModalProviders = () => {
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    setIsModal(true);
  }, []);

  if (!isModal) return null;
  return (
    <>
      <RenameFormModal />
    </>
  );
};

