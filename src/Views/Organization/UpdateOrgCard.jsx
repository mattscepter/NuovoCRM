import { useFormik } from 'formik';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrganization,
  refreshOrg,
} from '../../context/actions/contactAction/contactAction';
import Cookies from 'js-cookie';
import axiosInstance from '../../utils/axiosInstance';
import { setAlert } from '../../context/actions/errorActions';

const UpdateOrgCard = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const DATA = useSelector((state) => state.contact.selectedOrg);

  const validate = (values) => {
    const errors = {};
    if (!values.type) {
      errors.type = '*Required';
    }
    if (!values.name) {
      errors.name = '*Required';
    }
    if (!values.address) {
      errors.address = '*Required';
    }
    return errors;
  };

  const { getFieldProps, errors, values, resetForm } = useFormik({
    initialValues: {
      type: DATA.type,
      name: DATA.name,
      address: DATA.address,
    },
    validate,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('JWT');
    const user = JSON.parse(localStorage.getItem('user'));
    axiosInstance
      .patch(`/update-organization/${DATA._id}/${user._id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setShow(false);
        resetForm();
        dispatch(refreshOrg(DATA._id));
        dispatch(
          setAlert({
            message: 'Organization Updated Successfully',
            error: false,
          }),
        );
      })
      .catch((err) => {
        dispatch(
          setAlert({ message: 'Error updating organization', error: true }),
        );
      });
  };

  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full h-full bg-black bg-opacity-20 mt-10 mx-4  z-50 shadow-2xl`}
    >
      <div className="w-1/3 bg-white flex flex-col pb-4 items-center rounded-lg">
        <div className="w-full flex justify-end">
          <IconButton
            onClick={() => {
              setShow(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <h3 className="text-center text-2xl font-semibold">
          Update Organization
        </h3>
        <div className="p-4 w-full flex justify-center flex-col items-center">
          <div className="flex flex-wrap w-full">
            <div className="bg-white px-4 pt-4 pb-2 flex-1 flex flex-col">
              <div className="px-2 mb-3 flex flex-col w-full">
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
                  <div className="w-full text-sm text-red-400">
                    {errors.name}
                  </div>
                ) : null}
              </div>

              <div className="px-2 mb-3 flex flex-col w-full">
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
                  <div className="w-full text-sm text-red-400">
                    {errors.type}
                  </div>
                ) : null}
              </div>
              <div className="px-2 flex mb-3 flex-col w-full">
                <lable className="text-gray-2 text-md font-semibold ">
                  Address
                </lable>
                <input
                  className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                  type="text"
                  placeholder="Enter department"
                  {...getFieldProps('address')}
                />
                {errors.address ? (
                  <div className="w-full text-sm text-red-400">
                    {errors.address}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-green-600 w-max hover:bg-green-700 px-5 py-2 text-lg rounded-md m-4 mb-0 text-white"
          >
            Update Organization
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrgCard;
