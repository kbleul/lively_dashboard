import React from "react";
import StatCards from "./stat-cards";
import TopExperts from "./top-experts";

const Dashboard = () => {
  return (
    <div className="@container">
      <div className="grid grid-cols-12 gap-6 3xl:gap-8">
        <StatCards className="col-span-full @2xl:grid-cols-2 @6xl:grid-cols-4" />
        <TopExperts className="col-span-full @4xl:col-span-6 @5xl:col-span-5" />
      </div>
    </div>
  );
};

export default Dashboard;
