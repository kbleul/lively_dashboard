"use client";

import { useState } from "react";
import FormStepIndicator from "../places/FormStepIndicator";
import { CreateBranchSteps } from "@/constants/form-constants";
import AddBranchInfo from "./add-branch";
import AddMoreInfo from "./add-more-info";
import AddBranchManger from "./add-branch-manger";

const CreateBranchForm = ({ placeId }: { placeId: string }) => {
  const [formStep, setFormStep] = useState(1);
  const [branchId, setBrachId] = useState<string | null>(null);

  return (
    <div>
      <section className="pb-8">
        <h4 className="font-normal text-3xl text-black">Create Branch</h4>
        <div className="flex justify-start items-center gap-x-6">
          <p className="text-[#5F5F5F]">Operation Manager</p>
          <p className="w-2 h-2 rounded-full bg-[#5F5F5F]"></p>
          <p className="text-[#5F5F5F]">Branch</p>
          <p className="w-2 h-2 rounded-full  bg-[#5F5F5F] "></p>
          <p className="text-[#5F5F5F]">Create</p>
        </div>
      </section>

      <FormStepIndicator formStep={formStep} STEPS={CreateBranchSteps} />

      <div className="mt-10">
        {formStep !== 2 && formStep !== 3 && (
          <AddBranchInfo
            setFormStep={setFormStep}
            setBrachId={setBrachId}
            storeId={placeId}
          />
        )}

        {formStep === 2 && branchId && (
          <AddMoreInfo setFormStep={setFormStep} branchId={branchId} />
        )}

        {formStep === 3 && branchId && placeId && (
          <AddBranchManger
            branchId={branchId}
            setFormStep={setFormStep}
            setBrachId={setBrachId}
            placeId={placeId}
          />
        )}
      </div>
    </div>
  );
};

export default CreateBranchForm;
