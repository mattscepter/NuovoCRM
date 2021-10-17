import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Table from '../../Components/reactTable';
import {
  deleteLead,
  getLead,
  selectedlead,
} from '../../context/actions/leadAction/leadActions';
import DateRangeColumnFilter from '../../utils/dateFilter';

const Leads = () => {
  const history = useHistory();
  const DATA = useSelector((state) => state.lead.leads);

  for (let elm of DATA) {
    elm.createdAt = new Date(elm.createdAt).toLocaleString('en-US', {
      year: 'numeric',
      day: 'numeric',
      month: 'numeric',
    });
    elm.updatedAt = new Date(elm.updatedAt).toLocaleString('en-US', {
      year: 'numeric',
      day: 'numeric',
      month: 'numeric',
    });
  }

  const headCells = [
    {
      accessor: 'title',
      Header: 'Title',
    },
    {
      accessor: 'name',
      Header: 'Name',
    },
    {
      accessor: 'phone',
      Header: 'Phone',
    },
    {
      accessor: 'status',
      Header: 'Lead Status',
    },
    {
      accessor: 'company',
      Header: 'Company',
    },
    {
      accessor: 'rating',
      Header: 'Rating',
    },
    {
      accessor: 'updatedAt',
      Header: 'Created At',
      Filter: DateRangeColumnFilter,
      filter: 'dateBetween',
    },
    {
      accessor: 'email',
      Header: 'Email',
    },
  ];

  const columns = useMemo(() => headCells, []);
  const data = useMemo(() => DATA, [DATA]);

  return (
    <div className="mt-10 mx-4">
      <div className="bg-white flex justify-between items-center p-3">
        <h2 className="text-2xl font-bold m-0 ml-2">Leads</h2>
        <button
          onClick={() => {
            history.push('/createlead');
          }}
          className="bg-green-500 hover:bg-green-600 text-white p-4 py-2 rounded-md"
        >
          Create Lead
        </button>
      </div>

      <Table
        columns={columns}
        data={data}
        deleteFunc={deleteLead}
        update={selectedlead}
        path="/updatelead"
        refresh={getLead}
        tablepath={'/leaddetail'}
        isLead={true}
      />
    </div>
  );
};

export default Leads;
