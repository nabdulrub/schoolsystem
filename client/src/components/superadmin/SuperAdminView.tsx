import React from "react";
import AddSchool from "./AddSchool";
import DataNavbar from "./DataNavbar";
import RecentSchools from "./RecentSchools";

type Props = {};

const SuperAdminView = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <DataNavbar />
      <div className="flex gap-4 flex-1">
        <AddSchool />
        <div className="flex-1 w-full">
          <RecentSchools />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminView;
