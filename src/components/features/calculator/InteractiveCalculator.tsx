"use client";

import React from "react";
import { TransferWizard, TransferWizardProps } from "../transfer/TransferWizard";

export const InteractiveCalculator: React.FC<TransferWizardProps & { isOpen?: boolean }> = ({
  isOpen = true,
  onClose,
  initialCountryName = "Узбекистан",
  isModal = false,
}) => {
  if (isModal && !isOpen) return null;

  return (
    <TransferWizard
      initialCountryName={initialCountryName}
      isModal={isModal}
      onClose={onClose}
    />
  );
};
