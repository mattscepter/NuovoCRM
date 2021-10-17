import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axiosInstance from '../../utils/axiosInstance';
import { setAlert } from '../../context/actions/errorActions';
import Select from 'react-select';

const Message = () => {
  const contact = useSelector((state) => state.contact.contact);
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.contact) {
      errors.contact = '*Required';
    }
    if (!values.message) {
      errors.message = '*Required';
    }
    return errors;
  };

  const history = useHistory();
  const { getFieldProps, errors, values, resetForm, setFieldValue } = useFormik(
    {
      initialValues: {
        contact: '',
        message: '',
      },
      validate,
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = Cookies.get('JWT');
    axiosInstance
      .post(
        `/send-sms/${values.contact}/${user._id}`,
        { message: values.message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        resetForm();
        dispatch(
          setAlert({ message: 'Message sent successfully', error: false }),
        );
      })
      .catch((err) => {
        resetForm();
        dispatch(setAlert({ message: 'Error sending message', error: true }));
      });
  };

  let options = [];

  contact.forEach((element) => {
    options.push({
      value: element._id,
      label:
        element.name +
        '(' +
        element.phone +
        ')' +
        (element.company !== 'NA' ? `(${element.company})` : ''),
    });
  });

  return (
    <div>
      <div className="mt-10 mx-4">
        <div className="bg-white lg:w-1/2 flex justify-between items-center p-4 mb-4">
          <h2 className="text-xl font-bold m-0">Message</h2>
          <button
            onClick={() => {
              history.push('/createcontact');
            }}
            className="bg-green-500 hover:bg-green-600 text-white p-4 py-2 rounded-md"
          >
            Create Contact
          </button>
        </div>
        <div className="bg-white lg:w-1/2 p-4 flex-1 flex flex-col">
          <div className="px-2 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Select Contact
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
                setFieldValue(`contact`, selectedOption.value);
              }}
            />
            {errors.contact ? (
              <div className="w-full text-sm text-red-400">
                {errors.contact}
              </div>
            ) : null}
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Enter Message
            </lable>
            <textarea
              rows={8}
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter message"
              {...getFieldProps('message')}
            />
            {errors.message ? (
              <div className="w-full text-sm text-red-400">
                {errors.message}
              </div>
            ) : null}
          </div>
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            className="bg-green-600 mt-3 hover:bg-green-700 px-5 py-2 text-lg rounded-md my-4 mx-2 text-white"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
