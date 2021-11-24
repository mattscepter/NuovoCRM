import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import Table from '../../Components/reactTable';
import { useSelector } from 'react-redux';
import {
  deleteInventory,
  getInventory,
  setupdateinventory,
} from '../../context/actions/inventoryAction/inventoryAction';
import DateRangeColumnFilter from '../../utils/dateFilter';
import UpdateSkuCard from './UpdateSkuCard';

const Inventory = () => {
  const history = useHistory();

  const DATA = useSelector((state) => state.inventory.inventory);

  for (let elm of DATA) {
    elm.createdAt = new Date(elm?.createdAt).toLocaleString('en-US', {
      year: 'numeric',
      day: 'numeric',
      month: 'numeric',
    });
    elm.updatedAt = new Date(elm?.updatedAt).toLocaleString('en-US', {
      year: 'numeric',
      day: 'numeric',
      month: 'numeric',
    });
  }

  const headCells = [
    {
      accessor: 'type',
      Header: 'Type',
    },
    {
      accessor: 'item_name',
      Header: 'Item Name',
    },
    {
      accessor: 'article',
      Header: 'Article',
    },
    {
      accessor: 'sku',
      Header: 'SKU',
    },

    {
      accessor: 'brand',
      Header: 'Brand/Manufacturer',
    },
    {
      accessor: 'sale_price',
      Header: 'Sales price',
    },
    {
      accessor: 'purchase_price',
      Header: 'Purchase price',
    },
    {
      accessor: 'createdAt',
      Header: 'Created At',
      Filter: DateRangeColumnFilter,
      filter: 'dateBetween',
    },
  ];

  const columns = useMemo(() => headCells, []);
  const data = useMemo(() => DATA, [DATA]);

  const [show, setShow] = useState(false);

  return (
    <div className="mt-10 mx-4">
      <UpdateSkuCard show={show} setShow={setShow} />
      <div className="bg-white flex justify-between items-center p-4 mb-4 rounded-lg">
        <h2 className="text-xl font-bold m-0">Inventory</h2>
        <div>
          <button
            onClick={() => {
              setShow(true);
            }}
            className="bg-green-500 hover:bg-green-600 text-white p-4 py-2 mr-4 rounded-md"
          >
            Update Inventory
          </button>

          <button
            onClick={() => {
              history.push('/createinventory');
            }}
            className="bg-green-500 hover:bg-green-600 text-white p-4 py-2 rounded-md"
          >
            Create Inventory
          </button>
        </div>
      </div>

      <Table
        columns={columns}
        data={data}
        deleteFunc={deleteInventory}
        update={setupdateinventory}
        path={'/updateinventory'}
        refresh={getInventory}
        tablepath={'/inventorydetails'}
        text={'Are you sure you want to delete?'}
        isContact={false}
        isOrg={false}
      />
    </div>
  );
};

export default Inventory;
