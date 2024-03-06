import * as Yup from "yup";

export const categoriesSchema = Yup.object().shape({
  nameEnglish: Yup.string().required("Category name is required"),
  descriptionEnglish: Yup.string().required("Category description is required"),
  number_of_question: Yup.number()
    .min(1)
    .required("Number of questions is required"),
  image: Yup.mixed().required("Cover image is required"),
});

export type CategoriesType = {
  nameEnglish: string;
  descriptionEnglish: string;
  number_of_question: number;
  image: string;
};

export const assessmentQuestionschema = Yup.object().shape({
  questions: Yup.array()
    .of(
      Yup.object().shape({
        question_text: Yup.string().required("Question is required"),
        options: Yup.array().of(Yup.string()),
      })
    )
    .required("Questions are required"),
});

export type assessmentQuestionType = {
  question_text: string;
  options: string[];
};

export const singleAssessmentQuestionSchema = Yup.object().shape({
  question_text: Yup.string().required("Question is required"),
  options: Yup.array().of(Yup.string()),
});
export type assessmentQuestionsType = {
  questions: assessmentQuestionType[];
};
