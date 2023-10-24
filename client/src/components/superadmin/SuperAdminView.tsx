import React from "react";
import AddSchool from "./AddSchool";
import DataNavbar from "./DataNavbar";

type Props = {};

const SuperAdminView = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <DataNavbar />
      <AddSchool />
    </div>
  );
};

export default SuperAdminView;
