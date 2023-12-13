"use client";
import FormFooter from "@/components/form-footer";
import useDynamicMutation from "@/react-query/usePostData";
import React from "react";

interface Props {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const ExpertDocumentsForm = ({setActiveStep}:Props) => {
  const postMutation = useDynamicMutation();
  return (
    <div>
      <FormFooter
        isLoading={postMutation.isPending}
        submitBtnText={"Save & Continue"}
      />
    </div>
  );
};

export default ExpertDocumentsForm;
