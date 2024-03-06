"use client";
import React from "react";
import RegisterExpertStepper from "./register-expert-stepper";
import ExpertInfoForm from "./expert-info-form";
import MoreInfoForm from "./more-info-form";
import { useSearchParams } from "next/navigation";
import ExpertAvailability from "./expert-availability";

const RegisterExpertForm = () => {
  const searchParams = useSearchParams();
  const user = searchParams.get("userId");
  const step = searchParams.get("step");
  const name = searchParams.get("name");
  const expertId = searchParams.get("expertId");

  const [userId, setUserId] = React.useState("");
  const [activeStep, setActiveStep] = React.useState(Number(step) ?? 0);
  return (
    <div className="w-full">
      <RegisterExpertStepper activeStep={activeStep} />
      {activeStep === 0 && (
        <ExpertInfoForm setActiveStep={setActiveStep} setUserId={setUserId} />
      )}
      {activeStep === 1 && (
        <MoreInfoForm
          setActiveStep={setActiveStep}
          userId={expertId ? expertId : user ?? userId}
          name={name}
          setUserId={setUserId}
        />
      )}
      {activeStep === 2 && (
        <ExpertAvailability
          userId={expertId ? expertId : user ?? userId}
          name={name}
        />
      )}
    </div>
  );
};

export default RegisterExpertForm;
