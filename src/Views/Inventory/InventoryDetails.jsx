import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import DetailCard from '../../Components/DetailCard';
import ReactToPrint from 'react-to-print';
import { Button, IconButton } from '@material-ui/core';
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

const InventoryDetails = () => {
  const componentRef = useRef();
  const pageStyle = `@media all {
      .page-break {
        display: none;
      }
    }
    
    @media print {
      html, body {
        height: initial !important;
        overflow: initial !important;
        -webkit-print-color-adjust: exact;
      }
    }
    
    @media print {
      .page-break {
        margin-top: 1rem;
        display: block;
        page-break-before: auto;
      }
    }
    
    @page {
      size: auto;
      margin: 15mm;
    }`;

  const data = useSelector((state) => state.inventory.update);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(refreshInventory(id));
  }, [dispatch, id]);

  return (
    <div className="flex">
      <div className=" m-10 py-10 px-20 bg-white flex-1 w-full rounded-lg">
        <h1 className="text-3xl font-semibold mb-6">Inventory Details</h1>
        <div className="flex items-center w-full justify-between">
          <ReactToPrint
            pageStyle={pageStyle}
            trigger={() => (
              <Button
                style={{
                  backgroundColor: '#54a3ff',
                  color: 'white',
                  textTransform: 'capitalize',
                  marginBottom: '10px',
                }}
              >
                Print PDF
              </Button>
            )}
            content={() => componentRef.current}
          />
          <div>
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
        <table ref={componentRef}>
          <tbody>
            <tr>
              <td>
                <DetailCard title="Type" detail={data.type} />
              </td>
              <td colSpan="2">
                <DetailCard title="Item Name" detail={data.item_name} />
              </td>
            </tr>
            <tr>
              <td>
                <DetailCard title="SKU" detail={data.sku} />
              </td>
              <td colSpan="2">
                <DetailCard title="Article" detail={data.article} />
              </td>
            </tr>
            <tr>
              <td>
                <DetailCard title="Length" detail={data.length} />
              </td>
              <td>
                <DetailCard title="Width" detail={data.width} />
              </td>
              <td>
                <DetailCard title="Height" detail={data.height} />
              </td>
            </tr>
            <tr>
              <td>
                <DetailCard title="Colour" detail={data.colour} />
              </td>
              <td>
                <DetailCard title="Brand" detail={data.brand} />
              </td>
              <td>
                <DetailCard title="Manufacturer" detail={data.manufacturer} />
              </td>
            </tr>
            <tr>
              <td>
                <DetailCard title="Sales Price" detail={data.sale_price} />
              </td>
              <td>
                <DetailCard
                  title="Purchase Price"
                  detail={data.purchase_price}
                />
              </td>
              <td>
                <DetailCard title="GST" detail={data.gst + '%'} />
              </td>
            </tr>
            <tr>
              <td>
                <DetailCard title="MPN Code" detail={data.mpn_code} />
              </td>
              <td>
                <DetailCard title="ISBN Code" detail={data.isbn_code} />
              </td>
              <td>
                <DetailCard title="HSN Code" detail={data.hsn_code} />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <DetailCard title="Description" detail={data.description} />
              </td>
              <td>
                <DetailCard
                  title="Date"
                  detail={new Date(data.date).toLocaleString('en-US', {
                    year: 'numeric',
                    day: 'numeric',
                    month: 'numeric',
                  })}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryDetails;
