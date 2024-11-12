// import { Formik, Form } from "formik";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CustomField from "../../components/module/CustomField";
// import { FadeLoader } from "react-spinners";
// // import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useMutation } from "react-query";
// import { postRequest } from "../../services/apiService";
// // import Cookies from "js-cookie";
// import { Button } from "antd";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [submitPending, setSubmitPending] = useState(false);

//   // useEffect(() => {
//   //   const token = Cookies.get("token");
//   //   if (token) {
//   //     navigate("/");
//   //   }
//   // }, []);

//   const mutation = useMutation((data) => postRequest("/register", data), {
//     onSuccess: (data) => {
//       console.log(data);
//       // setTimeout(() => {
//       //   navigate("/");
//       // }, 5000);
//     },
//     onError: (error) => {
//       console.error(error);
//     },
//     onSettled: () => {
//       setSubmitPending(false);
//     },
//   });

//   const initialValues = {
//     name: "",
//     email: "",
//     password: "",
//     password_confirmation: "",
//   };

//   const validate = (values) => {
//     const errors = {};

//     if (!values.name) {
//       errors.name = "User name is required";
//     } else if (/[آ-ی]/.test(values.name)) {
//       errors.name = "User name cannot contain Persian letters";
//     } else if (
//       /[\s]/.test(values.name) ||
//       /[)(*&^%$#@!+=-?~<]/.test(values.name)
//     ) {
//       errors.name = "User name contains invalid characters";
//     } else if (values.name.length < 5) {
//       errors.name = "User name must be at least 5 characters long";
//     }

//     if (!values.email) {
//       errors.email = "Email is required";
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//       errors.email = "Invalid email format";
//     }

//     if (!values.password) {
//       errors.password = "Password is required";
//     } else if (values.password.length < 8) {
//       errors.password = "Password must be at least 8 characters long";
//     } else if (/[\s]/.test(values.password)) {
//       errors.password = "Password cannot contain spaces";
//     } else if (/[^A-Za-z0-9+=_)(*&^%$#@!><?/"'-×]/g.test(values.password)) {
//       errors.password = "Password contains invalid characters";
//     }

//     if (!values.password_confirmation) {
//       errors.password_confirmation = "Please confirm your password";
//     } else if (values.password !== values.password_confirmation) {
//       errors.password_confirmation = "Passwords do not match";
//     }

//     return errors;
//   };

//   const onSubmit = async (values) => {
//     setSubmitPending(true);
//     mutation.mutate(values);
//     // try {
//     //   const res = await axios.post(
//     //     `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_SIGNUP}`,
//     //     values
//     //   );

//     //   // const firstName = res.data.user.first_name;
//     //   // const lastName = res.data.user.last_name;
//     //   // const fullName = firstName + lastName;
//     //   // console.log(fullName)

//     //   // const userId = res.data.user.id
//     //   // console.log(userId)

//     //   if (res.status === 200) {
//     //     toast.success("Welcome");

//     //     const token = res.data.access_token;

//     //     let expirationDate = new Date();
//     //     expirationDate.setDate(expirationDate.getDate() + 365);
//     //     Cookies.set("token", token, {
//     //       expires: expirationDate,
//     //     });

//     //     setTimeout(() => {
//     //       navigate("/");
//     //     }, 5000);
//     //   }
//     // } catch (error) {
//     //   console.log(error);
//     //   const errors = error.response.data.message;

//     //   for (const field in errors) {
//     //     if (errors.hasOwnProperty(field)) {
//     //       // console.log(field);
//     //       errors[field].forEach((error) => {
//     //         toast.error(error);
//     //       });
//     //     }
//     //   }
//     // } finally {
//     //   setSubmitPending(false);
//     // }
//   };

//   return (
//     <div
//       style={{ direction: "ltr" }}
//       className="w-full h-screen flex flex-col items-center justify-center bg-[#F3F4F6] font-Poppins max-sm:px-5"
//     >
//       <div className="w-1/2 h-auto flex flex-col items-center justify-center gap-7 rounded-xl py-14 max-lg:w-8/12 max-md:w-10/12 max-sm:w-full">
//         <h1 className="text-[1.5rem] font-semibold uppercase">Signup</h1>
//         <Formik
//           initialValues={initialValues}
//           validate={validate}
//           onSubmit={onSubmit}
//         >
//           <Form className="w-10/12 flex flex-col justify-center items-start gap-2">
//             <CustomField id={"name"} name={"name"} placeholder={"User Name"} />
//             <CustomField id={"email"} name={"email"} placeholder={"Email"} />
//             <CustomField
//               id={"password"}
//               name={"password"}
//               placeholder={"Password"}
//             />
//             <CustomField
//               id={"Password confirm"}
//               name={"password_confirmation"}
//               placeholder={"Password Confirm"}
//             />

//             <button
//               type="button"
//               className="flex flex-row justify-start items-center gap-1 font-normal text-[0.90rem] p-1"
//               onClick={() => navigate("/login")}
//             >
//               <span>Already have an account ? Login here</span>
//             </button>

//             <div className="w-full h-auto flex flex-row justify-center items-center pt-5">
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={submitPending}
//                 className="w-1/2 h-auto flex flex-row justify-center items-center p-2 font-Poppins uppercase"
//               >
//                 Submit
//               </Button>
//             </div>
//           </Form>
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import { Formik, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // اضافه کردن axios
import CustomField from "../../components/module/CustomField";
import { Button } from "antd";

const Signup = () => {
  const navigate = useNavigate();
  const [submitPending, setSubmitPending] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "User name is required";
    } else if (/[آ-ی]/.test(values.name)) {
      errors.name = "User name cannot contain Persian letters";
    } else if (
      /[\s]/.test(values.name) ||
      /[)(*&^%$#@!+=-?~<]/.test(values.name)
    ) {
      errors.name = "User name contains invalid characters";
    } else if (values.name.length < 5) {
      errors.name = "User name must be at least 5 characters long";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (/[\s]/.test(values.password)) {
      errors.password = "Password cannot contain spaces";
    } else if (/[^A-Za-z0-9+=_)(*&^%$#@!><?/"'-×]/g.test(values.password)) {
      errors.password = "Password contains invalid characters";
    }

    if (!values.password_confirmation) {
      errors.password_confirmation = "Please confirm your password";
    } else if (values.password !== values.password_confirmation) {
      errors.password_confirmation = "Passwords do not match";
    }

    return errors;
  };

  // const onSubmit = async (values) => {
  //   setSubmitPending(true);
  //   try {
  //     const res = await axios.post("https://api.bms.behinstart.ir/api/register", values);
  //     if (res.status === 200) {
  //       console.log("Signup successful!");
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Signup error:", error.response?.data || error.message);
  //   } finally {
  //     setSubmitPending(false);
  //   }
  // };


  const onSubmit = async (values) => {
    setSubmitPending(true);
    try {
      const response = await fetch("https://api.bms.behinstart.ir/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error("Failed to sign up");
      }
  
      const data = await response.json();
      console.log("Signup successful:", data);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.message);
    } finally {
      setSubmitPending(false);
    }
  };
  
  return (
    <div
      style={{ direction: "ltr" }}
      className="w-full h-screen flex flex-col items-center justify-center bg-[#F3F4F6] font-Poppins max-sm:px-5"
    >
      <div className="w-1/2 h-auto flex flex-col items-center justify-center gap-7 rounded-xl py-14 max-lg:w-8/12 max-md:w-10/12 max-sm:w-full">
        <h1 className="text-[1.5rem] font-semibold uppercase">Signup</h1>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          <Form className="w-10/12 flex flex-col justify-center items-start gap-2">
            <CustomField id={"name"} name={"name"} placeholder={"User Name"} />
            <CustomField id={"email"} name={"email"} placeholder={"Email"} />
            <CustomField
              id={"password"}
              name={"password"}
              placeholder={"Password"}
            />
            <CustomField
              id={"Password confirm"}
              name={"password_confirmation"}
              placeholder={"Password Confirm"}
            />

            <button
              type="button"
              className="flex flex-row justify-start items-center gap-1 font-normal text-[0.90rem] p-1"
              onClick={() => navigate("/login")}
            >
              <span>Already have an account? Login here</span>
            </button>

            <div className="w-full h-auto flex flex-row justify-center items-center pt-5">
              <Button
                type="primary"
                htmlType="submit"
                loading={submitPending}
                className="w-1/2 h-auto flex flex-row justify-center items-center p-2 font-Poppins uppercase"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
