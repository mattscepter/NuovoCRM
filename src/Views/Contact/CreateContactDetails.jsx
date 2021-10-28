import { useFormik } from 'formik';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Select from 'react-select';
import {
  createContact,
  createcontactCard,
} from '../../context/actions/contactAction/contactAction';
import axiosInstance from '../../utils/axiosInstance';
import { Button } from '@material-ui/core';
import { setAlert } from '../../context/actions/errorActions';

const CreateContactDetails = ({ type, setType }) => {
  const contactData = useSelector((state) => state.contact.contact);
  const [id, setId] = useState(null);
  const [orgList, setOrgList] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  let options = [];

  useEffect(() => {
    axiosInstance.get('/organizations').then((res) => {
      setOrgList(res.data);
    });
  }, []);

  orgList.forEach((element) => {
    options.push({ value: element?._id, label: element?.name });
  });

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = '*Required';
    }
    if (type === '2') {
      delete errors.organization;
    } else if (!values.organization) {
      errors.organization = '*Required';
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
      delete errors.whatsapp_no;
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

  const { getFieldProps, errors, resetForm, values, setFieldValue } = useFormik(
    {
      initialValues: {
        organization: '',
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
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && values.name !== '') {
      if (type === '2') {
        dispatch(
          createContact(
            {
              name: values.name,
              phone: values.phone,
              email: values.email,
              whatsapp_no: values.whatsapp_no,
              description: values.description,
              street: values.street,
              city: values.city,
              state: values.state,
              country: values.country,
              zipcode: values.zipcode,
              website: values.website,
            },
            resetForm,
            history,
            setType,
          ),
        );
      } else {
        dispatch(createContact(values, resetForm, history, setType));
      }
    } else {
      dispatch(setAlert({ message: 'Fill fields properly', error: true }));
    }
  };

  console.log(errors);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap w-full">
        <div className="bg-white px-4 pt-4 pb-2 flex-1 flex flex-col">
          {type !== '2' ? (
            <div className="px-2 mb-3 flex flex-col w-full">
              <lable className="text-gray-2 text-md font-semibold ">
                Organization
              </lable>
              <Select
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary25: 'lightgray',
                    primary: 'lightgray',
                  },
                })}
                options={options}
                onChange={(selectedOption) => {
                  setFieldValue('organization', selectedOption.value);
                }}
              />
              {errors.organization ? (
                <div className="w-full text-sm text-red-400">
                  {errors.organization}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="px-2 flex flex-col w-full">
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
          </div>
          {errors.phone === 'Contact already exists' ? (
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  history.push(`/contactdetail/${id}`);
                  dispatch(
                    createcontactCard({
                      show: false,
                      phone: null,
                      fromLead: false,
                    }),
                  );
                  setType('');
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
          {type !== '2' ? (
            <>
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
              <div className="px-2 mb-3 flex flex-col w-full">
                <lable className="text-gray-2 text-md font-semibold ">
                  Title
                </lable>
                <input
                  className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                  type="text"
                  placeholder="Enter title"
                  {...getFieldProps('title')}
                />
              </div>
            </>
          ) : null}
          <div className="px-2 flex flex-col w-full">
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
          <div className="p-2 w-full mt-1 flex flex-col">
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
        <div className="bg-white px-4 pb-2 w-full flex flex-col mt-2">
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
        className="bg-green-600 hover:bg-green-700 px-5 py-2 text-lg rounded-md m-4 mb-0 text-white"
      >
        Save Contact
      </button>
    </div>
  );
};

export default CreateContactDetails;
