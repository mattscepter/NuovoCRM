import React from 'react';
import { IconButton } from '@material-ui/core';
import { useFormik } from 'formik';
import CheckIcon from '@mui/icons-material/Check';
import axiosInstance from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { refreshContact } from '../../context/actions/contactAction/contactAction';
import DeleteIcon from '@mui/icons-material/Delete';
import { setAlert } from '../../context/actions/errorActions';
import { setConfirmation } from '../../context/actions/confirmationAction';
import { selectedlead } from '../../context/actions/leadAction/leadActions';
import { getInventory } from '../../context/actions/inventoryAction/inventoryAction';

const LeadList = ({ setShow, lead, id }) => {
  const dispatch = useDispatch();
  const { getFieldProps, values, resetForm } = useFormik({
    initialValues: {
      stage: '',
    },
  });
  const token = Cookies.get('JWT');
  const user = JSON.parse(localStorage.getItem('user'));
  const data = useSelector((state) => state.contact.update);

  const dispatchOrder = () => {
    axiosInstance
      .patch(
        `/dispatch-order/${lead._id}/${user._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        axiosInstance
          .patch(
            `/update-stage/${lead._id}/${user._id}`,
            { stage: 'Dispatched' },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((res) => {
            resetForm();
            dispatch(refreshContact(data._id));
            dispatch(setAlert({ message: 'Order dispatched', error: false }));
            dispatch(getInventory());
          })
          .catch((err) => {
            dispatch(
              setAlert({ message: 'Error dispatching order', error: true }),
            );
          });
      });
  };

  return (
    <div>
      <div className="bg-gray-100 w-full px-4 py-2 rounded-md flex justify-between items-center mb-2 cursor-pointer">
        <div
          onClick={() => {
            setShow(true);
            dispatch(selectedlead(lead));
          }}
          className="flex items-center justify-between w-4/6 "
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
            <p className="text-base font-semibold">
              Title:
              <span className="pl-2 font-medium">{lead?.title}</span>
            </p>
            <p className="text-base font-semibold">
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
            className={`p-3 py-1 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
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
                if (values.stage === 'Dispatched') {
                  dispatch(
                    setConfirmation({
                      show: true,
                      func: dispatchOrder,
                      text: 'Are you sure you want to dispatch order?',
                    }),
                  );
                } else if (
                  values.stage === 'Invoice' &&
                  lead?.stage !== 'Dispatched'
                ) {
                  dispatch(
                    setAlert({
                      message: 'Order not dispatched yet!!!',
                      error: true,
                    }),
                  );
                } else {
                  axiosInstance
                    .patch(
                      `/update-stage/${lead._id}/${user._id}`,
                      { stage: values.stage },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    )
                    .then((res) => {
                      resetForm();

                      if (res.data.stage === 'Invoice') {
                        axiosInstance
                          .patch(
                            `/update-status/${lead._id}/${user._id}`,
                            { status: 'Completed' },
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            },
                          )
                          .then((res) => {
                            dispatch(refreshContact(data._id));
                          });
                      }
                    });
                }
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
