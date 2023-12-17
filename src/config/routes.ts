export const routes = {
  contentCreator: {
    dashboard: "/content-creator",
    city: "/content-creator/city",
    speciality: "/content-creator/speciality",
    occupation: "/content-creator/occupation",
    experts: {
      register: "/content-creator/experts/register",
      createWellbeing: "/content-creator/create-wellbeing-center",
    },
  },

  signIn: "/signin",
  forgotPassword: "/forgot-password",
  appointments: "/content-creator/appointments",

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
    speciality: "/op/speciality",
    occupation: "/op/occupation",
    registerExpert: "/op/register-experts",
    createWellbeing: "/op/create-wellbeing-center",
  },
};
