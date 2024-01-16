"use client";

import React from "react";
import AddBranchManger from "./add-branch-manger";

const CreateBranchManagerForm = ({ branchId }: { branchId: string }) => {
  return (
    <article>
      <section className="pb-8">
        <h4 className="font-normal text-3xl text-black">
          Create Branch Manager
        </h4>
        <div className="flex justify-start items-center gap-x-6">
          <p className="text-[#5F5F5F]">Operation Manager</p>
          <p className="w-2 h-2 rounded-full bg-[#5F5F5F]"></p>
          <p className="text-[#5F5F5F]">Place</p>
          <p className="w-2 h-2 rounded-full  bg-[#5F5F5F] "></p>
          <p className="text-[#5F5F5F]">Branch</p>
          <p className="w-2 h-2 rounded-full  bg-[#5F5F5F] "></p>
          <p className="text-[#5F5F5F]">Branch Manager</p>
        </div>
      </section>

      <AddBranchManger branchId={branchId} />
    </article>
  );
};

export default CreateBranchManagerForm;
