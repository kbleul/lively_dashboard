"use client";
import FormFooter from "@/components/form-footer";
import useDynamicMutation from "@/react-query/usePostData";
import React from "react";
import { Button } from "@/components/ui/button";
interface Props {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const ExpertDocumentsForm = ({ setActiveStep }: Props) => {
  const postMutation = useDynamicMutation();
  return (
    <div>
      {/* <FormFooter
        isLoading={postMutation.isPending}
        submitBtnText={"Save & Continue"}
      /> */}
      <h2>Registration is successfully done</h2>
    </div>
  );
};

export default ExpertDocumentsForm;
