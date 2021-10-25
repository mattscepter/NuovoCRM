import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import CheckIcon from '@mui/icons-material/Check';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  createFollowUp,
  refreshContact,
} from '../../context/actions/contactAction/contactAction';
import Cookies from 'js-cookie';
import { setAlert } from '../../context/actions/errorActions';
import { useHistory } from 'react-router';

const DashboardFollowUp = ({ name, fupFilter, fup }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state) => state.contact.update);
  const token = Cookies.get('JWT');
  const user = JSON.parse(localStorage.getItem('user'));
  const [remark, setRemark] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('JWT');
    const user = JSON.parse(localStorage.getItem('user'));
    axiosInstance
      .post(
        `/add-remarks-in-followup/${fup._id}/${user._id}`,
        {
          remarks: remark,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        dispatch(
          createFollowUp({ show: false, phone: null, fromContact: false }),
        );
        dispatch(setAlert({ message: 'FollowUp Completed', error: false }));
      })
      .catch((err) => {
        dispatch(
          setAlert({ message: 'Error converting followup', error: true }),
        );
      });
  };

  return (
    <div>
      {fupFilter === 'Upcoming' ? (
        <>
          {new Date(fup?.date).toLocaleDateString() >=
            new Date().toLocaleDateString() && !fup?.isAttended ? (
            <div
              key={fup?._id}
              className="bg-gray-100 w-full p-4 py-1 rounded-md flex justify-between items-center mb-2 cursor-pointer"
            >
              <div
                onClick={() => history.push(`/contactdetail/${name._id}`)}
                className="text-sm cursor-pointer"
              >
                <p className="border-b-2 py-1 pr-4">
                  <span className="font-light mr-2">Opening Remark:</span>
                  {fup?.text}
                </p>
                <p className="border-b-2 pr-4 w-max">
                  {name?.name +
                    '(' +
                    (name?.organization
                      ? name?.organization?.name + ')' + '('
                      : null) +
                    name?.phone +
                    ')'}
                </p>
                <p>
                  {new Date(fup?.date).toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div className="flex items-center">
                <input
                  type="text"
                  className={`px-2 py-1 ml-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                  placeholder="Enter closing remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
                <IconButton
                  onClick={handleSubmit}
                  style={{ padding: '8px', marginLeft: '10px' }}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    axiosInstance
                      .delete(`/delete-followup/${fup?._id}/${user._id}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })
                      .then((res) => {
                        dispatch(refreshContact(data._id));
                        dispatch(
                          setAlert({
                            message: 'FollowUp deleted',
                            error: false,
                          }),
                        );
                      })
                      .catch((err) => {
                        dispatch(
                          setAlert({
                            message: 'Error deleting followup',
                            error: true,
                          }),
                        );
                      });
                  }}
                  style={{ padding: '8px' }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
      {fupFilter === 'Today' ? (
        <>
          {new Date(fup?.date).toLocaleDateString() ===
            new Date().toLocaleDateString() && !fup?.isAttended ? (
            <div
              key={fup?._id}
              className="bg-gray-100 w-full p-4 py-1 rounded-md flex justify-between items-center mb-2 cursor-pointer"
            >
              <div
                onClick={() => history.push(`/contactdetail/${name._id}`)}
                className="text-sm cursor-pointer"
              >
                <p className="border-b-2 py-1 pr-4">
                  <span className="font-light mr-2">Opening Remark:</span>
                  {fup?.text}
                </p>
                <p className="border-b-2 pr-4 w-max">
                  {name?.name +
                    '(' +
                    (name?.organization
                      ? name?.organization?.name + ')' + '('
                      : null) +
                    name?.phone +
                    ')'}
                </p>
                <p>
                  {new Date(fup?.date).toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div className="flex items-center">
                <input
                  type="text"
                  className={`px-2 py-1 ml-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                  placeholder="Enter closing remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
                <IconButton
                  onClick={handleSubmit}
                  style={{ padding: '8px', marginLeft: '10px' }}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    axiosInstance
                      .delete(`/delete-followup/${fup?._id}/${user._id}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })
                      .then((res) => {
                        dispatch(refreshContact(data._id));
                        dispatch(
                          setAlert({
                            message: 'FollowUp deleted',
                            error: false,
                          }),
                        );
                      })
                      .catch((err) => {
                        dispatch(
                          setAlert({
                            message: 'Error deleting followup',
                            error: true,
                          }),
                        );
                      });
                  }}
                  style={{ padding: '8px' }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      {fupFilter === 'Missed' ? (
        <>
          {new Date(fup?.date).toLocaleDateString() <
          new Date().toLocaleDateString() ? (
            <div
              key={fup?._id}
              className="bg-gray-100 w-full p-4 py-1 rounded-md flex justify-between items-center mb-2 cursor-pointer"
            >
              <div
                onClick={() => history.push(`/contactdetail/${name._id}`)}
                className="text-sm cursor-pointer"
              >
                <p className="border-b-2 py-1 pr-4">
                  <span className="font-light mr-2">Opening Remark:</span>
                  {fup?.text}
                </p>
                <p className="border-b-2 pr-4 w-max">
                  {name?.name +
                    '(' +
                    (name?.organization
                      ? name?.organization?.name + ')' + '('
                      : null) +
                    name?.phone +
                    ')'}
                </p>
              </div>

              <div className="flex items-center">
                <p>
                  {new Date(fup?.date).toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <IconButton
                  onClick={() => {
                    axiosInstance
                      .delete(`/delete-followup/${fup?._id}/${user._id}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })
                      .then((res) => {
                        dispatch(refreshContact(data._id));
                        dispatch(
                          setAlert({
                            message: 'FollowUp deleted',
                            error: false,
                          }),
                        );
                      })
                      .catch((err) => {
                        dispatch(
                          setAlert({
                            message: 'Error deleting followup',
                            error: true,
                          }),
                        );
                      });
                  }}
                  style={{ padding: '8px' }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
      {fupFilter === 'Completed' ? (
        <>
          {fup?.isAttended ? (
            <div
              key={fup?._id}
              className="bg-gray-100 w-full p-4 py-1 rounded-md flex justify-between items-center mb-2 cursor-pointer"
            >
              <div
                onClick={() => history.push(`/contactdetail/${name._id}`)}
                className="text-sm cursor-pointer"
              >
                <p className="border-b-2 py-1 pr-4">
                  <span className="font-light mr-2">Opening Remark:</span>
                  {fup?.text}
                </p>
                <p className="border-b-2 pr-4 w-max">
                  <span className=" font-light mr-2">Closing Remark:</span>
                  {fup?.remarks}
                </p>
                <p className="">
                  {name?.name +
                    '(' +
                    (name?.organization
                      ? name?.organization?.name + ')' + '('
                      : null) +
                    name?.phone +
                    ')'}
                </p>
              </div>

              <div className="flex items-center">
                <p>
                  {new Date(fup?.date).toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <IconButton
                  onClick={() => {
                    axiosInstance
                      .delete(`/delete-followup/${fup?._id}/${user._id}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })
                      .then((res) => {
                        dispatch(refreshContact(data._id));
                        dispatch(
                          setAlert({
                            message: 'FollowUp deleted',
                            error: false,
                          }),
                        );
                      })
                      .catch((err) => {
                        dispatch(
                          setAlert({
                            message: 'Error deleting followup',
                            error: true,
                          }),
                        );
                      });
                  }}
                  style={{ padding: '8px' }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default DashboardFollowUp;
