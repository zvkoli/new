import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomField from "../../components/module/CustomField";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";

const Signup = () => {
  const navigate = useNavigate();
  const [submitPending, setSubmitPending] = useState(false);

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, []);

  const baseURL = window.location.origin;

  const initialValues = {
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    // if (!values.first_name) {
    //   errors.first_name = t("signup.first_name_required");
    // } else if (
    //   /[\d]/.test(values.first_name) ||
    //   /[)(*&^%$#@!+=./؟?[<>!×÷{}""''|_-]/.test(values.first_name)
    // ) {
    //   errors.first_name = t("signup.first_name_invalid_chars");
    // }
    // else if (/[^آ-ی\s]/.test(values.first_name)) {
    //   errors.first_name = "نام می تواند شامل حروف فارسی باشد";
    // }

    // if (!values.last_name) {
    //   errors.last_name = t("signup.last_name_required");
    // } else if (
    //   /[\d]/.test(values.last_name) ||
    //   /[)(*&^%$#@!+=./؟?[<>!×÷{}""''|_-]/.test(values.last_name)
    // ) {
    //   errors.last_name = t("signup.last_name_invalid_chars");
    // }
    // // else if (/[^آ-ی\s]/.test(values.last_name)) {
    // //   errors.last_name = "نام خانوادگی فقط می تواند حاوی حروف فارسی باشد";
    // // }

    // if (!values.user_name) {
    //   errors.user_name = t("signup.user_name_required");
    // } else if (
    //   /[\s]/.test(values.user_name) ||
    //   /[)(*&^%$#@!+=-?~<]/.test(values.user_name)
    // ) {
    //   errors.user_name = t("signup.user_name_invalid_chars");
    // } else if (values.user_name.length < 5) {
    //   errors.user_name = t("signup.user_name_min_length");
    // }

    // if (!values.email) {
    //   errors.email = t("signup.email_required");
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    //   errors.email = t("signup.email_invalid");
    // }

    // if (!values.password) {
    //   errors.password = t("signup.password_required");
    // } else if (values.password.length < 8) {
    //   errors.password = t("signup.password_min_length");
    // } else if (/[\s]/.test(values.password)) {
    //   errors.password = t("signup.password_no_space");
    // } else if (/[^A-Za-z0-9+=_)(*&^%$#@!><?/"'-×]/g.test(values.password)) {
    //   errors.password = t("signup.password_invalid_chars");
    // }

    return errors;
  };

  const onSubmit = async (values) => {
    console.log(values);
    // setSubmitPending(true);
    // try {
    //   const res = await axios.post(
    //     `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_SIGNUP}`,
    //     values
    //   );

    //   // const firstName = res.data.user.first_name;
    //   // const lastName = res.data.user.last_name;
    //   // const fullName = firstName + lastName;
    //   // console.log(fullName)

    //   // const userId = res.data.user.id
    //   // console.log(userId)

    //   if (res.status === 200) {
    //     toast.success("Welcome");

    //     const token = res.data.access_token;

    //     let expirationDate = new Date();
    //     expirationDate.setDate(expirationDate.getDate() + 365);
    //     Cookies.set("token", token, {
    //       expires: expirationDate,
    //     });

    //     setTimeout(() => {
    //       navigate("/");
    //     }, 5000);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   const errors = error.response.data.message;

    //   for (const field in errors) {
    //     if (errors.hasOwnProperty(field)) {
    //       // console.log(field);
    //       errors[field].forEach((error) => {
    //         toast.error(error);
    //       });
    //     }
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
      <div className="w-1/2 h-auto flex flex-col items-center justify-center gap-7 rounded-xl bg-white shadow py-14 max-lg:w-8/12 max-md:w-10/12 max-sm:w-full">
        <h1 className="text-[1.5rem]">Signup</h1>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          <Form className="w-10/12 flex flex-col justify-center items-start gap-2">
            <CustomField
              id={"user_name"}
              name={"user_name"}
              placeholder={"UserName"}
            />
            <CustomField
              id={"email"}
              name={"email"}
              placeholder={"Email"}
            />
            <CustomField
              id={"password"}
              name={"password"}
              placeholder={"Password"}
            />

            <button
              type="button"
              className="flex flex-row justify-start items-center gap-1 font-normal text-[0.90rem] p-1"
              onClick={() => navigate("/login")}
            >
              <span>Already have an account? Login here</span>
            </button>

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

export default Signup;
