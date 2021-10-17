import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { createLead } from '../../context/actions/leadAction/leadActions';

const CreateLead = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const inventory = useSelector((state) => state.inventory.inventory);
  const update = useSelector((state) => state.lead.updatelead);
  const history = useHistory();
  const validate = (values) => {
    const errors = {};
    if (!values.owner) {
      errors.owner = '*Required';
    }
    if (!values.name) {
      errors.name = '*Required';
    }
    if (!values.title) {
      errors.title = '*Required';
    }
    if (!values.phone) {
      errors.phone = '*Required';
    } else if (values.phone.toString().length !== 10) {
      errors.phone = 'Length should be 10';
    }

    if (!values.industry) {
      errors.industry = '*Required';
    }
    if (!values.item) {
      errors.item = '*Required';
    }
    if (!values.status) {
      errors.status = '*Required';
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
    if (!values.rating) {
      errors.rating = '*Required';
    }
    if (!values.whatsapp_number) {
      errors.whatsapp_number = '*Required';
    } else if (values.whatsapp_number.toString().length !== 10) {
      errors.whatsapp_number = 'Length should be 10';
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
    if (!values.description) {
      errors.description = '*Required';
    }
    return errors;
  };

  const { getFieldProps, handleSubmit, errors, values } = useFormik({
    initialValues: update,
    validate,
    onSubmit: async (values, { resetForm }) => {},
  });

  return (
    <form onSubmit={handleSubmit} className="m-10 flex flex-col items-center">
      <div className="bg-white flex justify-between items-center p-4 mb-4 w-full">
        <h2 className="text-xl font-bold m-0">Create Lead</h2>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="bg-white px-4 pt-4 pb-2 flex-1 flex flex-col">
          <div className="px-2 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Lead Owner
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter lead owner"
              {...getFieldProps('owner')}
            />
            {errors.owner ? (
              <div className="w-full text-sm text-red-400">{errors.owner}</div>
            ) : null}
          </div>
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
            <lable className="text-gray-2 text-md font-semibold ">Title</lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter title"
              {...getFieldProps('title')}
            />
            {errors.title ? (
              <div className="w-full text-sm text-red-400">{errors.title}</div>
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
            <lable className="text-gray-2 text-md font-semibold ">
              Industry
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter industry"
              {...getFieldProps('industry')}
            />
            {errors.industry ? (
              <div className="w-full text-sm text-red-400">
                {errors.industry}
              </div>
            ) : null}
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">Item</lable>
            <select
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              name=""
              id=""
              {...getFieldProps('item')}
            >
              <option value="" selected hidden style={{ color: 'lightgray' }}>
                Select Item
              </option>
              <option value="615c5b3b5fa55e21fc0d7a6b">
                Attempted to Contact
              </option>
              {inventory.map((i, index) => {
                return (
                  <option key={index} value={i._id}>
                    {i.item_name}
                  </option>
                );
              })}
            </select>
            {errors.item ? (
              <div className="w-full text-sm text-red-400">{errors.item}</div>
            ) : null}
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Lead Status
            </lable>
            <select
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              name=""
              id=""
              {...getFieldProps('status')}
            >
              <option value="" selected hidden style={{ color: 'lightgray' }}>
                Select lead status
              </option>
              <option value="Attempted to Contact">Attempted to Contact</option>
              <option value="Contact in Future">Contact in Future</option>
              <option value="Contacted">Contacted</option>
              <option value="Junk Lead">Junk Lead</option>
              <option value="Lost Lead">Lost Lead</option>
              <option value="Not Contacted">Not Contacted</option>
              <option value="Pre-Qualified">Pre-Qualified</option>
              <option value="Not Qualified">Not Qualified</option>
            </select>
            {errors.status ? (
              <div className="w-full text-sm text-red-400">{errors.status}</div>
            ) : null}
          </div>
          <div className="px-2 mt-3 mb-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Annual Income
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="number"
              placeholder="Enter annual income"
            />
          </div>
        </div>
        <div className="bg-white p-4 flex-1 flex flex-col">
          <div className="px-2 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Company
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter company name"
              {...getFieldProps('company')}
            />
            {errors.company ? (
              <div className="w-full text-sm text-red-400">
                {errors.company}
              </div>
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
              Website
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter website"
            />
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Total Employees
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter number of employees"
            />
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">Rating</lable>
            <select
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              name=""
              id=""
              {...getFieldProps('rating')}
            >
              <option value="" selected style={{ color: 'lightgray' }}>
                Select rating
              </option>
              <option value="Acquired">Acquired</option>
              <option value="Active">Active</option>
              <option value="Market Failed">Market Failed</option>
              <option value="Project Cancelled">Project Cancelled</option>
              <option value="Shut Down">Shut Down</option>
            </select>
            {errors.rating ? (
              <div className="w-full text-sm text-red-400">{errors.rating}</div>
            ) : null}
          </div>

          <div className="px-2 mt-3 mb-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Whatsapp Number
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="number"
              placeholder="Enter whatsapp number"
              {...getFieldProps('whatsapp_number')}
            />
            {errors.whatsapp_number ? (
              <div className="w-full text-sm text-red-400">
                {errors.whatsapp_number}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-white px-4 pt-4 pb-2 w-full flex flex-col mt-4">
        <h3 className="text-lg font-semibold pl-2">Address</h3>
        <div className="flex flex-wrap w-full">
          <div className="flex-col mt-3 flex flex-1 p-2">
            <lable className="text-gray-2 text-md font-semibold ">Street</lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter street"
              {...getFieldProps('street')}
            />
            {errors.street ? (
              <div className="w-full text-sm text-red-400">{errors.street}</div>
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
            <lable className="text-gray-2 text-md font-semibold ">State</lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter state"
              {...getFieldProps('state')}
            />
            {errors.state ? (
              <div className="w-full text-sm text-red-400">{errors.state}</div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap w-full">
          <div className="flex-col mt-3 flex flex-1 p-2">
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
          <div className="flex-col mt-3 flex flex-1 p-2">
            <lable className="text-gray-2 text-md font-semibold ">
              ZIP code
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
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
          {errors.description ? (
            <div className="w-full text-sm text-red-400">
              {errors.description}
            </div>
          ) : null}
        </div>
      </div>
      <button
        type="submit"
        className="bg-green-600 mt-3 hover:bg-green-700 px-5 py-2 text-lg rounded-md m-4 text-white"
      >
        Save Lead
      </button>
    </form>
  );
};

export default CreateLead;
