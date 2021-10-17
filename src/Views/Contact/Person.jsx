import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Table from '../../Components/reactTable';
import {
  deleteContact,
  getPersons,
  setupdatecontact,
} from '../../context/actions/contactAction/contactAction';
import DateRangeColumnFilter from '../../utils/dateFilter';

const Persons = () => {
  const history = useHistory();

  const DATA = useSelector((state) => state.contact.persons);

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
      Header: 'Name',
    },
    {
      accessor: 'phone',
      Header: 'Phone',
    },
    {
      accessor: 'email',
      Header: 'Email',
    },
    {
      accessor: 'whatsapp_no',
      Header: 'Whatsapp No.',
    },
    {
      accessor: 'department',
      Header: 'Department',
    },
    {
      accessor: 'createdAt',
      Header: 'Created At',
      Filter: DateRangeColumnFilter,
      filter: 'dateBetween',
    },
  ];
  const columns = useMemo(() => headCells, []);
  const Customer = [];
  const notCustomer = [];

  DATA.forEach((element) => {
    if (element.isCustomer) {
      Customer.push(element);
    } else {
      notCustomer.push(element);
    }
  });

  const data = useMemo(() => DATA, [DATA]);
  const customer = useMemo(() => Customer, []);
  const not_customer = useMemo(() => notCustomer, []);

  return (
    <div>
      <div className="mt-10 mx-4">
        <div className="bg-white flex justify-between items-center p-4 mb-4">
          <h2 className="text-xl font-bold m-0">Persons</h2>
          <button
            onClick={() => {
              history.push('/createcontact');
            }}
            className="bg-green-500 hover:bg-green-600 text-white p-4 py-2 rounded-md"
          >
            Create Contact
          </button>
        </div>
        <Table
          columns={columns}
          data={data}
          customer={customer}
          not_customer={not_customer}
          deleteFunc={deleteContact}
          update={setupdatecontact}
          path={'/updatecontact'}
          refresh={getPersons}
          tablepath={'/contactdetail'}
          text={`Are you sure you want to delete person? \n All leads will also be deleted.`}
          isInventory={false}
        />
      </div>
    </div>
  );
};

export default Persons;
