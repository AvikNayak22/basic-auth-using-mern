import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { handleError } from "../utils/handleError";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const defaultValues = {
  email: "",
  username: "",
  password: "",
};

const Signup = () => {
  const [signupInput, setSignupInput] = useState(defaultValues);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/user/signup", {
        username: signupInput.username,
        email: signupInput.email,
        password: signupInput.password,
      });
      navigate("/login");
      toast.success("User created successfully!");
    } catch (error) {
      handleError(error);
    }
  };

  const handleOnChange = (e) => {
    setSignupInput((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="__signup w-full h-[calc(100dvh-60px)]  bg-slate-800 text-white flex justify-center items-center flex-col gap-3">
      <h1 className="text-3xl">Signup Page</h1>
      <form onSubmit={handleSubmit} className="rounded flex flex-col gap-2 ">
        <input
          className="text-black outline-none p-2 rounded"
          type="text"
          placeholder="Username"
          required
          name="username"
          value={signupInput.username}
          onChange={handleOnChange}
        />
        <input
          className="text-black outline-none p-2 rounded"
          type="email"
          placeholder="Email"
          required
          name="email"
          value={signupInput.email}
          onChange={handleOnChange}
        />
        <input
          className="text-black outline-none p-2 rounded"
          type="password"
          placeholder="Password"
          required
          name="password"
          value={signupInput.password}
          onChange={handleOnChange}
        />
        <button className="primary-btn" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
