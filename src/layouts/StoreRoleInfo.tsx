import { usePathname } from "next/navigation";
import React from "react";

const StoreRoleInfo = ({ className }: { className: string }) => {
  const pathname = usePathname();

  return (
    <article className={className}>
      <p className=" font-semibold text-lg md:text-xl">
        Acting as -{" "}
        <span className="font-medium underline">
          {pathname.split("/").includes("branch")
            ? "Branch Manager"
            : "Store Owner"}
        </span>
      </p>
    </article>
  );
};

export default StoreRoleInfo;
