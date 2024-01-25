"use client";

import { useState } from "react";
import AddBranchInfo from "../operational-manager/branch/add-branch";
import AddMoreInfo from "../operational-manager/branch/add-more-info";
import FormStepIndicator from "../operational-manager/places/FormStepIndicator";
import { CreateBranchStoreSteps } from "@/constants/form-constants";

const CreateBranchForm = ({ placeId }: { placeId: string }) => {
  const [formStep, setFormStep] = useState(1);
  const [branchId, setBrachId] = useState<string | null>(null);

  return (
    <div>
      <FormStepIndicator formStep={formStep} STEPS={CreateBranchStoreSteps} />

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
      </div>
    </div>
  );
};

export default CreateBranchForm;
