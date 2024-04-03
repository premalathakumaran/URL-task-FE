

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Icons/Logo";
import { useFormik } from "formik";
import { loginValidationSchema } from "./schema/validationSchema";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import "./style/user.css";
import { isAuthenticated, login } from "./Auth/authService";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setShowPassword } from "../../features/UserReducer";
import Loading from "./Loading";
import { toast } from "react-toastify";


const Login = () => {
  const { showPassword,loading } = useSelector(state=>state.users);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (value) => {
      try {
        dispatch(setLoading(true));
        await login(value);
        navigate("/dashboard");
        toast.success('You are login in successfully')
      } catch (error) {
        console.error(error);
        formik.setErrors({ general: error });
      }finally{
        dispatch(setLoading(false));
      }
    },
  });
  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <article className="container kvnkjabvav">
      <hgroup className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <section className="card o-hidden border-0 shadow-lg my-5">
            <main className="card-body p-0">
              <section className="row">
                <figure className="col-lg-6 m-0 d-none d-lg-block bg-login-image"></figure>
                <section className="col-lg-6 p-5">
                  <hgroup className="d-flex justify-content-center user-heading">
                    <Logo width={60} height={60} className="me-3 fill-orange" />
                    <h1 className="text-center  h1">ADUDU</h1>
                  </hgroup>

                  <header className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">
                      Welcome Come Back!
                    </h1>
                  </header>
                  <form className="user" onSubmit={formik.handleSubmit}>
                    {formik.errors.general && (
                      <section className="alert alert-danger" role="alert">
                        {formik.errors.general.message}
                      </section>
                    )}
                    <section className="form-group">
                      <input
                        className={`form-control form-control-user ${
                          formik.touched.email && formik.errors.email
                            ? "is-invalid"
                            : ""
                        }`}
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <span className="d-block ms-3 text-danger small invalid-feedback">
                          {formik.errors.email}
                        </span>
                      )}
                    </section>
                    <section className="form-group">
                      <div>
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`form-control form-control-user ${
                            formik.touched.password && formik.errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                          id="password"
                          placeholder="Password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <div>
                          <div className="showPass">
                          {
                            showPassword ? <EyeSlashFill
                              className="showPassIcon"
                              onClick={() => dispatch(setShowPassword(!showPassword))}
                            /> :
                              <EyeFill
                                className="showPassIcon"
                                onClick={() => dispatch(setShowPassword(!showPassword))}
                              />
                          }
                        </div>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                          <span className="d-block ms-3 text-danger small invalid-feedback">
                            {formik.errors.password}
                          </span>
                        )}
                      </div>
                    </section>
                    <section className="form-group">
                      <section className="custom-control custom-checkbox small">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck"
                        >
                          Remember Me
                        </label>
                      </section>
                    </section>
                    <button
                      className="btn btn-primary btn-user btn-block"
                      type="submit"
                    >
                      {loading? <Loading /> : 'login'}
                    </button>
                  </form>
                  <hr />
                  <div className="text-center">
                    <Link className="small" to={"/forgot-password"}>
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link className="small" to={"/register"}>
                      Create an Account!
                    </Link>
                  </div>
                </section>
              </section>
            </main>
          </section>
        </div>
      </hgroup>
    </article>
  );
};

export default Login;