"use client";
import React from "react";
import RegisterExpertStepper from "./register-expert-stepper";
import ExpertDocumentsForm from "./documents-form";
import ExpertInfoForm from "./expert-info-form";
import MoreInfoForm from "./more-info-form";

const RegisterExpertForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <div className="w-full">
      <RegisterExpertStepper activeStep={activeStep} />
      {activeStep === 0 && <ExpertInfoForm setActiveStep={setActiveStep} />}
      {activeStep === 1 && <MoreInfoForm setActiveStep={setActiveStep} />}
      {activeStep === 2 && (
        <ExpertDocumentsForm setActiveStep={setActiveStep} />
      )}
    </div>
  );
};

export default RegisterExpertForm;
