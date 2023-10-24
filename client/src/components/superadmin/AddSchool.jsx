import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../api/axios";
import Cookies from "js-cookie";

const AddSchool = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      location: "",
    },
  });

  const token = Cookies.get("_school_token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post(
        "/schools",
        {
          ...data,
        },
        { headers }
      );

      if (response.data.ok) {
        navigate(0);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[450px] w-full">
      <div className="flex flex-col gap-4 border-black border-[1px] rounded-md p-4">
        <p className="text-xl font-semibold">Add School</p>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <div className="grid gap-1">
              <label>School Name</label>
              <input
                type="text"
                name="name"
                className="border-gray-800 border-[1px] rounded-md p-1"
                required
                onChange={onChange}
                value={value}
              />
            </div>
          )}
        />
        <Controller
          name="location"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <div className="grid gap-1">
              <label>School Location</label>
              <input
                type="text"
                name="location"
                className="border-gray-800 border-[1px] rounded-md p-1"
                required
                onChange={onChange}
                value={value}
              />
            </div>
          )}
        />
        <button
          type="submit"
          className="border-black border-2 px-4 py-1 rounded-md w-fit self-end"
        >
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
};

export default AddSchool;
