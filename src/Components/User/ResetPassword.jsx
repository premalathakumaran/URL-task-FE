

import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../Icons/Logo";
import { useFormik } from "formik";
import * as Yup from "yup";  // Import Yup for validation
import axios from "axios";
import { config } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setShowPassword } from "../../features/UserReducer";
import { toast } from "react-toastify";
import Loading from "./Loading";

const ResetPassword = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { showPassword, loading } = useSelector(state => state.users)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().required("Required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                dispatch(setLoading(true))
                const response = await axios.post(
                    `${config.userApi}/reset-password/${params.token}`,
                    values
                );
                navigate('/')
                toast.success('your passsword was successfully changed')
                formik.resetForm();
            } catch (error) {
                console.error("Error during password reset:", error);
                formik.setErrors({ general: error });
            } finally {
                dispatch(setLoading(false))
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
                                        <h1 className="h4 text-gray-900 mb-2">Reset Your Password</h1>
                                    </header>
                                    <form className="user" onSubmit={formik.handleSubmit}>
                                        {formik.errors.general && (
                                            <section className="alert alert-danger" role="alert">
                                                {formik.errors.general.message}
                                            </section>
                                        )}
                                        <fieldset className="form-group">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className={`form-control form-control-user ${formik.touched.password &&
                                                    formik.errors.password ? "is-invalid" : ""
                                                    }`}
                                                id="exampleInputpassword"
                                                aria-describedby="passwordHelp"
                                                placeholder="Enter password"
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
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className={`form-control form-control-user ${formik.touched.confirmPassword &&
                                                    formik.errors.confirmPassword ? "is-invalid" : ""
                                                    }`}
                                                id="confirmPassword"
                                                aria-describedby="passwordHelp"
                                                placeholder="Confirm Password"
                                                name="confirmPassword"
                                                value={formik.values.confirmPassword}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {
                                                formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                                    <span className="d-block ms-3 text-danger small invalid-feedback">
                                                        {formik.errors.confirmPassword}
                                                    </span>
                                                )
                                            }
                                        </fieldset>
                                        <section className="custom-control custom-checkbox small my-3">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="showPassword"
                                                name="showPassword"
                                                onChange={() => dispatch(setShowPassword(!showPassword))}
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor="showPassword"
                                            >
                                                show password
                                            </label>
                                        </section>
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-user btn-block"
                                        >
                                            {
                                                loading ? <Loading /> : "Reset Your Password"
                                            }
                                        </button>
                                    </form>
                                </section>
                            </div>
                        </section>
                    </div>
                </section>
            </hgroup>
        </main>
    );
};

export default ResetPassword;