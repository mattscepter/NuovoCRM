import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
  setAuth,
  setUser,
} from '../../context/actions/authActions/authActions';
import axiosInstance from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
import { setAlert } from '../../context/actions/errorActions';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = '*Required';
    }

    if (!values.email) {
      errors.email = '*Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  const { getFieldProps, handleSubmit, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      axiosInstance
        .post('/login', values)
        .then((res) => {
          dispatch(setUser(res.data.admin));
          Cookies.set('JWT', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.admin));
          dispatch(setAuth(true));
          history.push('/');
          resetForm();
          dispatch(
            setAlert({ message: 'Logged in successfully', error: false }),
          );
        })
        .catch((err) => {
          resetForm();
          dispatch(setAlert({ message: 'Error logging in', error: true }));
          dispatch(setAuth(false));
        });
    },
  });

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white mx-4 w-full sm:w-1/2 lg:w-1/4 p-6 flex flex-col justify-center items-center rounded-xl shadow-lg"
      >
        <h2 className="text-4xl pb-4">Login</h2>
        <div className="px-2 flex flex-col w-full">
          <lable className="text-gray-2 text-md font-semibold ">
            Enter email
          </lable>
          <input
            className={`p-2  border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
            type="email"
            placeholder="Enter email"
            {...getFieldProps('email')}
          />
          {errors.email ? (
            <div className="w-full text-sm text-red-400">{errors.email}</div>
          ) : null}
        </div>

        <div className="px-2 mt-3 flex flex-col w-full">
          <lable className="text-gray-2 text-md font-semibold ">
            Enter password
          </lable>
          <input
            className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
            type="password"
            placeholder="Enter password"
            {...getFieldProps('password')}
          />
          {errors.password ? (
            <div className="w-full text-sm text-red-400">{errors.password}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="bg-green-600 mt-6 hover:bg-green-700 px-5 py-2 text-lg rounded-md my-2 mr-4 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
