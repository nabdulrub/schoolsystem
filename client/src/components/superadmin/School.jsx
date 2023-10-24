import React, { useState } from "react";
import { useForm } from "react-hook-form";

const School = ({ id, name, location }) => {
  const [edit, setEdit] = useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      _id: id,
      name: name,
      location: location,
    },
  });

  const onUpdate = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
      <div className="border-[1px] border-black flex">
        <div className="px-4 border-r-[1px] border-black flex-1">
          <label className="font-semibold text-sm">Name</label>
          <p className="font-thin">{name}</p>
        </div>
        <div className="px-4 border-black flex-1">
          <label className="font-semibold text-sm">Location</label>
          <p className="font-thin">{location}</p>
        </div>
        <div className="flex items-center">
          {edit ? (
            <button
              className="bg-gray-900 hover:bg-gray-500 px-3.5 py-3 text-white transition-all duration-300 max-w-[300px] w-full"
              type="submit"
            >
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              className="bg-gray-900 hover:bg-gray-500 px-12 py-3 text-white transition-all duration-300 max-w-[300px] w-full"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default School;
