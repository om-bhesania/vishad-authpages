import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "../Input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [viewPassword, setViewPassword] = useState(false);
  const nav = useNavigate();
  const handlePasswordView = () => {
    setViewPassword(!viewPassword);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const initialValues = {
    email: "",
    name: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    axios
      .post("http://localhost:5000/api/register", values)
      .then((response) => {
        console.log("Registration successful", response.data);
        const notify = () => toast("Logged In Successfully");
        nav("/login");
      })
      .catch((error) => {
        console.error("Registration error", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <section className="py-20 pt-0">
      <div className="container">
        <h1 className="text-4xl font-semibold mb-4 border-b-2 pb-4">
          Register Page
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 flex flex-col space-y-4">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="flex items-center pr-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-0 focus-within:border-0 sm:max-w-md">
                        <Field
                          type="text"
                          name="email"
                          id="email"
                          autoComplete="email"
                          as={Input}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Email"
                        />
                      </div>

                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="flex items-center pr-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-0 focus-within:border-0 sm:max-w-md">
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="name"
                          as={Input}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Name"
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center pr-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-0 focus-within:border-0 sm:max-w-md">
                          <Field
                            type={viewPassword ? "password" : "text"}
                            name="password"
                            id="password"
                            autoComplete="new-password"
                            as={Input}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Password"
                          />
                          <div className="" onClick={handlePasswordView}>
                            {viewPassword ? (
                              <EyeOff className="text-gray-900" />
                            ) : (
                              <Eye className="text-gray-900" />
                            )}
                          </div>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>

              <ToastContainer />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
