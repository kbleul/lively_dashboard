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
export const mindfulnessCategoriesSchema = Yup.object().shape({
  nameEnglish: Yup.string().required("English category name is required"),
  nameAmharic: Yup.string().required("Amharic Category name is required"),
  descriptionEnglish: Yup.string().required(
    "English category description is required"
  ),
  descriptionAmharic: Yup.string().required(
    "Amharic category description is required"
  ),
  image: Yup.mixed().required("Cover image is required"),
});

export type mindfulnessCategoriesType = {
  nameAmharic: string;
  nameEnglish: string;
  descriptionEnglish: string;
  descriptionAmharic: string;
  image: string;
};

export const mindfulnessExerciseSchema = Yup.object().shape({
  titleAmharic: Yup.string().required("Amharic exercise title is required"),
  titleEnglish: Yup.string().required("English exercise title is required"),

  masterAmharic: Yup.string().required("Narrator amharic name is required"),
  masterEnglish: Yup.string().required("Narrator english name is required"),

  durationAmharic: Yup.string().required("Amharic audio duration is required"),
  durationEnglish: Yup.string().required("English audio duration is required"),

  audioAmharic: Yup.mixed().required("Amharic Audio is required"),
  audioEnglish: Yup.mixed().required("English Audio is required"),
});

export const editMindfulnessExerciseSchema = Yup.object().shape({
  titleAmharic: Yup.string().required("Amharic exercise title is required"),
  titleEnglish: Yup.string().required("English exercise title is required"),

  masterAmharic: Yup.string().required("Narrator amharic name is required"),
  masterEnglish: Yup.string().required("Narrator english name is required"),

  durationAmharic: Yup.string().required("Amharic audio duration is required"),
  durationEnglish: Yup.string().required("English audio duration is required"),
});

export type mindfulnessExerciseType = {
  titleEnglish: string;
  titleAmharic: string;
  masterAmharic: string;
  masterEnglish: string;
  durationAmharic: string;
  durationEnglish: string;
  audioAmharic: string;
  audioEnglish: string;
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
