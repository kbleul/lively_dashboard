import CreateWellbeignCenterForm from "@/app/shared/operational-manager/create-wellbeing-center";
import EditCenter from "@/app/shared/operational-manager/create-wellbeing-center/edit-center";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}
const EditWellbeingCenter = ({ params }: Props) => {
  return <EditCenter params={params}/>;
};

export default EditWellbeingCenter;
