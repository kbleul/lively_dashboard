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
    createWellbeing: "/expert/create-wellbeing-center",
  },
};
