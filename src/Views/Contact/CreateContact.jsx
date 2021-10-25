import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { createContact } from '../../context/actions/contactAction/contactAction';
import { setAlert } from '../../context/actions/errorActions';

const CreateContact = () => {
  const contactData = useSelector((state) => state.contact.contact);
  const history = useHistory();
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.type) {
      errors.type = '*Required';
    }

    if (!values.name) {
      errors.name = '*Required';
    }
    if (!values.company) {
      errors.company = '*Required';
    }

    if (!values.phone) {
      errors.phone = '*Required';
    } else if (values.phone.toString().length !== 10) {
      errors.phone = 'Length should be 10';
    } else if (values.phone.toString().length === 10) {
      let flag = false;
      contactData.forEach((element) => {
        if (element.phone === values.phone) {
          flag = true;
          setId(element._id);
        }
      });
      if (flag) {
        errors.phone = 'Contact already exists';
      }
    }
    if (!values.email) {
      errors.email = '*Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (values.whatsapp_no.toString().length === 0) {
      errors.whatsapp_no = '';
    } else if (values.whatsapp_no.toString().length !== 10) {
      errors.whatsapp_no = 'Length should be 10';
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

  const { getFieldProps, errors, resetForm, values } = useFormik({
    initialValues: {
      type: '',
      company: '',
      name: '',
      phone: '',
      email: '',
      department: '',
      title: '',
      whatsapp_no: '',
      description: '',
      street: '',
      city: '',
      state: '',
      country: '',
      zipcode: '',
      website: '',
    },
    validate,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      if (values.type === 'Person') {
        delete values.company;
      }
      dispatch(createContact(values, resetForm, history));
    } else {
      dispatch(setAlert({ message: 'Fill fields properly', error: true }));
    }
  };

  return (
    <div className="mt-10 mx-4 flex flex-col items-center">
      <div className="bg-white flex justify-between items-center p-4 mb-4 w-full">
        <h2 className="text-xl font-bold m-0">Create Contact</h2>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="bg-white px-4 pt-4 pb-2 flex-1 flex flex-col">
          <div className="px-2 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">Type</lable>
            <select
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              name=""
              id=""
              {...getFieldProps('type')}
            >
              <option value="" selected style={{ color: 'lightgray' }}>
                Select type
              </option>
              <option value="0">Existing Organization</option>
              <option value="1">New Organization</option>
              <option value="2">Individual</option>
            </select>
            {errors.type ? (
              <div className="w-full text-sm text-red-400">{errors.type}</div>
            ) : null}
          </div>
          {values.type === 'Organization' ? (
            <div className="px-2 mt-3 flex flex-col w-full">
              <lable className="text-gray-2 text-md font-semibold ">
                Company name
              </lable>
              <input
                className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                type="text"
                placeholder="Enter name of company"
                {...getFieldProps('company')}
              />
              {errors.company ? (
                <div className="w-full text-sm text-red-400">
                  {errors.company}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">Name</lable>
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
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Phone number
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="number"
              placeholder="Enter phone number"
              {...getFieldProps('phone')}
            />
            {errors.phone ? (
              <div className="w-full text-sm text-red-400">{errors.phone}</div>
            ) : null}
            {errors.phone === 'Contact already exists' ? (
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    history.push(`/contactdetail/${id}`);
                  }}
                  className="w-max"
                  style={{
                    backgroundColor: '#54a3ff',
                    color: 'white',
                    textTransform: 'capitalize',
                    marginTop: '10px',
                  }}
                >
                  Go to contact
                </Button>
              </div>
            ) : null}
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">Email</lable>
            <input
              className={`p-2  border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter email"
              {...getFieldProps('email')}
            />
            {errors.email ? (
              <div className="w-full text-sm text-red-400">{errors.email}</div>
            ) : null}
          </div>
        </div>
        <div className="bg-white p-4 flex-1 flex flex-col">
          {values.type === 'Organization' ? (
            <div className="px-2 mb-3 flex flex-col w-full">
              <lable className="text-gray-2 text-md font-semibold ">
                Department
              </lable>
              <input
                className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                type="text"
                placeholder="Enter department"
                {...getFieldProps('department')}
              />
            </div>
          ) : null}

          <div className="px-2 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">Title</lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter title"
              {...getFieldProps('title')}
            />
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Whatsapp number
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="number"
              placeholder="Enter whatsapp number"
              {...getFieldProps('whatsapp_no')}
            />
            {errors.whatsapp_no ? (
              <div className="w-full text-sm text-red-400">
                {errors.whatsapp_no}
              </div>
            ) : null}
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Website
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter whatsapp number"
              {...getFieldProps('website')}
            />
          </div>
          <div className="p-2 w-full mt-3 mb-3 flex flex-col">
            <lable className="text-gray-2 text-md font-semibold ">
              Description
            </lable>
            <textarea
              className={` p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter description"
              {...getFieldProps('description')}
            />
          </div>
        </div>
        <div className="bg-white px-4 pt-4 pb-2 w-full flex flex-col mt-4">
          <h3 className="text-lg font-semibold pl-2">Address</h3>
          <div className="flex flex-wrap w-full">
            <div className="flex-col mt-3 flex flex-1 p-2">
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
            <div className="flex-col mt-3 flex flex-1 p-2">
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
            <div className="flex-col mt-3 flex flex-1 p-2">
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
        className="bg-green-600 mt-3 hover:bg-green-700 px-5 py-2 text-lg rounded-md m-4 text-white"
      >
        Save Contact
      </button>
    </div>
  );
};

export default CreateContact;
