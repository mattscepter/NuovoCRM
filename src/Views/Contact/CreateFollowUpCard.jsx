import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { createFollowUp } from '../../context/actions/contactAction/contactAction';
import axiosInstance from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
import { setAlert } from '../../context/actions/errorActions';

const CreateFollowUpCard = ({ phone, show, fromContact }) => {
  const contact = useSelector((state) => state.contact.contact);
  const dispatch = useDispatch();

  const token = Cookies.get('JWT');
  const user = JSON.parse(localStorage.getItem('user'));

  const validate = (values) => {
    const errors = {};

    if (!values.phone) {
      errors.phone = '*Required';
    }
    if (!values.date) {
      errors.date = '*Required';
    }
    return errors;
  };

  const { getFieldProps, errors, values, setFieldValue, resetForm } = useFormik(
    {
      initialValues: {
        phone: phone,
        date: '',
        text: '',
      },
      validate,
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fromContact) {
      axiosInstance
        .post(
          `/create-followup/${user._id}`,
          { phone: phone, date: values.date, text: values.text },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          resetForm();
          dispatch(
            createFollowUp({ show: false, phone: null, fromContact: false }),
          );
          dispatch(setAlert({ message: 'FollowUp created', error: false }));
        })
        .catch((err) => {
          dispatch(
            setAlert({ message: 'Error creating followup', error: true }),
          );
        });
    } else {
      axiosInstance
        .post(`/create-followup/${user._id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          resetForm();
          dispatch(
            createFollowUp({ show: false, phone: null, fromContact: false }),
          );
          dispatch(setAlert({ message: 'FollowUp created', error: false }));
        })
        .catch((err) => {
          dispatch(
            setAlert({ message: 'Error creating followup', error: true }),
          );
        });
    }
  };

  let options = [];

  contact.forEach((element) => {
    options.push({
      value: element.phone,
      label:
        element.name +
        '(' +
        element.phone +
        ')' +
        (element.company !== 'NA' ? `(${element.company})` : ''),
    });
  });

  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } bg-white rounded-md shadow-2xl fixed top-1/2 right-1/2 transform w-1/4 translate-x-1/2 z-50 -translate-y-1/2`}
    >
      <div className="w-full flex justify-end">
        <IconButton
          onClick={() =>
            dispatch(
              createFollowUp({ show: false, phone: null, fromContact: false }),
            )
          }
        >
          <CloseIcon />
        </IconButton>
      </div>
      <h3 className="text-center text-xl font-semibold">Create FollowUp</h3>
      <div className="px-6 pb-6">
        <div>
          {!fromContact ? (
            <div className="px-2 mt-3 flex flex-col w-full">
              <lable className="text-gray-2 text-md font-semibold ">
                Select contact
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
                  setFieldValue(`phone`, selectedOption.value);
                }}
              />
              {errors.phone ? (
                <div className="w-full text-sm text-red-400">
                  {errors.phone}
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Message
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter message"
              {...getFieldProps('text')}
            />
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">Date</lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="date"
              placeholder="Select date"
              {...getFieldProps('date')}
            />
            {errors.date ? (
              <div className="w-full text-sm text-red-400">{errors.date}</div>
            ) : null}
          </div>
        </div>
        <div className="px-2 mt-6 flex flex-col w-full">
          <Button
            onClick={(e) => {
              handleSubmit(e);
            }}
            style={{
              backgroundColor: 'rgba(16, 185, 129, var(--tw-bg-opacity))',
            }}
          >
            Create followup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateFollowUpCard;
