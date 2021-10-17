import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setUser } from '../../context/actions/authActions/authActions';
import { setAlert } from '../../context/actions/errorActions';
import axiosInstance from '../../utils/axiosInstance';

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = '*Required';
    }

    if (!values.firstname) {
      errors.firstname = '*Required';
    }
    if (!values.lastname) {
      errors.lastname = '*Required';
    }
    if (!values.phoneno) {
      errors.phoneno = '*Required';
    } else if (values.phoneno.toString().length !== 10) {
      errors.phoneno = 'Length should be 10';
    }
    if (!values.company) {
      errors.company = '*Required';
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
      firstname: '',
      lastname: '',
      phoneno: '',
      company: '',
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      axiosInstance
        .post('/register', values)
        .then((res) => {
          history.push('/login');
          resetForm();
          dispatch(
            setAlert({ message: 'Registered successfully', error: false }),
          );
        })
        .catch((err) => {
          resetForm();
          dispatch(setAlert({ message: 'Error registering', error: true }));
        });
    },
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white mx-4 w-full sm:w-1/2 lg:w-1/4 p-6 flex flex-col justify-center items-center"
      >
        <h2 className="text-4xl pb-4">Register</h2>
        <div className="px-2 flex flex-col w-full">
          <lable className="text-gray-2 text-md font-semibold ">
            Firstname
          </lable>
          <input
            className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
            type="text"
            placeholder="Enter firstname"
            {...getFieldProps('firstname')}
          />
          {errors.firstname ? (
            <div className="w-full text-sm text-red-400">
              {errors.firstname}
            </div>
          ) : null}
        </div>
        <div className="px-2 mt-3 flex flex-col w-full">
          <lable className="text-gray-2 text-md font-semibold ">Lastname</lable>
          <input
            className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
            type="text"
            placeholder="Enter lastname"
            {...getFieldProps('lastname')}
          />
          {errors.lastname ? (
            <div className="w-full text-sm text-red-400">{errors.lastname}</div>
          ) : null}
        </div>
        <div className="px-2 mt-3 flex flex-col w-full">
          <lable className="text-gray-2 text-md font-semibold ">Email</lable>
          <input
            className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
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
            Phone Number
          </lable>
          <input
            className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
            type="number"
            placeholder="Enter phone number"
            {...getFieldProps('phoneno')}
          />
          {errors.phoneno ? (
            <div className="w-full text-sm text-red-400">{errors.phoneno}</div>
          ) : null}
        </div>
        <div className="px-2 mt-3 flex flex-col w-full">
          <lable className="text-gray-2 text-md font-semibold ">
            Company Name
          </lable>
          <input
            className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
            type="text"
            placeholder="Enter company name"
            {...getFieldProps('company')}
          />
          {errors.company ? (
            <div className="w-full text-sm text-red-400">{errors.company}</div>
          ) : null}
        </div>

        <div className="px-2 flex mt-3 flex-col w-full">
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
          className="bg-green-600 mt-3 hover:bg-green-700 px-5 py-2 text-lg rounded-md my-2 mr-4 text-white"
        >
          Register
        </button>
        <button
          onClick={() => {
            history.push('/login');
          }}
          className="bg-green-600 hover:bg-green-700 px-5 py-2 text-lg rounded-md my-2 mr-4 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
