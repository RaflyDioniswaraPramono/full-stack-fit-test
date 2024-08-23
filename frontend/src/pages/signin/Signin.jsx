import { bgImage } from "../../assets";
import { Form, Formik } from "formik";
import { BackdropLoader, FormField } from "../../components";
import { AuthServices } from "../../services/AuthServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSignin = async (values) => {
    try {
      setIsLoading(true);

      const response = await AuthServices.signIn(values);

      if (response.success === true) {
        localStorage.setItem("token", JSON.stringify(response?.payload?.data));

        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-3 h-screen">
      {isLoading && <BackdropLoader />}
      <div className="col-span-2 px-6 py-8">
        <img src={bgImage} alt="Background Image" className="w-full h-full rounded-xl" />
      </div>
      <div className="col-span-1 px-6 py-8">
        <div className="border-2 border-zinc-300 rounded-xl py-6 px-8 h-full">
          <h1 className="text-5xl text-center font-extrabold mb-12">SIGN IN</h1>
          <div className="mb-12">
            <Formik initialValues={initialValues} onSubmit={handleSignin}>
              {({ isValid }) => {
                return (
                  <Form>
                    <div className="mb-6">
                      <FormField label="Username" name="username" type="text" />
                    </div>
                    <div className="mb-8">
                      <FormField label="Password" name="password" type="password" />
                    </div>
                    <button
                      disabled={!isValid}
                      type="submit"
                      className="py-3 px-5 rounded-sm bg-slate-700 hover:bg-slate-800 transition-colors duration-150 text-sm leading-none w-1/3 text-white">
                      Sign In
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="flex justify-center">
            <p className="text-sm text-center tracking-wide text-zinc-600">
              Selamat datang di Aplikasi Manajemen Iuran Kutorenon Village. Aplikasi ini bertujuan untuk memanajemen
              pembayaran iuran bulanan untuk satpam dan kebersihan lingkungan perumahan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
