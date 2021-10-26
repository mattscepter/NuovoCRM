import { IconButton, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import {
  createLead,
  refreshLead,
} from '../../context/actions/leadAction/leadActions';
import {
  createleadCard,
  refreshContact,
} from '../../context/actions/contactAction/contactAction';
import Cookies from 'js-cookie';
import axiosInstance from '../../utils/axiosInstance';
import { setAlert } from '../../context/actions/errorActions';

const CreateLeadCard = ({ phone, show, fromContact }) => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.inventory);
  const contactData = useSelector((state) => state.contact.contact);
  const currentContact = useSelector((state) => state.contact.update);
  const history = useHistory();

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = '*Required';
    }
    if (values.items.length !== 0) {
      values.items.forEach((element, index) => {
        if (!element.item) {
          errors.items = 'Select all items';
        }
      });
    }

    if (!fromContact) {
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
    }

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
        items: [],
        description: '',
      },
      validate,
    });

  const createLead = (data) => {
    const token = Cookies.get('JWT');
    const user = JSON.parse(localStorage.getItem('user'));

    axiosInstance
      .post(`/create-lead/${user._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(
          createleadCard({
            show: false,
            phone: null,
            fromContact: false,
          }),
        );
        resetForm();
        dispatch(refreshContact(currentContact?._id));
        dispatch(
          setAlert({ message: 'Lead created successfully', error: false }),
        );
      })
      .catch((err) => {
        dispatch(setAlert({ message: 'Error creating lead', error: true }));
        resetForm();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && values.title !== '') {
      if (fromContact) {
        createLead({
          title: values.title,
          phone: phone,
          items: values.items,
          description: values.description,
        });
      } else {
        createLead(values);
      }
    } else {
      dispatch(setAlert({ message: 'Fill fields properly', error: true }));
    }
  };

  return (
    <form
      className={`${
        show ? 'block' : 'hidden'
      } fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full h-full bg-black bg-opacity-20  z-50 shadow-2xl`}
    >
      <div className="bg-white w-1/3 pb-2 rounded-t-lg flex flex-col items-center">
        <div className="w-full flex justify-end">
          <IconButton
            onClick={() => {
              dispatch(
                createleadCard({
                  show: false,
                  phone: null,
                  fromContact: false,
                }),
              );
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <div className="bg-white flex items-center justify-center pb-0 w-full">
          <h2 className="text-center text-2xl font-semibold">Create Lead</h2>
        </div>
        <div className="flex flex-wrap w-full">
          <div className="bg-white px-4 pb-2 flex-1 flex flex-col mr-1">
            {!fromContact ? (
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
                  <div className="w-full text-sm text-red-400">
                    {errors.phone}
                  </div>
                ) : null}
                {errors.phone === 'Contact does not exists create new' ? (
                  <div className="flex justify-end">
                    <Button
                      onClick={() => {}}
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
            ) : null}
            <div className="px-2 mt-3 mb-3 flex flex-col w-full">
              <lable className="text-gray-2 text-md font-semibold ">
                Title
              </lable>
              <input
                className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                type="text"
                placeholder="Enter title"
                {...getFieldProps('title')}
              />
              {errors.title ? (
                <div className="w-full text-sm text-red-400">
                  {errors.title}
                </div>
              ) : null}
            </div>
            <div className="p-2 w-full flex flex-col">
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

        <div className="bg-white px-4 pb-2 w-full flex flex-col mt-4">
          <div className="flex items-center">
            <p className="text-lg font-semibold ml-3">Add Items:</p>
            <IconButton
              onClick={() => {
                setValues({
                  ...values,
                  items: [
                    ...values.items,
                    { item: '', quantity: '', updatedSalePrice: 0 },
                  ],
                });
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          {errors.items ? (
            <div className="w-full text-sm text-red-400 ml-3">
              {errors.items}
            </div>
          ) : null}

          <div className="w-full">
            <div className=" flex flex-col w-full max-h-60 overflow-auto mb-2">
              {values.items.map((item, index) => {
                return (
                  <div className="flex w-full p-2 items-center">
                    <div className="w-full">
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
                    <div className="ml-2 w-full">
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
          onClick={(e) => handleSubmit(e)}
          className="bg-green-600 mt-3 hover:bg-green-700 px-5 py-2 text-lg rounded-md m-4 text-white"
        >
          Save Lead
        </button>
      </div>
    </form>
  );
};

export default CreateLeadCard;
