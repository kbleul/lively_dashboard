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
    contact: "/op/contact",
    appointments: "/op/appointments",
    occupation: "/op/occupation",
    registerExpert: "/op/register-experts",
    banners: "/op/banners",
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
      view: (id: string) => `/op/places/view/${id}`,
      "create-branch": (id: string) => `/op/places/create-branch/${id}`,
      "edit-branch": (id: string) => `/op/places/edit-branch/${id}`,
      "branch-manager": (id: string) => `/op/places/branch-manager/${id}`,
      "create-branch-manager": (id: string) =>
        `/op/places/create-branch-manager/${id}`,
      "branch-discounts": (id: string) => `/op/places/branch-discounts/${id}`,
      "add-branch-discounts": (id: string) =>
        `/op/places/branch-discounts/${id}/create`,
    },
  },
  // content cretor routes
  contentCreator: {
    dashboard: "/contentc",
    language: "/contentc/language",
    city: "/contentc/city",
    speciality: "/contentc/speciality",
    occupation: "/contentc/occupation",
    registerExpert: "/contentc/register-experts",
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
    "create-branch": (id: string) => `/so/${id}/create-branch`,

    managers: (id: string) => `/so/${id}/managers`,
    "add-manager": (id: string) => `/so/${id}/managers/add-manager`,
    "edit-manager": (id: string, managerId: string) =>
      `/so/${id}/managers/edit-manager/${managerId}`,

    branch: {
      dashboard: (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}`,
      "edit-branch": (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/edit-branch`,
      products: (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/products`,
      packages: (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/packages`,
      createPackage: (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/packages/create`,
      "product-discounts": (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/products/product-discounts`,
      "add-product-discount": (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/products/product-discounts/create`,
      "package-discounts": (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/packages/package-discounts`,
      "add-package-discount": (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/packages/package-discounts/create`,
      managers: (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/managers`,
      "add-manager": (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/managers/add-manager`,
      "edit-manager": (id: string, branchId: string, managerId: string) =>
        `/so/${id}/branch/${branchId}/managers/edit-manager/${managerId}`,
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
