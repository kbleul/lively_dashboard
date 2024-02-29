export const genderOptions = [
  {
    name: "Male",
    value: "Male",
  },
  {
    name: "Female",
    value: "Female",
  },
];

export const workCustomDays = [
  {
    isActive: false,
    day: "Monday",
    from: "02:30:00",
    to: "11:30:00",
  },
  {
    isActive: false,
    day: "Tuesday",
    from: "02:30:00",
    to: "11:30:00",
  },
  {
    isActive: false,
    day: "Wednesday",
    from: "02:30:00",
    to: "11:30:00",
  },
  {
    isActive: false,
    day: "Thursday",
    from: "02:30:00",
    to: "11:30:00",
  },
  {
    isActive: false,
    day: "Friday",
    from: "02:30:00",
    to: "11:30:00",
  },
  {
    isActive: false,
    day: "Saturday",
    from: "02:30:00",
    to: "11:30:00",
  },
  {
    isActive: false,
    day: "Sunday",
    from: "02:30:00",
    to: "11:30:00",
  },
  // {
  //   "day_of_week": "Tuesday",
  //   "opening_time": "02:00:00",
  //   "closing_time": "12:59:59",
  // },
];

export const CreatePlaceSteps = [
  {
    id: "create-store-step-1",
    title: "Owner info.",
    subTitle: "About the owner",
  },
  {
    id: "create-store-step-2",
    title: "Store info.",
    subTitle: "About the Store",
  },
];

export const CreateBranchSteps = [
  {
    id: "create-branch-step-1",
    title: "Branch info.",
    subTitle: "About the Branch",
  },
  {
    id: "create-branch-step-2",
    title: "More info.",
    subTitle: "More information",
  },
  {
    id: "create-branch-step-3",
    title: "Manager Info.",
    subTitle: "About the branch manager",
  },
];

export const CreateBranchStoreSteps = [
  {
    id: "create-branch-step-1",
    title: "Branch info.",
    subTitle: "About the Branch",
  },
  {
    id: "create-branch-step-2",
    title: "More info.",
    subTitle: "More information",
  },
];

export const QuestionnairTypes = {
  single: "single",
  multiple: "multiple",
  integer: "integer",
  string: "string",
  text: "text",
  file: "file",
  date: "date",
  time: "time",
  datetime: "datetime",
  boolean: "boolean",
  boolean_reason: "boolean_reason",
};

export const QuestionnairRadioItems = [
  QuestionnairTypes.boolean,
  QuestionnairTypes.boolean_reason,
  QuestionnairTypes.multiple,
  QuestionnairTypes.single,
];
