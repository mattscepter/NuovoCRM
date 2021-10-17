import { IconButton, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { createLead } from '../../context/actions/leadAction/leadActions';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import CreateContactCard from '../Contact/CreateContactCard';

const CreateLead = () => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.inventory);
  const contactData = useSelector((state) => state.contact.contact);
  const history = useHistory();
  const [addContact, setAddContact] = useState(false);
  const [contact, setContact] = useState('');

  const validate = (values) => {
    const errors = {};

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
    } else if (values.phone.toString().length === 10) {
      let flag = false;
      contactData.forEach((element) => {
        if (element.phone === values.phone) {
          flag = true;
        }
      });
      if (!flag) {
        errors.phone = 'Contact does not exists create new';
      }
    }

    values.items.forEach((element, index) => {
      if (!element.item) {
        errors.items = 'Select all items';
      }
    });
    return errors;
  };

  let options = [];

  inventory.forEach((element) => {
    options.push({
      value: element._id,
      label: element.item_name + '(' + element.article + ')',
    });
  });

  const { getFieldProps, errors, values, setValues, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        title: '',
        phone: '',
        items: [{ item: '', quantity: '', updatedSalePrice: '0' }],
        description: '',
      },
      validate,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLead(values, resetForm, history));
  };

  return (
    <form className="m-10 flex flex-col items-center">
      <CreateContactCard
        setAddContact={setAddContact}
        addContact={addContact}
        contact={contact}
      />
      <div className="bg-white flex justify-between items-center p-4 mb-4 w-full">
        <h2 className="text-xl font-bold m-0">Create Lead</h2>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="bg-white px-4 pt-4 pb-2 flex-1 flex flex-col mr-1">
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
            {errors.phone === 'Contact does not exists create new' ? (
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setAddContact(true);
                    setContact(values.phone);
                  }}
                  className="w-max"
                  style={{
                    backgroundColor: '#54a3ff',
                    color: 'white',
                    textTransform: 'capitalize',
                    marginTop: '10px',
                  }}
                >
                  Add Contact
                </Button>
              </div>
            ) : null}
          </div>

          <div className="px-2 mt-3 mb-3 flex flex-col w-full">
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
        </div>
        <div className="bg-white p-4 flex-1 flex flex-col">
          <div className="p-2 w-full mb-3 flex flex-col">
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
      </div>

      <div className="bg-white px-4 pt-4 pb-2 w-full flex flex-col mt-4">
        <div className="flex items-center">
          <p className="text-lg font-semibold">Add Items:</p>
          <IconButton
            onClick={() => {
              setValues({
                ...values,
                items: [
                  ...values.items,
                  { _id: '', quantity: '', updatedSalePrice: '0' },
                ],
              });
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        {errors.items ? (
          <div className="w-full text-sm text-red-400">{errors.items}</div>
        ) : null}

        <div>
          <div className=" flex flex-col w-full mb-2">
            {values.items.map((item, index) => {
              return (
                <div className="flex w-1/2 p-2 items-center">
                  <div className="w-1/2">
                    <lable className="text-gray-2 text-md font-semibold ">
                      Item
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
                        setFieldValue(
                          `items[${index}].item`,
                          selectedOption.value,
                        );
                      }}
                    />
                  </div>
                  <div className="ml-2 w-1/2">
                    <lable className="text-gray-2 text-md font-semibold ">
                      Quantity
                    </lable>
                    <input
                      className={`p-2 w-full border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                      type="text"
                      placeholder="Enter quantity"
                      {...getFieldProps(`items[${index}].quantity`)}
                    />
                  </div>
                  <IconButton
                    style={{
                      marginTop: '14px',
                      marginLeft: '5px',
                      padding: '5px',
                    }}
                    onClick={() => {
                      setValues({
                        ...values,
                        items: values.items.filter((f, i) => i !== index),
                      });
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          handleSubmit(e);
        }}
        className="bg-green-600 mt-3 hover:bg-green-700 px-5 py-2 text-lg rounded-md m-4 text-white"
      >
        Save Lead
      </button>
    </form>
  );
};

export default CreateLead;
