import { useState } from "react";
import { Link } from "react-router-dom";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import { useRegister } from "../../hooks/useAuth";

export default function SignUp() {
  const [form, setForm] = useState({
    namalengkap: "",
    email: "",
    password: "",
    confpassword: "",
  });

  const { register, isLoading } = useRegister();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    register(form);
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up a New Account
        </h2>
      </div>

      <div className="mt-10 mx-auto w-11/12 sm:w-full max-w-[480px]">
        <div className="bg-white px-6 py-6 shadow rounded-lg sm:px-12 sm:py-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <TextInputWithLabel
              id={"namalengkap"}
              label={"Nama Lengkap"}
              name={"namalengkap"}
              type={"text"}
              value={form.namalengkap}
              onChange={handleChange}
            />

            <TextInputWithLabel
              id={"email"}
              label={"Email"}
              name={"email"}
              type={"email"}
              value={form.email}
              onChange={handleChange}
            />

            <TextInputWithLabel
              id={"password"}
              label={"Password"}
              name={"password"}
              type={"password"}
              value={form.password}
              onChange={handleChange}
            />

            <TextInputWithLabel
              id={"confpassword"}
              label={"Konfirmasi Password"}
              name={"confpassword"}
              type={"password"}
              value={form.confpassword}
              onChange={handleChange}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link
            to={"../auth/login"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
