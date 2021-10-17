import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  createInventory,
  updateInventory,
} from '../../context/actions/inventoryAction/inventoryAction';

const CreateInventory = () => {
  const dispatch = useDispatch();
  const imgRef = useRef();
  const update = useSelector((state) => state.inventory.update);
  const history = useHistory();

  const validate = (values) => {
    const errors = {};
    if (!values.type) {
      errors.type = '*Required';
    }
    if (!values.item_name) {
      errors.item_name = '*Required';
    }
    if (!values.sku) {
      errors.sku = '*Required';
    }

    if (!values.article) {
      errors.article = '*Required';
    }
    if (!values.item) {
      errors.item = '*Required';
    }
    if (!values.length) {
      errors.length = '*Required';
    }
    if (!values.width) {
      errors.width = '*Required';
    }
    if (!values.height) {
      errors.height = '*Required';
    }

    if (!values.brand) {
      errors.brand = '*Required';
    }
    if (!values.manufacturer) {
      errors.manufacturer = '*Required';
    }
    if (!values.hsn_code) {
      errors.hsn_code = '*Required';
    }
    if (!values.sale_price) {
      errors.sale_price = '*Required';
    }
    if (!values.purchase_price) {
      errors.purchase_price = '*Required';
    }
    if (!values.mpn_code) {
      errors.mpn_code = '*Required';
    }
    if (!values.isbn_code) {
      errors.isbn_code = '*Required';
    }
    if (!values.gst) {
      errors.gst = '*Required';
    }
    if (!values.description) {
      errors.description = '*Required';
    }
    if (!values.colour) {
      errors.colour = '*Required';
    }
    return errors;
  };

  const {
    getFieldProps,
    errors,
    values,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: Object.assign(update, { image: null }),
    validate,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    var todayDate = new Date().toISOString().slice(0, 10);
    var newdata = {
      type: values.type,
      item_name: values.item_name,
      sku: values.sku,
      article: values.article,
      length: values.length,
      width: values.width,
      height: values.height,
      brand: values.brand,
      manufacturer: values.manufacturer,
      hsn_code: values.hsn_code,
      mpn_code: values.mpn_code,
      isbn_code: values.isbn_code,
      description: values.description,
      colour: values.colour,
      gst: values.gst,
      date: todayDate,
    };
    dispatch(updateInventory(update._id, newdata, resetForm, history));
    imgRef.current.value = '';
  };

  return (
    <form className="mt-10 mx-4 flex flex-col items-center">
      <div className="bg-white flex justify-between items-center p-4 mb-4 w-full">
        <h2 className="text-xl font-bold m-0">Create Inventory</h2>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="bg-white px-4 pt-4  pb-2 flex-1 flex flex-col">
          <lable className=" px-2 text-gray-2 mt-4 text-md font-semibold ">
            Type:
          </lable>
          <div className="flex w-full">
            <div className="px-2 flex items-center ">
              <lable className="text-gray-2 text-md font-semibold ">
                Goods
              </lable>
              <input
                name="type"
                className={`ml-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                type="radio"
                checked={values.type === 'Goods'}
                onChange={() => setFieldValue('type', 'Goods')}
              />
            </div>
            <div className="px-2 flex items-center">
              <lable className="text-gray-2 text-md font-semibold ">
                Service
              </lable>
              <input
                name="type"
                className={`ml-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                type="radio"
                checked={values.type === 'Service'}
                onChange={() => setFieldValue('type', 'Service')}
              />
            </div>
          </div>
          {errors.type ? (
            <div className="w-full text-sm text-red-400">{errors.type}</div>
          ) : null}

          <div className="px-2 mt-4 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Item Name
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter name"
              {...getFieldProps('item_name')}
            />
            {errors.item_name ? (
              <div className="w-full text-sm text-red-400">
                {errors.item_name}
              </div>
            ) : null}
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">SKU</lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="number"
              placeholder="Enter sku"
              {...getFieldProps('sku')}
            />
            {errors.sku ? (
              <div className="w-full text-sm text-red-400">{errors.sku}</div>
            ) : null}
          </div>
          <div className="px-2 flex mt-3 flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Article
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter article"
              {...getFieldProps('article')}
            />
            {errors.article ? (
              <div className="w-full text-sm text-red-400">
                {errors.article}
              </div>
            ) : null}
          </div>
          <div className="flex mt-3 flex-wrap w-full">
            <div className="flex-col flex flex-1 px-2">
              <lable className="text-gray-2 text-md font-semibold ">
                Length
              </lable>
              <input
                className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                type="number"
                placeholder="Enter length"
                {...getFieldProps('length')}
              />
              {errors.length ? (
                <div className="w-full text-sm text-red-400">
                  {errors.length}
                </div>
              ) : null}
            </div>
            <div className="flex-col flex flex-1 px-2">
              <lable className="text-gray-2 text-md font-semibold ">
                Width
              </lable>
              <input
                className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                type="number"
                placeholder="Enter width"
                {...getFieldProps('width')}
              />
              {errors.width ? (
                <div className="w-full text-sm text-red-400">
                  {errors.width}
                </div>
              ) : null}
            </div>
            <div className="flex-col flex flex-1 px-2">
              <lable className="text-gray-2 text-md font-semibold ">
                Height
              </lable>
              <input
                className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                type="number"
                placeholder="Enter height"
                {...getFieldProps('height')}
              />
              {errors.height ? (
                <div className="w-full text-sm text-red-400">
                  {errors.height}
                </div>
              ) : null}
            </div>
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">Image</lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="file"
              accept="image/png, image/jpeg"
              ref={imgRef}
              onChange={(e) => setFieldValue('image', e.target.files[0])}
            />
            {errors.image ? (
              <div className="w-full text-sm text-red-400">{errors.image}</div>
            ) : null}
          </div>
          <div className="px-2 pt-1 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">GST</lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="number"
              placeholder="Enter gst"
              {...getFieldProps('gst')}
            />
            {errors.gst ? (
              <div className="w-full text-sm text-red-400">{errors.gst}</div>
            ) : null}
          </div>
          <div className="px-2 pt-1 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">Colour</lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="Text"
              placeholder="Enter gst"
              {...getFieldProps('colour')}
            />
            {errors.colour ? (
              <div className="w-full text-sm text-red-400">{errors.colour}</div>
            ) : null}
          </div>
        </div>
        <div className="bg-white p-4 flex-1 flex flex-col">
          <div className="px-2 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">Brand</lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter brand name"
              {...getFieldProps('brand')}
            />
            {errors.brand ? (
              <div className="w-full text-sm text-red-400">{errors.brand}</div>
            ) : null}
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Manufacturer
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="text"
              placeholder="Enter manufaturer"
              {...getFieldProps('manufacturer')}
            />
            {errors.manufacturer ? (
              <div className="w-full text-sm text-red-400">
                {errors.manufacturer}
              </div>
            ) : null}
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              HSN Code
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="number"
              placeholder="Enter HSN code"
              {...getFieldProps('hsn_code')}
            />
            {errors.hsn_code ? (
              <div className="w-full text-sm text-red-400">
                {errors.hsn_code}
              </div>
            ) : null}
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Sales Price
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="number"
              placeholder="Enter sales price"
              {...getFieldProps('sale_price')}
            />
            {errors.sale_price ? (
              <div className="w-full text-sm text-red-400">
                {errors.sale_price}
              </div>
            ) : null}
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">
              Purchase Price
            </lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="number"
              placeholder="Enter purchase price"
              {...getFieldProps('purchase_price')}
            />
            {errors.purchase_price ? (
              <div className="w-full text-sm text-red-400">
                {errors.purchase_price}
              </div>
            ) : null}
          </div>
          <div className="px-2 mt-3 flex flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">MPN</lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="number"
              placeholder="Enter MPN"
              {...getFieldProps('mpn_code')}
            />
            {errors.mpn_code ? (
              <div className="w-full text-sm text-red-400">
                {errors.mpn_code}
              </div>
            ) : null}
          </div>
          <div className="px-2 flex mt-3 flex-col w-full">
            <lable className="text-gray-2 text-md font-semibold ">ISBN</lable>
            <input
              className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
              type="number"
              placeholder="Enter ISBN"
              {...getFieldProps('isbn_code')}
            />
            {errors.isbn_code ? (
              <div className="w-full text-sm text-red-400">
                {errors.isbn_code}
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full mt-3 mb-3 flex flex-col bg-white p-4">
          <lable className="text-gray-2 text-md font-semibold ">
            Description
          </lable>
          <textarea
            className={` p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
            type="text"
            placeholder="Enter description"
            {...getFieldProps('description')}
          />
          {errors.description ? (
            <div className="w-full text-sm text-red-400">
              {errors.description}
            </div>
          ) : null}
        </div>
      </div>

      <button
        onClick={(e) => handleSubmit(e)}
        className="bg-green-600 mt-3 hover:bg-green-700 px-5 py-2 text-lg rounded-md m-4 text-white"
      >
        Update Inventory
      </button>
    </form>
  );
};

export default CreateInventory;
