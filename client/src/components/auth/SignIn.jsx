import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../api/axios";
import { useAuth } from "../../hooks/AuthProvider";

const SignIn = ({ setRegister }) => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { isLoggedIn, signIn } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post("/auth/signin", {
        ...data,
      });

      if (!response.data.auth) return console.log("Error authenticating user!");

      if (response.data.auth) {
        signIn({
          token: response.data.token,
          userData: response.data.user,
        });
        navigate("/dashboard");
        navigate(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[450px] w-full border-gray-400 bg-gray-50 border-2 rounded-2xl p-4 mx-auto"
    >
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">Sign In</p>
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <div className="grid gap-1">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="border-gray-800 border-[1px] rounded-md p-1"
                required
                onChange={onChange}
                value={value}
              />
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <div className="grid gap-1">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="border-gray-800 border-[1px] rounded-md p-1"
                required
                onChange={onChange}
                value={value}
              />
            </div>
          )}
        />
        <p>
          Don&apos;t have an account?{" "}
          <a
            className="border-b-[1px] border-black hover:text-blue-500 hover:border-blue-500"
            onClick={() => setRegister(true)}
          >
            Register Now
          </a>
        </p>
        <button
          type="submit"
          className="border-black border-2 px-4 py-1 rounded-md w-fit self-end"
        >
          Sign In
        </button>
        {isLoggedIn && "Logged In!"}
      </div>
    </form>
  );
};

export default SignIn;
