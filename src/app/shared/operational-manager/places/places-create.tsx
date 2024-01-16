"use client";

import React, { useState } from "react";

import AddStoreInfo from "./add-store-info";
import AddOwnerInfo from "./add-owner-form";
import FormStepIndicator from "./FormStepIndicator";
import { CreatePlaceSteps } from "@/constants/form-constants";

const CreatePlaceForm = ({ className }: { className?: string }) => {
  const [formStep, setFormStep] = useState(1);
  const [ownerId, setOwnerId] = useState<string | null>(null);

  return (
    <>
      <section className="pb-8">
        <h4 className="font-normal text-3xl text-black">Create Store</h4>
        <div className="flex justify-start items-center gap-x-6">
          <p className="text-[#5F5F5F]">Operation Manager</p>
          <p className="w-2 h-2 rounded-full bg-[#5F5F5F]"></p>
          <p className="text-[#5F5F5F]">Store</p>
          <p className="w-2 h-2 rounded-full  bg-[#5F5F5F] "></p>
          <p className="text-[#5F5F5F]">Create</p>
        </div>
      </section>
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
