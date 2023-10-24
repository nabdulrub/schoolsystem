import React from "react";

const Welcome = ({ role, username }) => {
  return (
    <div className="w-full mb-4">
      <p className="text-2xl">
        Welcome back,{" "}
        <span className=" capitalize font-bold">
          {role === "admin"
            ? "Admin"
            : role === "superadmin"
            ? "Super Admin"
            : username}
        </span>
      </p>
    </div>
  );
};

export default Welcome;
