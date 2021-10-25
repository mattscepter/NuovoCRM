import React, { useEffect } from 'react';
import { Button, IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
import { setAlert } from '../../context/actions/errorActions';
import { getInventory } from '../../context/actions/inventoryAction/inventoryAction';

const UpdateSkuCard = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.inventory);

  const validate = (values) => {
    const errors = {};
    if (!values.sku) {
      errors.sku = '*Required';
    }
    if (!values.id) {
      errors.id = '*Required';
    }

    return errors;
  };

  const { getFieldProps, errors, values, setValues, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        id: '',
        sku: '',
      },
      validate,
    });

  let options = [];

  inventory.forEach((element) => {
    options.push({
      value: element._id,
      label: element.item_name + '(' + element.article + ')',
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('JWT');
    const user = JSON.parse(localStorage.getItem('user'));
    axiosInstance
      .patch(
        `/inventory/${values.id}/${user._id}`,
        { sku: values.sku },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setShow(false);
        dispatch(getInventory());
        resetForm();
        dispatch(
          setAlert({
            message: 'Inventory updated successfully',
            error: false,
          }),
        );
      })
      .catch((err) => {
        dispatch(
          setAlert({ message: 'Error updating inventory', error: true }),
        );
        resetForm();
      });
  };

  useEffect(() => {
    const sku = inventory?.filter((f) => f._id === values?.id)[0]?.sku;
    setValues({ ...values, sku: sku });
  }, [values.id, inventory]);

  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      }  fixed top-1/2 right-1/2 transform translate-x-1/2 z-50 -translate-y-1/2 flex justify-center items-center w-full h-full bg-black bg-opacity-20 mt-10 mx-4  `}
    >
      <div className="bg-white rounded-md shadow-2xl w-1/4 ">
        <div className="w-full flex justify-end">
          <IconButton onClick={() => setShow(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <h3 className="text-center text-xl font-semibold mb-6">Update SKU</h3>
        <div className="px-6 pb-6">
          <div>
            <div className="px-2 mt-3 flex flex-col w-full">
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
                  setFieldValue(`id`, selectedOption.value);
                }}
              />
              {errors.id ? (
                <div className="w-full text-sm text-red-400">{errors.id}</div>
              ) : null}
            </div>

            <div className="px-2 mt-3 flex flex-col w-full">
              <lable className="text-gray-2 text-md font-semibold ">SKU</lable>
              <input
                className={`p-2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                type="number"
                placeholder="Enter message"
                {...getFieldProps('sku')}
              />
              {errors.sku ? (
                <div className="w-full text-sm text-red-400">{errors.sku}</div>
              ) : null}
            </div>
          </div>
          <div className="px-2 mt-6 flex flex-col w-full">
            <Button
              onClick={(e) => {
                handleSubmit(e);
              }}
              style={{
                backgroundColor: 'rgba(16, 185, 129, var(--tw-bg-opacity))',
                color: 'white',
              }}
            >
              Update SKU
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSkuCard;
