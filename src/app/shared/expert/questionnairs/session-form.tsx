"use client";

import { Lily_Script_One } from "next/font/google";

const lily = Lily_Script_One({
  weight: "400", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});
import { useGetHeaders } from "@/hooks/use-get-headers";
import React from "react";
import { Form, Formik } from "formik";
import { Button, Title } from "rizzui";
import Spinner from "@/components/ui/spinner";
import useDynamicMutation from "@/react-query/usePostData";

import { toast } from "sonner";
import {
  SessionNotesTypes,
  sessionNotesSchema,
} from "@/validations/questionnair";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { queryKeys } from "@/react-query/query-keys";
import { useModal } from "../../modal-views/use-modal";
import { useQueryClient } from "@tanstack/react-query";

const SessionForm = ({
  clientId,
  appointmentId,
}: {
  clientId: string;
  appointmentId?: string;
}) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { closeModal } = useModal();

  const savedAppointment = localStorage.getItem("appointmentDetails");
  const appointmentData = savedAppointment
    ? JSON.parse(savedAppointment)
    : null;

  const postMutation = useDynamicMutation();

  const headers = useGetHeaders({ type: "FormData" });

  const handleSubmotSessionNotes = async (values: SessionNotesTypes) => {
    if (appointmentData && appointmentData.id) {
      try {
        await postMutation.mutateAsync({
          url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/client-session-summary`,
          method: "POST",
          headers,
          body: {
            ...values,
            appointment_id: appointmentId ? appointmentId : appointmentData.id,
          },
          onSuccess: (res) => {
            toast.success("Session notes added successfully !");

            if (appointmentId) {
              queryClient.invalidateQueries({
                queryKey: [queryKeys.getAppointmentsHistory + clientId],
              });

              closeModal();
              return;
            }

            router.push(routes.expert["client-detail"](clientId));
            localStorage.removeItem("appointmentDetails");
          },
          onError: (err) => {
            toast.error(err?.response?.data?.data);
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const initalValues: SessionNotesTypes = {
    history: "",
    reason: "",
    observations: "",
    interaction: "",
    activities: "",
    challenges: "",
    assignments: "",
    next_session_plan: "",
  };

  return (
    <article className="col-span-2 ">
      <Formik
        initialValues={initalValues}
        onSubmit={(values) => handleSubmotSessionNotes(values)}
        validationSchema={sessionNotesSchema}
      >
        {({}) => (
          <Form className="w-full">
            <main className=" ml-4">
              <article className="px-4 rounded-xl border bg-[#FFF9F2] mb-4 pb-4 md:col-span-8 w-full flex flex-col items-start space-y-1">
                <Title
                  as="h5"
                  className={
                    lily.className +
                    " pb-4 pt-8 text-center font-bold text-3xl text-[#5B3F3F] w-full"
                  }
                >
                  Session Notes
                </Title>

                <section className=" p-3 pt-0 mb-4 rounded-md w-full flex flex-col items-start space-y-5 col-span-2">
                  <FormikTextArea
                    name="history"
                    label="Brief client history during the session:"
                  />
                  <FormikTextArea
                    name="reason"
                    label="Reason for counseling:"
                  />
                  <FormikTextArea
                    name="observations"
                    label="Therapist's observations of the client:"
                  />
                  <FormikTextArea
                    name="interaction"
                    label="herapist-client interaction:"
                  />
                  <FormikTextArea
                    name="activities"
                    label="Problems addressed/ Activities done during session:"
                  />
                  <FormikTextArea
                    name="challenges"
                    label="Challenges observed:"
                  />
                  <FormikTextArea name="assignments" label="Assignments:" />
                  <FormikTextArea
                    name="next_session_plan"
                    label="Next session plan:"
                  />
                </section>
              </article>

              <div className="flex items-end justify-end gap-3 mb-2 w-full">
                {appointmentId && (
                  <Button
                    type="submit"
                    color="primary"
                    className="min-w-28 text-black bg-inherit border border-black  font-medium hover:text-white hover:border-none focus:text-white focus:border-none"
                    onClick={() => closeModal()}
                  >
                    Cancle
                  </Button>
                )}

                <Button
                  isLoading={postMutation.isPending}
                  type="submit"
                  color="primary"
                  className="text-white bg-gradient-to-r from-[#008579] to-[#00BA63] font-medium hover:text-white hover:border-none focus:text-white focus:border-none min-w-28"
                >
                  {postMutation.isPending ? <Spinner size="sm" /> : "Submit"}
                </Button>
              </div>
            </main>
          </Form>
        )}
      </Formik>
    </article>
  );
};

export default SessionForm;
