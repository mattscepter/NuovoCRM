import { IconButton } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import { createLead } from '../../context/actions/leadAction/leadActions';

const CreateLeadCard = ({ addLead, setAddLead, phone, id }) => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.inventory);
  const history = useHistory();

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = '*Required';
    }
    if (!values.title) {
      errors.title = '*Required';
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
        phone: phone,
        items: [{ item: '', quantity: '', updatedSalePrice: 0 }],
        description: '',
      },
      validate,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLead(values, resetForm, history, id));
  };

  console.log(id);

  return (
    <form
      className={`${
        addLead ? 'block' : 'hidden'
      } fixed top-1/2 right-1/2 w-1/2 transform translate-x-1/2 -translate-y-1/2 bg-white mt-10 mx-4 flex flex-col items-center z-50 shadow-2xl`}
    >
      <div className="w-full flex justify-end">
        <IconButton
          onClick={() => {
            setAddLead(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>

      <div className="bg-white flex items-center justify-center p-4 pb-0 w-full">
        <h2 className="text-xl text-center font-bold m-0">Create Lead</h2>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="bg-white px-4 pb-2 flex-1 flex flex-col mr-1">
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
          <p className="text-lg font-semibold">Add Items:</p>
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
          <div className="w-full text-sm text-red-400">{errors.items}</div>
        ) : null}

        <div className="w-full">
          <div className=" flex flex-col w-full h-60 overflow-auto mb-2">
            {values.items.map((item, index) => {
              return (
                <div className="flex w-full p-2 items-center">
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
    </form>
  );
};

export default CreateLeadCard;
