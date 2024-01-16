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
      edit: (id: string) => `/op/places/edit/${id}`,
      view: (id: string) => `/op/places/view-place/${id}`,
      "create-branch": (id: string) => `/op/places/create-branch/${id}`,
      "branch-manager": (id: string) => `/op/places/branch-manager/${id}`,
      "create-branch-manager": (id: string) =>
        `/op/places/create-branch-manager/${id}`,
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
    editProduct: (id: string) => `/contentc/products/edit/${id}`,
    detailProduct: (id: string) => `/contentc/products/detail/${id}`,
    services: {
      list: "/contentc/services",
      amenity: "/contentc/services/amenity",
    },
  },
  storeOwner: {
    home: "/so",
    dashboard: (id: string) => `/so/${id}`,
    branches: (id: string) => `/so/${id}/branches`,
    managers: (id: string) => `/so/${id}/managers`,
    branch: {
      dashboard: (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}`,
      products: (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/products`,
      packages: (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/packages`,
      createPackage: (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/packages/create-package`,
    },
  },
  branchManger: {
    dashboard: "/bm",
    packages: "/bm/packages",
    createPackage: "/bm/packages/create-package",
    products: "/bm/products",
    addProduct: "/bm/products/create-product",
  },
};
