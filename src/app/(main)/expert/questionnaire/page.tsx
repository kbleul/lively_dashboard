import React from "react";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import ExpertProfile from "@/app/shared/expert/profile";
import QuestionnaireDispatch from "@/app/shared/expert/questionnairs/QuestionnaireDispatch";
export const metadata = {
  ...metaObject("Questionnaire"),
};

const Questionnaire = () => {
  return <QuestionnaireDispatch />;
};

export default Questionnaire;
