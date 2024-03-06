import React from "react";
import { metaObject } from "@/config/site.config";
import QuestionnaireDispatch from "@/app/shared/expert/questionnairs/QuestionnaireDispatch";
export const metadata = {
  ...metaObject("Questionnaire"),
};

const Questionnaire = ({ params }: { params: { clientId: string } }) => {
  return <QuestionnaireDispatch clientId={params.clientId} />;
};

export default Questionnaire;
