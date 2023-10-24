import { useState } from "react";
import Register from "./Register";
import SignIn from "./SignIn";

const Authentication = () => {
  const [register, setRegister] = useState(false);

  return (
    <div>
      {register ? (
        <Register setRegister={setRegister} />
      ) : (
        <SignIn setRegister={setRegister} />
      )}
    </div>
  );
};

export default Authentication;
