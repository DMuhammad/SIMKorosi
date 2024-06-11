import { useState } from "react";
import { Link } from "react-router-dom";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import { useLogin } from "../../hooks/useAuth";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login, isLoading } = useLogin();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(form);
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 mx-auto w-11/12 sm:w-full max-w-[480px]">
        <div className="bg-white px-6 py-6 shadow rounded-lg sm:px-12 sm:py-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
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

            <div className="flex items-center justify-end">
              <div className="text-sm leading-6">
                <Link
                  to={"../auth/forgot-password"}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Lupa password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link
            to={"../auth/register"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
