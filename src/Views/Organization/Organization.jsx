import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Table from '../../Components/reactTable';
import {
  createorgCard,
  deleteContact,
  getOrganization,
  setupdatecontact,
  setUpdateOrg,
} from '../../context/actions/contactAction/contactAction';
import DateRangeColumnFilter from '../../utils/dateFilter';

const Organization = () => {
  const dispatch = useDispatch();

  const DATA = useSelector((state) => state.contact.organizations);

  for (let elm of DATA) {
    elm.createdAt = new Date(elm.createdAt).toLocaleString('en-US', {
      year: 'numeric',
      day: 'numeric',
      month: 'numeric',
    });
  }

  const headCells = [
    {
      accessor: 'name',
      Header: 'Organization Name',
    },
    {
      accessor: 'type',
      Header: 'Type',
    },
    {
      accessor: 'address',
      Header: 'Address',
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

  return (
    <div>
      <div className="mt-10 mx-4">
        <div className="bg-white flex justify-between items-center p-4 mb-4 rounded-lg">
          <h2 className="text-xl font-bold m-0">Organizations</h2>
          <button
            onClick={() => {
              dispatch(createorgCard({ show: true }));
            }}
            className="bg-green-500 hover:bg-green-600 text-white p-4 py-2 rounded-md"
          >
            Create Organization
          </button>
        </div>
        <Table
          columns={columns}
          data={data}
          deleteFunc={deleteContact}
          update={setUpdateOrg}
          path={'/updatecontact'}
          refresh={getOrganization}
          tablepath={'/organizationdetail'}
          text={`Are you sure you want to delete organization? \n All leads will also be deleted.`}
          isContact={false}
          isOrg={false}
        />
      </div>
    </div>
  );
};

export default Organization;
