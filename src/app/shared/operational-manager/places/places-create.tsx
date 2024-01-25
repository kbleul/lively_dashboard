"use client";

import React, { useState } from "react";

import AddStoreInfo from "./add-store-info";
import AddOwnerInfo from "./add-owner-form";
import FormStepIndicator from "./FormStepIndicator";
import { CreatePlaceSteps } from "@/constants/form-constants";
import PageHeader from "../../page-header";

const pageHeader = {
  title: "Store Owner",
  breadcrumb: [
    {
      name: "Create Stores",
    },
  ],
};

const CreatePlaceForm = ({ className }: { className?: string }) => {
  const [formStep, setFormStep] = useState(1);
  const [ownerId, setOwnerId] = useState<string | null>(null);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <FormStepIndicator formStep={formStep} STEPS={CreatePlaceSteps} />

      <div className="mt-10">
        {formStep !== 2 && (
          <AddOwnerInfo setFormStep={setFormStep} setOwnerId={setOwnerId} />
        )}

        {formStep === 2 && (
          <AddStoreInfo
            formStep={formStep}
            setFormStep={setFormStep}
            ownerId={ownerId}
            setOwnerId={setOwnerId}
          />
        )}
      </div>
    </>
  );
};

export default CreatePlaceForm;
