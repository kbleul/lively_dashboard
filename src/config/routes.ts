export const routes = {
  signIn: "/signin",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",

  counselor: {
    dashboard: "/counselor",

    experts: {
      list: "/counselor/experts",
      create: "/counselor/experts/register-experts",
    },
    "edit-expert": (id: string) => `/counselor/experts/edit/${id}`,

    clients: "/counselor/clients",
    "client-detail": (clientId: string) => `/counselor/clients/${clientId}`,

    appointments: `/counselor/appointments`,
    "session-notes": `/counselor/session-notes`,

    intake: `/counselor/intake`,

    assessments: `/counselor/assessments`,
    "add-assessments-questions": (categoryId: string) =>
      `/counselor/assessments/${categoryId}/create-questions`,
    "view-assessments-questions": (categoryId: string) =>
      `/counselor/assessments/${categoryId}/view-questions`,

    "quick-self-assessment": `/counselor/assessments/quick-assessment`,

    "journal-prompts": `/counselor/journal-prompts`,

    mindfulness: `/counselor/exercises/mindfulness`,
    "mindfulness-exercises": (categoryId: string) =>
      `/counselor/exercises/mindfulness/${categoryId}`,

    reports: `/counselor/reports`,
    quotes: `/counselor/quotes`,
  },

  expert: {
    dashboard: "/expert",
    profile: "/expert/profile",
    schedule: "/expert/schedule",
    appointments: "/expert/appointments",
    availability: "/expert/availability",

    clients: "/expert/clients",
    "client-detail": (clientId: string) => `/expert/clients/${clientId}`,

    "join-meeting": (clientId: string, roomCode: string) =>
      `/expert/${clientId}/meeting/${roomCode}`,
    questionnaire: (clientId: string) => `/expert/${clientId}/questionnaire`,
  },

  // operational routes =>op means operational manager
  operationalManager: {
    dashboard: "/op",
    contact: "/op/contact",
    appointments: "/op/appointments",
    occupation: "/op/occupation",
    registerExpert: "/op/register-experts",
    banners: "/op/banners",
    subscriptions: "/op/subscriptions",

    centers: {
      list: "/op/centers",
      create: "/op/centers/create-wellbeing-center",
      edit: (id: string) => `/op/centers/edit/${id}`,
    },
    places: {
      list: "/op/places",
      create: "/op/places/create-place",
      edit: (id: string) => `/op/places/edit/${id}`,
      view: (id: string) => `/op/places/view/${id}`,

      "branch-dashboard": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-dashboard`,

      "create-branch": (id: string) => `/op/places/create-branch/${id}`,
      "edit-branch": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/edit-branch`,

      "branch-manager": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-manager`,
      "create-branch-manager": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-manager/create`,

      "branch-discounts": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-discounts`,
      "add-branch-discounts": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-discounts/create`,
      "edit-branch-discounts": (
        placeId: string,
        branchId: string,
        discountId: string
      ) =>
        `/op/places/${placeId}/branch/${branchId}/branch-discounts/edit/${discountId}`,

      "list-packages": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-packages`,
      "create-packages": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-packages/create`,
      "package-discounts": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-discounts/packages`,
      "add-package-discounts": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-discounts/packages/create`,
      "edit-package-discounts": (
        placeId: string,
        branchId: string,
        discountId: string
      ) =>
        `/op/places/${placeId}/branch/${branchId}/branch-discounts/packages/edit/${discountId}`,
      "package-bookings": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-discounts/packages/bookings`,

      "list-products": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-products`,
      "product-discounts": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-discounts/products`,
      "add-product-discounts": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-discounts/products/create`,
      "edit-product-discounts": (
        placeId: string,
        branchId: string,
        discountId: string
      ) =>
        `/op/places/${placeId}/branch/${branchId}/branch-discounts/products/edit/${discountId}`,

      "claimed-product-discounts": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-discounts/products/claimed`,
      "view-claimed-product-discounts": (
        placeId: string,
        branchId: string,
        discountId: string
      ) =>
        `/op/places/${placeId}/branch/${branchId}/branch-discounts/products/claimed/${discountId}`,

      "list-members": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-members`,
      "add-member": (placeId: string, branchId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-members/create`,
      "view-member": (placeId: string, branchId: string, userId: string) =>
        `/op/places/${placeId}/branch/${branchId}/branch-members/${userId}`,
    },

    product: {
      "claimed-product": (discountId: string) =>
        `/op/product-discount/${discountId}`,
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

      "list-members": (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/branch-members`,
      "add-member": (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/branch-members/create`,
      "view-member": (id: string, branchId: string, userId: string) =>
        `/so/${id}/branch/${branchId}/branch-members/${userId}`,

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
      "edit-product-discount": (
        id: string,
        branchId: string,
        dicountId: string
      ) =>
        `/so/${id}/branch/${branchId}/products/product-discounts/edit/${dicountId}`,
      "claimed-product-discounts": (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/products/claimed-product-discounts`,

      "package-discounts": (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/packages/package-discounts`,
      "add-package-discount": (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/packages/package-discounts/create`,
      "edit-package-discount": (
        id: string,
        branchId: string,
        dicountId: string
      ) =>
        `/so/${id}/branch/${branchId}/packages/package-discounts/edit/${dicountId}`,
      managers: (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/managers`,
      "add-manager": (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/managers/add-manager`,
      "edit-manager": (id: string, branchId: string, managerId: string) =>
        `/so/${id}/branch/${branchId}/managers/edit-manager/${managerId}`,
      reviews: (id: string, branchId: string) =>
        `/so/${id}/branch/${branchId}/reviews`,
    },
    product: {
      "claimed-product": (discountId: string) =>
        `/so/product-discount/${discountId}`,
    },
  },

  branchManger: {
    dashboard: "/bm",
    packages: "/bm/packages",
    createPackage: "/bm/packages/create-package",
    packageDiscount: "/bm/packages/discount",
    createPackageDiscount: "/bm/packages/discount/create",

    products: "/bm/products",
    addProduct: "/bm/products/create-product",

    "list-members": "/bm/branch-members",
    "view-member": (userId: string) => `/bm/branch-members/${userId}`,

    productsDiscount: "/bm/products/discount",
    createProductDiscount: "/bm/products/discount/create",
    editProductDiscount: {
      "edit-product-discount": (discountId: string) =>
        `/bm/products/discount/edit/${discountId}`,
    },

    claimedDiscount: "/bm/products/claimed-discount",
    reviews: "/bm/reviews",
    product: {
      "claimed-product": (discountId: string) =>
        `/bm/product-discount/${discountId}`,
    },
  },

  admin: {
    dashboard: "/admin",
    plans: "/admin/plans",
    "add-plans": "/admin/plans/create",
    "edit-plan": (planId: string) => `/admin/plans/edit/${planId}`,

    reason: "/admin/reason",
  },
};
