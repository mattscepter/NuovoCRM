import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createcontactCard } from '../../context/actions/contactAction/contactAction';
import CreateOrg from './CreateOrg';
import CreateContactDetails from './CreateContactDetails';

const CreateContactCard = ({ phone, show, fromLead }) => {
  const dispatch = useDispatch();
  const [createOrg, setCreateOrg] = useState(false);
  const [createContact, setCreateContact] = useState(false);
  const [type, setType] = useState('');
  useEffect(() => {
    if (type === '1') {
      setCreateOrg(true);
    } else {
      setCreateOrg(false);
    }
    if (type === '2' || type === '0') {
      setCreateContact(true);
    } else {
      setCreateContact(false);
    }
  }, [type]);
  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full h-full bg-black bg-opacity-20 mt-10 mx-4  z-50 shadow-2xl`}
    >
      <div className="w-1/2 bg-white flex flex-col pb-1 items-center rounded-lg transform scale-85">
        {' '}
        <div className="w-full flex justify-end">
          <IconButton
            onClick={() => {
              dispatch(
                createcontactCard({
                  show: false,
                  phone: null,
                  fromLead: false,
                }),
              );
              setType('');
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="p-4 pt-0 w-full flex justify-center flex-col items-center">
          <h2 className="text-2xl font-semibold m-0">Create Contact</h2>
          <div className="px-6 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">Type</lable>
            <select
              className={`p-2 w-full border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              name=""
              id=""
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" selected style={{ color: 'lightgray' }}>
                Select type
              </option>
              <option value="0">Existing Organization</option>
              <option value="1">New Organization</option>
              <option value="2">Individual</option>
            </select>
            {/* {errors.type ? (
          <div className="w-full text-sm text-red-400">{errors.type}</div>
        ) : null} */}
          </div>
          {type === '' ? null : (
            <>
              {createOrg ? (
                <CreateOrg
                  setCreateOrg={setCreateOrg}
                  setCreateContact={setCreateContact}
                />
              ) : null}
              {createContact ? (
                <CreateContactDetails type={type} setType={setType} />
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateContactCard;
