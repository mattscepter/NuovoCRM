import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
import { setAlert } from '../../context/actions/errorActions';

const CreateOrg = ({ setCreateContact, setCreateOrg }) => {
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.type) {
      errors.type = '*Required';
    }
    if (!values.name) {
      errors.name = '*Required';
    }
    if (!values.street) {
      errors.street = '*Required';
    }
    if (!values.country) {
      errors.country = '*Required';
    }
    if (!values.state) {
      errors.state = '*Required';
    }
    if (!values.city) {
      errors.city = '*Required';
    }
    if (!values.zipcode) {
      errors.zipcode = '*Required';
    }

    return errors;
  };

  const { getFieldProps, errors, values, resetForm } = useFormik({
    initialValues: {
      type: '',
      name: '',
      street: '',
      city: '',
      state: '',
      country: '',
      zipcode: '',
    },
    validate,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('JWT');
    const user = JSON.parse(localStorage.getItem('user'));
    axiosInstance
      .post(
        `/create-organization/${user._id}`,
        {
          name: values.name,
          type: values.type,
          address: `${values.street}, ${values.city}, ${values.state}, ${values.country}, ${values.zipcode}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        resetForm();
        dispatch(
          setAlert({
            message: 'Organization Created Successfully',
            error: false,
          }),
        );
        setCreateContact(true);
        setCreateOrg(false);
      })
      .catch((err) => {
        dispatch(
          setAlert({ message: 'Error creating organization', error: true }),
        );
      });
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-wrap w-full">
        <div className="bg-white px-4 pt-4 pb-2 flex-1 flex flex-col">
          <div className="px-2 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Organization Name
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter name"
              {...getFieldProps('name')}
            />
            {errors.name ? (
              <div className="w-full text-sm text-red-400">{errors.name}</div>
            ) : null}
          </div>
        </div>
        <div className="bg-white p-4 flex-1 flex flex-col">
          <div className="px-2 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Organization Type
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter department"
              {...getFieldProps('type')}
            />
            {errors.type ? (
              <div className="w-full text-sm text-red-400">{errors.type}</div>
            ) : null}
          </div>
        </div>
        <div className="bg-white px-4 pb-2 w-full flex flex-col mt-2">
          <h3 className="text-lg font-semibold pl-2">Address</h3>
          <div className="flex flex-wrap w-full">
            <div className="flex-col flex flex-1 p-2">
              <lable className="text-gray-2 text-md font-semibold ">
                Street
              </lable>
              <input
                className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                type="text"
                placeholder="Enter street"
                {...getFieldProps('street')}
              />
              {errors.street ? (
                <div className="w-full text-sm text-red-400">
                  {errors.street}
                </div>
              ) : null}
            </div>
            <div className="flex-col flex flex-1 p-2">
              <lable className="text-gray-2 text-md font-semibold ">
                Country
              </lable>
              <input
                className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                type="text"
                placeholder="Enter country"
                {...getFieldProps('country')}
              />
              {errors.country ? (
                <div className="w-full text-sm text-red-400">
                  {errors.country}
                </div>
              ) : null}
            </div>
            <div className="flex-col flex flex-1 p-2">
              <lable className="text-gray-2 text-md font-semibold ">
                State
              </lable>
              <input
                className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                type="text"
                placeholder="Enter state"
                {...getFieldProps('state')}
              />
              {errors.state ? (
                <div className="w-full text-sm text-red-400">
                  {errors.state}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap w-full">
            <div className="flex-col flex flex-1 p-2">
              <lable className="text-gray-2 text-md font-semibold ">City</lable>
              <input
                className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                type="text"
                placeholder="Enter city"
                {...getFieldProps('city')}
              />
              {errors.city ? (
                <div className="w-full text-sm text-red-400">{errors.city}</div>
              ) : null}
            </div>
            <div className="flex-col flex flex-1 p-2">
              <lable className="text-gray-2 text-md font-semibold ">
                ZIP code
              </lable>
              <input
                className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                type="number"
                placeholder="Enter zip code"
                {...getFieldProps('zipcode')}
              />
              {errors.zipcode ? (
                <div className="w-full text-sm text-red-400">
                  {errors.zipcode}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={(e) => handleSubmit(e)}
        className="bg-green-600 w-max hover:bg-green-700 px-5 py-2 text-lg rounded-md m-4 mb-0 text-white"
      >
        Save Organization
      </button>
    </div>
  );
};

export default CreateOrg;
