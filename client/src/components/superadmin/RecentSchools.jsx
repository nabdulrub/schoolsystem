import { useEffect, useState } from "react";
import { Axios } from "../../../api/axios";
import School from "./School";

const RecentSchools = () => {
  const [schools, setSchools] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await Axios.get("/schools");

        if (response.data.ok) {
          setSchools(response.data.data.schools);
        }
      } catch (error) {}
    };

    fetchSchools();
  }, []);

  return (
    <div>
      <p className="text-xl font-bold">Schools</p>
      <div className="mt-4 flex flex-col gap-[1px]">
        {schools?.length ? (
          schools?.map((school) => (
            <School
              name={school.name}
              location={school.location}
              key={school._id}
            />
          ))
        ) : (
          <p>No Schools Found</p>
        )}
      </div>
    </div>
  );
};

export default RecentSchools;
