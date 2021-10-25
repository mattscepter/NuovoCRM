import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {
  refreshContact,
  updateContact,
} from '../../context/actions/contactAction/contactAction';
import Select from 'react-select';
import axiosInstance from '../../utils/axiosInstance';

const CreateContact = () => {
  const dispatch = useDispatch();
  const update = useSelector((state) => state.contact.update);
  const history = useHistory();
  const contactData = useSelector((state) => state.contact.contact);
  const data = useSelector((state) => state.contact.update);
  const [orgList, setOrgList] = useState([]);
  let options = [];

  useEffect(() => {
    axiosInstance.get('/organizations').then((res) => {
      setOrgList(res.data);
    });
  }, []);

  orgList.forEach((element) => {
    options.push({ value: element?._id, label: element?.name });
  });

  const { id } = useParams();
  useEffect(() => {
    dispatch(refreshContact(id));
  }, [dispatch, id]);

  const validate = (values) => {
    const errors = {};
    if (values.phone.toString().length === 0) {
      errors.phone = '';
    } else if (values.phone.toString().length !== 10) {
      errors.phone = 'Length should be 10';
    } else if (values.phone.toString().length === 10) {
      let flag = false;
      contactData.forEach((element) => {
        if (element.phone === values.phone && values.phone !== update.phone) {
          flag = true;
        }
      });
      if (flag) {
        errors.phone = 'Contact already exists';
      }
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values?.whatsapp_no) {
      errors.whatsapp_no = '';
    } else if (values?.whatsapp_no?.toString().length !== 10) {
      errors.whatsapp_no = 'Length should be 10';
    }
    return errors;
  };

  const { getFieldProps, errors, resetForm, values, setValues, setFieldValue } =
    useFormik({
      initialValues: {},
      validate,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateContact(update._id, values, resetForm, history));
  };

  useEffect(() => {
    if (data.organization) {
      setValues({
        organization: data?.organization?._id,
        department: data?.department,
        title: data?.title,
        name: data?.name,
        phone: data?.phone,
        email: data?.email,
        whatsapp_no: data?.whatsapp_no,
        description: data?.description,
        website: data?.website,
        street: data?.street,
        city: data?.city,
        state: data?.state,
        country: data?.country,
        zipcode: data?.zipcode,
      });
    } else {
      setValues({
        name: data?.name,
        phone: data?.phone,
        email: data?.email,
        whatsapp_no: data?.whatsapp_no,
        description: data?.description,
        website: data?.website,
        street: data?.street,
        city: data?.city,
        state: data?.state,
        country: data?.country,
        zipcode: data?.zipcode,
      });
    }
  }, [data, setValues]);

  console.log(values);

  return (
    <div className="mt-10 mx-4 flex flex-col items-center">
      <div className="bg-white flex justify-between items-center p-4 mb-4 w-full rounded-lg">
        <h2 className="text-xl font-bold m-0">Update Contact</h2>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="bg-white px-4 pt-4 pb-2 flex-1 flex flex-col rounded-l-lg">
          {data.organization ? (
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
                defaultValue={{
                  label: data?.organization?.name,
                  value: data?.organization?._id,
                }}
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
        <div className="bg-white p-4 flex-1 flex flex-col rounded-r-lg">
          {data.organization ? (
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
        <div className="bg-white px-4 pt-4 pb-2 w-full flex flex-col mt-4 rounded-lg">
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
        Update Contact
      </button>
    </div>
  );
};

export default CreateContact;
