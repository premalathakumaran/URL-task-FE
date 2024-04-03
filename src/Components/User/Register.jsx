

import { registerValidationSchema } from "./schema/validationSchema";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Icons/Logo";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setShowPassword } from "../../features/UserReducer";
import Loading from "./Loading";

const Register = () => {
  const {showPassword,loading}= useSelector(state=>state.users);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async(values) => {
      try {
        dispatch(setLoading(true))
        const response = await axios.post(`${config.userApi}/register`,values)
        if(response.status===201){
          toast.success(response.data.message + "please kindly check your mail..", {
            position: 'top-center',
          });
        }
        navigate('/')
        formik.resetForm()
      } catch (error) {
        console.error('Error during registration:',response.data.message);
        toast.error('Error during registration. Please try again.', {
          position: 'top-center',
        });
      }finally{
        dispatch(setLoading(false))
      }
    },
  });

  return (
  
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          {/* Nested Row within Card Body */}
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image" />
            <div className="col-lg-7">
              <div className="p-5">
                <div className="d-flex justify-content-center user-heading">
                  <Logo width={60} height={60} className="me-3 fill-orange" />
                  <h1 className="text-center  h1">ADUDU</h1>
                </div>
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                <form className="user" onSubmit={formik.handleSubmit}>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="text"
                        className= {`form-control form-control-user ${ formik.touched.firstName && 
                          formik.errors.firstName ? "is-invalid" : ''}`}
                        id="firstName"
                        placeholder="First Name"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {
                        formik.touched.firstName && formik.errors.firstName && (
                          <span className="d-block ms-3 text-danger small invalid-feedback">
                        {formik.errors.firstName}
                      </span>
                        )
                      }
                    </div>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="text"
                        className= {`form-control form-control-user ${ formik.touched.lastName && 
                          formik.errors.lastName ? "is-invalid" : ''}`}
                        id="lastName"
                        placeholder="Last Name"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {
                        formik.touched.lastName && formik.errors.lastName && (
                          <span className="d-block ms-3 text-danger small invalid-feedback">
                        {formik.errors.lastName}
                      </span>
                        )
                      }
                    </div>
                  </div>
                  <div className="form-group">
                  <input
                        type="text"
                        className= {`form-control form-control-user ${ formik.touched.email && 
                          formik.errors.email ? "is-invalid" : ''}`}
                        id="email"
                        placeholder="E-mail"
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
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type={showPassword?'text':'password'}
                        className= {`form-control form-control-user ${ formik.touched.password && 
                          formik.errors.password ? "is-invalid" : ''}`}
                        id="password"
                        placeholder="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {
                        formik.touched.password && formik.errors.password && (
                          <span className="d-block ms-3 text-danger small invalid-feedback">
                        {formik.errors.password}
                      </span>
                        )
                      }
                    </div>
                    <div className="col-sm-6">
                    <input
                        type={showPassword?'text':'password'}
                        className= {`form-control form-control-user ${ formik.touched.cpassword && 
                          formik.errors.cpassword ? "is-invalid" : ''}`}
                        id="cpassword"
                        placeholder="password"
                        name="cpassword"
                        value={formik.values.cpassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {
                        formik.touched.cpassword && formik.errors.cpassword && (
                          <span className="d-block ms-3 text-danger small invalid-feedback">
                        {formik.errors.cpassword}
                      </span>
                        )
                      }
                    </div>
                    
                      <section className="custom-control custom-checkbox small text-center mt-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="showPassword"
                          name="showPassword"
                          onChange={()=>dispatch(setShowPassword(!showPassword))}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="showPassword"
                        >
                          show password
                        </label>
                      </section>
                    
                  </div>
                  <button
                    className="btn btn-primary btn-user btn-block"
                    type="submit"
                  >
                   {
                    loading ? <Loading /> : ' Register Account'
                   }
                  </button>
                  
                </form>
                <hr />
                <div className="text-center">
                  <Link className="small" to={"/forgot-password"}>
                    Forgot Password?
                  </Link>
                </div>
                <div className="text-center">
                  <Link className="small" to={"/"}>
                    Already have an account? Login!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default Register;