import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../context/actions/errorActions';
import { refreshLead } from '../../context/actions/leadAction/leadActions';
import axiosInstance from '../../utils/axiosInstance';
import Select from 'react-select';

const UpdatePrice = ({ inventorySku, leadId }) => {
  const token = Cookies.get('JWT');
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const lead = useSelector((state) => state.lead.selectedlead);

  const validate = (values) => {
    const errors = {};
    if (!values._id) {
      errors._id = '*Required';
    }
    if (!values.sale_price) {
      errors.sale_price = '*Required';
    }
    if (!values.quantity) {
      errors.quantity = '*Required';
    }

    return errors;
  };

  const { getFieldProps, errors, setFieldValue, resetForm, values, setValues } =
    useFormik({
      initialValues: {
        _id: '',
        sale_price: '',
        quantity: '',
      },
      validate,
    });

  let options = [];

  inventorySku.forEach((element) => {
    options.push({
      value: element._id,
      label: element.item_name + '(' + element.article + ')',
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      axiosInstance
        .patch(`/update-item/${leadId}/${user._id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          resetForm();
          dispatch(refreshLead(leadId));
          dispatch(
            setAlert({ message: 'Item updated successfully', error: false }),
          );
        })
        .catch((err) => {
          dispatch(setAlert({ message: 'Error updating item', error: true }));
        });
    } else {
      dispatch(setAlert({ message: 'Fill fields properly', error: true }));
    }
  };

  return (
    <div>
      <div className="mt-3 flex flex-col w-full">
        <lable className="text-gray-2 text-md font-semibold ">Item</lable>
        <Select
          className="w-1/2"
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
            let salesPrice = lead?.items?.filter(
              (i) => i?.item?._id === selectedOption?.value,
            )[0]?.item?.sale_price;
            let updatedPrice = lead?.items?.filter(
              (i) => i?.item?._id === selectedOption?.value,
            )[0]?.updatedSalePrice;
            let quantity = lead?.items?.filter(
              (i) => i?.item?._id === selectedOption?.value,
            )[0]?.quantity;
            setValues({
              ...values,
              sale_price: updatedPrice === 0 ? salesPrice : updatedPrice,
              quantity: quantity,
            });
            setFieldValue(`_id`, selectedOption.value);
          }}
        />

        {errors._id ? (
          <div className="w-full text-sm text-red-400">{errors._id}</div>
        ) : null}
      </div>

      <div>
        {values?._id ? (
          <div className="mt-2">
            <p>
              Item:{' '}
              <span>
                {inventorySku.filter((f) => f._id === values._id)[0].item_name}
              </span>
            </p>
            <p>
              Article No.:{' '}
              <span>
                {inventorySku.filter((f) => f._id === values._id)[0].article}
              </span>
            </p>
            <p>
              Original Sales Price:{' '}
              <span>
                {inventorySku.filter((f) => f._id === values._id)[0].sale_price}
              </span>
            </p>
          </div>
        ) : null}
        <div className=" mt-2 flex flex-col">
          <lable className="text-gray-2 text-md font-semibold ">Price</lable>
          <input
            type="number"
            className={`p-2 border w-1/2 border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
            placeholder="Enter price"
            {...getFieldProps('sale_price')}
          />
          {errors.sale_price ? (
            <div className="w-full text-sm text-red-400">
              {errors.sale_price}
            </div>
          ) : null}
        </div>
        <div className=" mt-2 flex flex-col">
          <lable className="text-gray-2 text-md font-semibold ">Quantity</lable>
          <input
            type="number"
            className={`p-2 border w-1/2 border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
            placeholder="Enter quantity"
            {...getFieldProps('quantity')}
          />
          {errors.quantity ? (
            <div className="w-full text-sm text-red-400">{errors.quantity}</div>
          ) : null}
        </div>
      </div>
      <button
        onClick={(e) => {
          handleSubmit(e);
        }}
        className="bg-green-600 w-max mt-3 hover:bg-green-700 px-5 py-2 text-lg rounded-md text-white"
      >
        Update Item
      </button>
    </div>
  );
};

export default UpdatePrice;
