import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { setConfirmation } from '../context/actions/confirmationAction';

const Confirmation = ({ func, show, text }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } bg-white rounded-md shadow-2xl fixed top-1/2 right-1/2 transform translate-x-1/2 z-50 -translate-y-1/2`}
    >
      <div className="w-full flex justify-end">
        <IconButton
          onClick={() => {
            dispatch(setConfirmation({ show: false, func: () => {} }));
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className="px-6 pb-6">
        <p className="text-xl pb-10 whitespace-pre-line">{text}</p>
        <Button
          onClick={() => {
            func();
            dispatch(setConfirmation({ show: false, func: () => {} }));
          }}
          style={{
            backgroundColor: 'rgba(16, 185, 129, var(--tw-bg-opacity))',
            marginRight: '8px',
          }}
        >
          Confirm
        </Button>
        <Button
          onClick={() => {
            dispatch(setConfirmation({ show: false, func: () => {} }));
          }}
          style={{ backgroundColor: 'rgba(239, 68, 68, var(--tw-bg-opacity))' }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
