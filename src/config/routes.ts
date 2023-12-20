export const routes = {
  signIn: "/signin",
  forgotPassword: "/forgot-password",

  //expert routes
  expert: {
    dashboard: "/expert",
    profile: "/expert/profile",
    schedule: "/expert/schedule",
    appointments: "/expert/appointments",
    availability: "/expert/availability",
  },
  // operational routes =>op means operational manager
  operationalManager: {
    dashboard: "/op",
    city: "/op/city",
    appointments: "/op/appointments",
    speciality: "/op/speciality",
    occupation: "/op/occupation",
    registerExpert: "/op/register-experts",
    centers: {
      list: "/op/centers",
      create: "/op/centers/create-wellbeing-center",
      edit: "/op/edit-wellbeing-center",
    },
    experts: {
      list: "/op/experts",
      create: "/op/experts/register-experts",
    },
  },
};
