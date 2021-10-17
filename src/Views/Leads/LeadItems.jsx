import React, { useState } from 'react';
import { Button, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import { setAlert } from '../../context/actions/errorActions';
import UpdatePrice from './UpdatePrice';
import { refreshContact } from '../../context/actions/contactAction/contactAction';
import Select from 'react-select';

const LeadItems = ({ data, leadId }) => {
  const [itemButton, setitemButton] = useState({
    item: true,
    add: false,
    price: false,
  });
  const token = Cookies.get('JWT');
  const user = JSON.parse(localStorage.getItem('user'));
  const inventory = useSelector((state) => state.inventory.inventory);

  const DATA = useSelector((state) => state.contact.update);

  var lead = DATA?.allLeads?.filter((d) => d._id === data?._id)[0];

  const dispatch = useDispatch();

  var inventorySku = [];

  lead?.items.forEach((element) => {
    let inventoryItem = inventory.filter(
      (f) => f?._id === element?.item?._id,
    )[0];
    inventorySku.push({
      _id: inventoryItem?._id,
      sku: inventoryItem?.sku,
      item_name: inventoryItem?.item_name,
      article: inventoryItem?.article,
      sale_price: inventoryItem?.sale_price,
      gst: inventoryItem?.gst,
    });
  });

  let options = [];

  inventory.forEach((element) => {
    options.push({
      value: element._id,
      label: element.item_name + '(' + element.article + ')',
    });
  });

  const validate = (values) => {
    const errors = {};
    let inven = inventory.filter((f) => f._id === values?._id)[0]?.sku;
    if (!values._id) {
      errors._id = '*Required';
    }
    if (!values.quantity) {
      errors.quantity = '*Required';
    } else if (values.quantity > inven) {
      errors.quantity = `Only ${inven} units available`;
    }
    return errors;
  };

  const { getFieldProps, errors, setFieldValue, resetForm, values } = useFormik(
    {
      initialValues: { _id: '', quantity: '' },
      validate,
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/add-item/${lead._id}/${user._id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resetForm();
        dispatch(refreshContact(leadId));
        dispatch(
          setAlert({ message: 'Item Added successfully', error: false }),
        );
      })
      .catch((err) => {
        dispatch(setAlert({ message: 'Error adding item', error: true }));
      });
  };

  return (
    <div>
      <div className="m-10 ml-20">
        <div>
          <Button
            onClick={() => {
              setitemButton({
                item: true,
                add: false,
                price: false,
              });
            }}
            style={{
              backgroundColor: `${itemButton.item ? 'gray' : '#54a3ff'}`,
              color: 'white',
              textTransform: 'capitalize',
              marginBottom: '10px',
              marginRight: '10px',
            }}
          >
            All Items
          </Button>
          <Button
            onClick={() => {
              setitemButton({
                item: false,
                add: true,
                price: false,
              });
            }}
            style={{
              backgroundColor: `${itemButton.add ? 'gray' : '#54a3ff'}`,
              color: 'white',
              textTransform: 'capitalize',
              marginBottom: '10px',
            }}
          >
            Add Item
          </Button>
          <Button
            onClick={() => {
              setitemButton({
                item: false,
                add: false,
                price: true,
              });
            }}
            style={{
              backgroundColor: `${itemButton.price ? 'gray' : '#54a3ff'}`,
              color: 'white',
              textTransform: 'capitalize',
              marginBottom: '10px',
              marginLeft: '10px',
            }}
          >
            Updated Item
          </Button>
        </div>
        {itemButton?.item ? (
          <div className="mt-4">
            {lead?.items.map((item, index) => {
              return (
                <div className="flex w-1/2 items-center">
                  <div className="bg-gray-100 p-1 w-full rounded-lg pl-4 mb-2">
                    <p>
                      Item: <span>{inventorySku[index]?.item_name}</span>
                    </p>
                    <p>
                      Article No: <span>{inventorySku[index]?.article}</span>
                    </p>
                    <p>
                      Quantity <span>{item?.quantity}</span>
                    </p>
                    <p>
                      Sale Price:
                      <span>
                        {item?.updatedSalePrice === 0
                          ? inventorySku[index]?.sale_price
                          : item?.updatedSalePrice}
                      </span>
                    </p>
                  </div>
                  <div>
                    <IconButton
                      onClick={() => {
                        axiosInstance
                          .delete(
                            `/remove-item/${item?.item?._id}/${lead._id}/${user._id}`,
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            },
                          )
                          .then((res) => {
                            dispatch(refreshContact(leadId));
                          })
                          .catch((err) => {});
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
        {itemButton?.add ? (
          <div>
            <div className="bg-white pb-2 w-full flex flex-col mt-4">
              <div className="px-2 my-3 flex flex-col w-full">
                <div className="w-full flex">
                  <div className="w-1/4">
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
                        setFieldValue(`_id`, selectedOption.value);
                      }}
                    />
                    {errors._id ? (
                      <div className="ml-1 w-full text-sm text-red-400">
                        {errors._id}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-1/4">
                    <lable className="text-gray-2 text-md font-semibold ">
                      Quantity
                    </lable>
                    <input
                      type="number"
                      className={`p-2 border w-full ml-2 border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                      {...getFieldProps('quantity')}
                    />
                    {errors.quantity ? (
                      <div className="ml-1 w-full text-sm text-red-400">
                        {errors.quantity}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="bg-green-600 w-max mt-3 hover:bg-green-700 px-5 py-2 text-lg rounded-md mx-2 text-white"
              >
                Add items
              </button>
            </div>
          </div>
        ) : null}
        {itemButton?.price ? (
          <UpdatePrice
            lead={lead}
            inventorySku={inventorySku}
            leadId={lead._id}
          />
        ) : null}
      </div>
    </div>
  );
};

export default LeadItems;
