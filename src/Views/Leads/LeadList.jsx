import React, { useState } from 'react';
import PreviewIcon from '@mui/icons-material/Preview';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import CheckIcon from '@mui/icons-material/Check';
import axiosInstance from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { refreshContact } from '../../context/actions/contactAction/contactAction';
import DeleteIcon from '@mui/icons-material/Delete';
import { setAlert } from '../../context/actions/errorActions';
import { setConfirmation } from '../../context/actions/confirmationAction';

const LeadList = ({ setShow, setSelectedLead, lead, id }) => {
  const dispatch = useDispatch();
  const { getFieldProps, values, resetForm } = useFormik({
    initialValues: {
      stage: '',
    },
  });
  const token = Cookies.get('JWT');
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <div className="bg-gray-100 w-full p-4 rounded-md flex justify-between items-center mb-2 cursor-pointer">
        <div
          onClick={() => {
            setShow(true);
            setSelectedLead(lead);
          }}
          className="flex justify-between w-4/6 "
        >
          <div
            className={`${
              lead?.status === 'Active'
                ? 'text-green-500'
                : lead?.status === 'Cancelled'
                ? 'text-red-500'
                : 'text-blue-500'
            } flex flex-col`}
          >
            <p className="text-lg font-semibold">
              Title:
              <span className="pl-2 font-medium">{lead?.title}</span>
            </p>
            <p className="text-lg font-semibold">
              Date:
              <span className="pl-2 font-medium">
                {new Date(lead?.createdAt).toLocaleString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </p>
          </div>
          <p className="text-lg font-semibold mr-4">
            Stage:
            <span className="pl-2 font-medium">{lead?.stage}</span>
          </p>
        </div>
        <div>
          <select
            className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
            name=""
            id=""
            {...getFieldProps('stage')}
          >
            <option value="" selected style={{ color: 'lightgray' }}>
              Select stage
            </option>
            <option value="Preliminary">Preliminary</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
            <option value="Quotation">Quotation</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Order Form">Order Form</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Invoice">Invoice</option>
          </select>
          {!values.stage ? null : (
            <IconButton
              onClick={() => {
                const token = Cookies.get('JWT');
                const user = JSON.parse(localStorage.getItem('user'));
                axiosInstance
                  .put(`/update-stage/${lead._id}/${user._id}`, values, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((res) => {
                    resetForm();
                    dispatch(refreshContact(id));
                  });
              }}
            >
              <CheckIcon />
            </IconButton>
          )}
          <IconButton
            onClick={() => {
              dispatch(
                setConfirmation({
                  text: 'Are you sure, you want to delete lead?',
                  func: () => {
                    axiosInstance
                      .delete(`delete-lead/${lead._id}/${user._id}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })
                      .then((res) => {
                        dispatch(refreshContact(id));
                        dispatch(
                          setAlert({
                            message: 'Lead deleted successfully',
                            error: false,
                          }),
                        );
                      })
                      .catch(() => {
                        dispatch(
                          setAlert({
                            message: 'Error deleting lead',
                            error: true,
                          }),
                        );
                      });
                  },
                  show: true,
                }),
              );
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default LeadList;
