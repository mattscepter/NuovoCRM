import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailCard from '../../Components/DetailCard';
import {
  deleteContact,
  refreshOrg,
  setupdatecontact,
} from '../../context/actions/contactAction/contactAction';
import DomainIcon from '@mui/icons-material/Domain';
import Table from '../../Components/reactTable';
import { useParams } from 'react-router';
import UpdateOrgCard from './UpdateOrgCard';
import { IconButton } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';

const OrganizationDetails = () => {
  const [show, setShow] = useState(false);
  const DATA = useSelector((state) => state.contact.selectedOrg);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(refreshOrg(id));
  }, [dispatch, id]);

  const headCells = [
    {
      accessor: 'name',
      Header: 'Name',
    },
    {
      accessor: 'phone',
      Header: 'Phone Number',
    },
    {
      accessor: 'email',
      Header: 'Email',
    },
    {
      accessor: 'department',
      Header: 'Department',
    },
    {
      accessor: 'title',
      Header: 'Title',
    },
  ];
  const columns = useMemo(() => headCells, []);
  const Customer = [];
  const notCustomer = [];

  DATA?.employees?.forEach((element) => {
    if (element.isCustomer) {
      Customer.push(element);
    } else {
      notCustomer.push(element);
    }
  });

  return (
    <div className="flex justify-center">
      <UpdateOrgCard show={show} setShow={setShow} />
      <div
        className="m-10 mr-5 p-7 py-10 bg-white rounded-lg mb-4 w-95 "
        style={{ height: 'max-content' }}
      >
        <div className="mb-10  flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-center flex items-center justify-center">
            <span className="mr-3">
              <DomainIcon fontSize="large" />
            </span>
            Organization
          </h1>
          <IconButton
            onClick={() => {
              setShow(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </div>
        <h2 className="text-2xl font-semibold text-left mb-6">{DATA?.name}</h2>
        <DetailCard title="Type" detail={DATA?.type} />
        <DetailCard title="Address" detail={DATA?.address} />
      </div>
      <div
        className="m-10 ml-2 p-7 bg-white rounded-lg mb-4 flex-1 "
        style={{ height: 'max-content' }}
      >
        {DATA?.employees?.length === 0 ? (
          <p className="text-2xl">No contact available</p>
        ) : (
          <Table
            columns={columns}
            data={DATA.employees ? DATA.employees : []}
            customer={Customer}
            not_customer={notCustomer}
            deleteFunc={deleteContact}
            update={setupdatecontact}
            path={'/updatecontact'}
            tablepath={'/contactdetail'}
            text={`Are you sure you want to delete contact? \n All leads will also be deleted.`}
            isContact={true}
            isOrg={true}
          />
        )}
      </div>
    </div>
  );
};

export default OrganizationDetails;
