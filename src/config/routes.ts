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
    contact: "/op/contact",
    appointments: "/op/appointments",
    speciality: "/op/speciality",
    occupation: "/op/occupation",
    registerExpert: "/op/register-experts",
    centers: {
      list: "/op/centers",
      create: "/op/centers/create-wellbeing-center",
      edit: (id: string) => `/op/centers/edit/${id}`,
    },
    experts: {
      list: "/op/experts",
      create: "/op/experts/register-experts",
      edit: (id: string) => `/op/experts/edit/${id}`,
    },
    places: {
      list: "/op/places",
      create: "/op/places/create-place",
      edit: (id: string) => `/op/places/edit-place/${id}`,
      view: (id: string) => `/op/places/view/${id}`,
      "create-branch": (id: string) => `/op/places/create-branch/${id}`,
    },
  },
  // content cretor routes
  contentCreator: {
    dashboard: "/contentc",
    language: "/contentc/language",
    paymentMethod: "/contentc/payment-methods",
    tags: "/contentc/tags",
    unit: "/contentc/units",
    brand: "/contentc/brands",
    product: "/contentc/products",
    addProduct: "/contentc/products/add-product",
    services: {
      list: "/contentc/services",
      amenity: "/contentc/services/amenity",
    },
  },
};
