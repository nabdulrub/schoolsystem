import { useAuth } from "../hooks/AuthProvider";
import SignOut from "./auth/SignOut";

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="p-4 w-full border-black border-b-2 mb-12">
      <ul className="flex gap-12 items-center justify-center">
        {!isLoggedIn && (
          <li>
            <a href="/">Home</a>
          </li>
        )}

        {isLoggedIn ? (
          <>
            <li>
              <a href="Dashboard">Dashboard</a>
            </li>
            <li className="border-[1px] border-black rounded-md px-2">
              <a href="Account">Account</a>
            </li>
            <li className="cursor-pointer">
              <SignOut />
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
