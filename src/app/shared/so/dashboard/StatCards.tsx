import React from "react";

import cn from "@/utils/class-names";

import ExpertIcon from "@/components/icons/expert-icon";
import CenterIcon from "@/components/icons/center-icon";
import AppointmentErrorIcon from "@/components/icons/appointement-error";
import AppointmentCheckIcon from "@/components/icons/appointment-check";
import MetricCard from "@/components/cards/metric-card";

const ticketStats = [
  {
    id: 1,
    icon: <AppointmentCheckIcon className="h-full w-full" />,
    title: "Total Packages",
    metric: "12",
  },
  {
    id: 2,
    icon: <AppointmentErrorIcon className="h-full w-full" />,
    title: "Registered Members",
    metric: "31",
  },
  {
    id: 3,
    icon: <CenterIcon className="h-full w-full" />,
    title: "Products",
    metric: "06",
  },
  {
    id: 3,
    icon: <ExpertIcon className="h-full w-full" />,
    title: "Appointments",
    metric: "06",
  },
];

const StatCards = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("grid grid-cols-1 gap-5 3xl:gap-8 4xl:gap-9", className)}
    >
      {ticketStats.map((stat) => (
        <MetricCard
          key={stat.title + stat.id}
          title={stat.title}
          metric={stat.metric}
          icon={stat.icon}
          iconClassName="bg-transparent w-11 h-11"
        />
      ))}
      {ticketStats.map((stat) => (
        <MetricCard
          key={stat.title + stat.id}
          title={stat.title}
          metric={stat.metric}
          icon={stat.icon}
          iconClassName="bg-transparent w-11 h-11"
        />
      ))}
    </div>
  );
};

export default StatCards;
