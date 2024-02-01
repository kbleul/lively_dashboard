import React from "react";

const ClientsCard = () => {
  return (
    <article className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 gap-x-4 border-b mx-2 mt-4">
      <div className="flex items-center justify-start gap-4 ">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full"></div>

        <div>
          <p className="font-semibold text-lg md:text-xl">Tesfaye Berihu</p>
          <p className="">Tesfaye2819</p>
        </div>
      </div>
      <p className="self-end md:self-start">Jan 12, 2024</p>
    </article>
  );
};

export default ClientsCard;
