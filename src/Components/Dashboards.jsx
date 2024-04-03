

import React, { useEffect, useState } from "react";
import Logo from "./Icons/Logo";
import { logout } from "./User/Auth/authService";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import Loading from "./User/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setGeneratePage, setLoading } from "../features/UserReducer";
import { config } from "../config/config";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const { loading, generatePage } = useSelector((state) => state.users);
  const [url, setUrl] = useState({});
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      originalUrl: "",
    },
    validationSchema: Yup.object().shape({
      originalUrl: Yup.string().required("The url is required"),
    }),
    onSubmit: async (value) => {
      try {
        dispatch(setLoading(true))
        const request = await axios.post(`${config.userApi}/short-url`, value);
        console.log(request.data);
        setUrl(request.data.url);
        dispatch(setGeneratePage(true));

        formik.resetForm();
      } catch (error) {
        console.log(error)
      }finally{
        dispatch(setLoading(false));
      }
    },
  });
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleBack = () => {
    dispatch(setGeneratePage(false));
  };
  return (
    <article className="container">
      <hgroup className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <section className="card o-hidden border-0 shadow-lg my-5">
            <main className="card-body p-0">
              <section className="row justify-content-center">
                <section className="col-lg-12 d-flex  p-5">
                  <div className="flex-grow-1">
                    <hgroup className="d-flex justify-content-center user-heading">
                      <Logo
                        width={60}
                        height={60}
                        className="me-3 fill-orange"
                      />
                      <h1 className="text-center  h1">Jet.ly</h1>
                    </hgroup>

                    <header className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Welcome Come Back!
                      </h1>
                    </header>
                  </div>
                  <div className="">
                    <button
                      className="btn btn-primary btn-user btn-block "
                      type="submit"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </section>
                {generatePage ? (
                  <div className="col-lg-7 pb-5 px-5">
                    {url && (
                      <div className="p-3">
                        <span>Short Url</span> <br />
                        <a
                          href={`${config.userApi}/${url.shortUrl}`}
                          target="_blank"
                        >{`${config.userApi}/${url.shortUrl}`}</a>
                      </div>
                    )}
                    {url && (
                      <div className="p-3">
                        <span>Original Url</span> <br />
                        <a href={`${url.originalUrl}`} target="_blank">
                          {`${url.originalUrl}`}
                        </a>
                      </div>
                    )}
                    <div className="text-center">
                      <button className="btn btn-primary" onClick={handleBack}>
                        Back to generatePage
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={formik.handleSubmit}
                    className="col-lg-7  pb-5 px-5"
                  >
                    <fieldset className="form-group">
                      <label htmlFor="originalUrl" className="h5">
                        Enter your long url :
                      </label>
                      <input
                        type="text"
                        className={`form-control form-control-user ${
                          formik.touched.originalUrl &&
                          formik.errors.originalUrl
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.originalUrl}
                        name="originalUrl"
                        id="originalUrl"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.originalUrl &&
                        formik.errors.originalUrl && (
                          <span className="d-block ms-3 text-danger small invalid-feedback">
                            {formik.errors.originalUrl}
                          </span>
                        )}
                    </fieldset>
                    <div className="form-group text-center">
                      <button
                        type="submit"
                        className="btn btn-primary col-lg-5"
                      >
                        {loading ? <Loading /> : "Generate"}
                      </button>
                    </div>
                  </form>
                )}
              </section>
            </main>
          </section>
        </div>
      </hgroup>
    </article>
  );
};

export default Dashboard;