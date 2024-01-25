"use client";

import { useState } from "react";
import FormStepIndicator from "../places/FormStepIndicator";
import { CreateBranchSteps } from "@/constants/form-constants";
import AddBranchInfo from "./add-branch";
import AddMoreInfo from "./add-more-info";
import AddBranchManger from "./add-branch-manger";
import PageHeader from "../../page-header";

const pageHeader = {
  title: "Store Owner",
  breadcrumb: [
    {
      name: "Stores",
    },
    {
      name: "View Stores",
    },
    {
      name: "Create Stores",
    },
  ],
};

const CreateBranchForm = ({ placeId }: { placeId: string }) => {
  const [formStep, setFormStep] = useState(1);
  const [branchId, setBrachId] = useState<string | null>(null);

  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

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
