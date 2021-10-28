import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DetailCard from '../../Components/DetailCard';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {
  deleteInventory,
  refreshInventory,
  setupdateinventory,
} from '../../context/actions/inventoryAction/inventoryAction';
import { setConfirmation } from '../../context/actions/confirmationAction';
import InventoryIcon from '@mui/icons-material/Inventory';

const InventoryDetails = () => {
  const data = useSelector((state) => state.inventory.update);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(refreshInventory(id));
  }, [dispatch, id]);

  return (
    <div className="flex w-full">
      <div className=" m-10 mr-2 w-1/4 py-10 px-20 bg-white rounded-lg"></div>
      <div className=" m-10 py-10 px-20 bg-white flex-1 rounded-lg">
        <div className="flex mb-6 items-center w-full justify-between">
          <h1 className="text-3xl font-semibold ">
            {' '}
            <span>
              <InventoryIcon fontSize="large" />
            </span>{' '}
            Inventory Details
          </h1>
          <div className="transform scale-125">
            <IconButton
              onClick={() => {
                dispatch(setupdateinventory(data));
                history.push(`/updateinventory/${data._id}`);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(
                  setConfirmation({
                    show: true,
                    text: 'Are you sure you want to delete?',
                    func: () => {
                      dispatch(deleteInventory(data._id));
                      history.push('/inventory');
                    },
                  }),
                );
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <DetailCard title="Type" detail={data.type} />
            <DetailCard title="Item Name" detail={data.item_name} />
            <DetailCard title="SKU" detail={data.sku} />
            <DetailCard title="Article" detail={data.article} />
            <DetailCard
              title="Dimension"
              detail={`${data.length}*${data.width}*${data.height}`}
            />
            <DetailCard title="Colour" detail={data.colour} />
            <DetailCard title="Brand" detail={data.brand} />
            <DetailCard title="Manufacturer" detail={data.manufacturer} />
          </div>
          <div className="w-1/2">
            <DetailCard title="Sales Price" detail={data.sale_price} />
            <DetailCard title="GST" detail={data.gst + '%'} />
            <DetailCard title="Purchase Price" detail={data.purchase_price} />
            <DetailCard title="MPN Code" detail={data.mpn_code} />
            <DetailCard title="ISBN Code" detail={data.isbn_code} />
            <DetailCard title="HSN Code" detail={data.hsn_code} />
            <DetailCard title="Description" detail={data.description} />
            <DetailCard
              title="Date"
              detail={new Date(data.date).toDateString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDetails;
