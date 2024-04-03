

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Icons/Logo";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";  
import { config } from "../../config/config";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../features/UserReducer";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate()
  const {loading} = useSelector(state=>state.users)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true))
        const response = await axios.post(
          `${config.userApi}/forget-password`,
          values
        );
        if (response.status === 200) {
          
          toast.success(response.data.message +"Kindly check you mail")
          navigate('/')
          formik.resetForm();
        }
       
      } catch (error) {
        const message = error.response.data.message
        console.error("Error during registration:",message);
        formik.setErrors({ general: message });
      }finally{
        dispatch(setLoading(false));
      }
    },
  });
  return (
    <main className="container">
      {/* Outer Row */}
      <hgroup className="row justify-content-center">
        <section className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <section className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <figure className="col-lg-6 d-none d-lg-block bg-password-image m-0"></figure>
                <section className="col-lg-6 p-5">
                  <hgroup className="d-flex justify-content-center user-heading">
                    <Logo width={60} height={60} className="me-3 fill-orange" />
                    <h1 className="text-center h1">ADUDU</h1>
                  </hgroup>
                  <header className="text-center">
                    <h1 className="h4 text-gray-900 mb-2">
                      Forgot Your Password?
                    </h1>
                    <p className="mb-4">
                      We get it, stuff happens. Just enter your email address
                      below and we'll send you a link to reset your password!
                    </p>
                  </header>
                  <form className="user" onSubmit={formik.handleSubmit}>
                  {formik.errors.general && (
                      <section className="alert alert-danger" role="alert">
                        {formik.errors.general}
                      </section>
                    )}
                    <fieldset className="form-group">
                      <input
                        type="text"
                        className={`form-control form-control-user ${formik.touched.email &&
                            formik.errors.email ? "is-invalid" : ""
                          }`}
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {
                        formik.touched.email && formik.errors.email && (
                          <span className="d-block ms-3 text-danger small invalid-feedback">
                        {formik.errors.email}
                      </span>
                        )
                      }
                    </fieldset>
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block"
                    >
                      {
                        loading ? <Loading /> : 'Reset Password'
                      }
                    </button>
                  </form>
                  <hr />
                  <div className="text-center">
                    <Link className="small" to={"/register"}>
                      Create an Account!
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link className="small" to={"/"}>
                      Already have an account? Login!
                    </Link>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </section>
      </hgroup>
    </main>
  );
};

export default ForgotPassword;