import React from "react";
import StatCards from "./StatCards";
import Link from "next/link";
import ClientsCard from "./ClientsCard";
import TopProductsCard from "./TopProductsCard";

const Dashboard = () => {
  return (
    <main className="@container">
      <article className="grid grid-cols-12 gap-6 3xl:gap-8 py-6 border-t">
        <StatCards className="col-span-full @2xl:grid-cols-2 @6xl:grid-cols-4" />
      </article>
      <section className="flex flex-col md:flex-row items-stretch justify-between w-full">
        <div className="border border-[#D0D0D0] w-full md:w-[49%] gap-6 3xl:gap-8 p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold md:text-2xl">Clients</h4>
            <Link
              href={""}
              className="border border-[#D0D0D0] rounded-lg px-4 md:px-8 py-2 text-[#7B7B7B]"
            >
              See All
            </Link>
          </div>

          <ClientsCard />
          <ClientsCard />
          <ClientsCard />
          <ClientsCard />
          <ClientsCard />
        </div>
        <div className="border border-[#D0D0D0] w-full md:w-[49%] gap-6 3xl:gap-8 p-6 pt-8 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold md:text-xl">Top Products</h4>
            <Link
              href={""}
              className="border border-[#D0D0D0] rounded-lg px-3 md:px-6 py-2 text-[#7B7B7B]"
            >
              View All
            </Link>
          </div>

          <TopProductsCard />
          <TopProductsCard />
          <TopProductsCard />
          <TopProductsCard />
          <TopProductsCard />
          <TopProductsCard />
          <TopProductsCard />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
