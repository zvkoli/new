import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { PulseLoader } from "react-spinners";
import CustomField from "../../components/module/CustomField";
// import axios from "axios";
import { toast } from "react-toastify";
// import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitPending, setSubmitPending] = useState(false);

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const validateLogin = (values) => {
    const errors = {};

    // if (!values.email) {
    //   errors.email = t("login.email_required");
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    //   errors.email = t("login.invalid_email");
    // }

    // if (!values.password) {
    //   errors.password = t("login.password_required");
    // } else if (values.password.length < 8) {
    //   errors.password = t("login.password_min_length");
    // } else if (/[\s]/.test(values.password)) {
    //   errors.password = t("login.password_no_space");
    // } else if (/[^A-Za-z0-9+=_)(*&^%$#@!><?/"'-×]/g.test(values.password)) {
    //   errors.password = t("login.password_invalid_chars");
    // }

    return errors;
  };

  const onSubmit = async (values) => {
    console.log(values);
    // setSubmitPending(true);
    // try {
    //   const res = await axios.post(
    //     `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_LOGIN}`,
    //     values
    //   );

    //   if (res.status === 200) {
    //     localStorage.setItem("counterAccesses", res.data.roles);

    //     toast.success(t("login.welcome"));

    //     const token = res.data.access_token;

    //     let expirationDate = new Date();
    //     expirationDate.setDate(expirationDate.getDate() + 365);
    //     Cookies.set("token", token, {
    //       expires: expirationDate,
    //     });

    //     setTimeout(() => {
    //       navigate("/");
    //     }, 5000);

    //     const deviceEndpoint = process.env.REACT_APP_FETCH_MYSEMINARS;
    //     const deviceData = await fetchMySeminars(deviceEndpoint, token);
    //     if (deviceData && deviceData.present) {
    //       const oldestItem = deviceData.present.reduce((oldest, current) => {
    //         const currentDate = new Date(current.created_at);
    //         const oldestDate = new Date(oldest.created_at);
    //         return currentDate < oldestDate ? current : oldest;
    //       });

    //       localStorage.setItem("seminarId", oldestItem.seminar.id);
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    //   if (error.status === 401) {
    //     toast.error(t("login.email_not_verified"));
    //   } else if (error.status === 403) {
    //     toast.error(t("login.signup_required"));

    //     setTimeout(() => {
    //       navigate("/signup");
    //     }, 5000);
    //   }
    // } finally {
    //   setSubmitPending(false);
    // }
  };

  return (
    <div
      style={{ direction: "ltr" }}
      className="w-full h-screen flex flex-col items-center justify-center bg-[#FFC057] font-iranyekan max-sm:px-5"
    >
      <div className="w-1/2 h-auto flex flex-col items-center justify-center rounded-xl gap-7 bg-white shadow py-14 max-lg:w-8/12 max-md:w-10/12 max-sm:w-full">
        <h1 className="text-2xl">{"Login"}</h1>
        <Formik
          initialValues={initialValues}
          validate={validateLogin}
          onSubmit={onSubmit}
        >
          <Form className="w-10/12 flex flex-col justify-center items-start gap-2">
            <CustomField id={"email"} name={"email"} placeholder={"Email"} />
            <div className="w-full flex items-center rounded-lg bg-gray-200">
              <Field
                className="w-full p-3 bg-transparent outline-none text-[0.90rem] max-sm:text-[0.80rem]"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder={"Password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-3 focus:outline-none"
              >
                {showPassword ? (
                  <VscEyeClosed size={20} />
                ) : (
                  <VscEye size={20} />
                )}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-[0.75rem]"
            />

            <div className="w-full h-auto flex flex-row justify-between items-center text-[0.90rem] p-2">
              <button onClick={() => navigate("/signup")}>{"Signup"}</button>
              <button type="button" onClick={() => navigate("/forgetpassword")}>
                {"Forgot password"}
              </button>
            </div>

            <div className="w-full h-auto flex flex-row justify-center items-center pt-5">
              <button
                type="submit"
                className="w-1/2 flex flex-row justify-center items-center text-black p-3 rounded-lg bg-[#FFC057] shadow"
              >
                {submitPending ? (
                  <PulseLoader size={10} color="#000" className="py-[5px]" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
