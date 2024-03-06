import * as Yup from "yup";

export const sessionNotesSchema = Yup.object().shape({
  history: Yup.string().required("History is required"),
  reason: Yup.string().required("Reason is required"),
  observations: Yup.string().required("Pbservations is required"),
  interaction: Yup.string().required("Interaction is required"),
  activities: Yup.string().required("Activities is required"),
  challenges: Yup.string().required("Challenges is required"),
  assignments: Yup.string().required("Assignments is required"),
  next_session_plan: Yup.string().required("Next session plan is required"),
});

type SessionNotesTypes = Yup.InferType<typeof sessionNotesSchema>;

export type { SessionNotesTypes };
