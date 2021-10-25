import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import ReactToPrint from 'react-to-print';
import {
  createFollowUp,
  createleadCard,
  refreshContact,
  setupdatecontact,
} from '../../context/actions/contactAction/contactAction';
import { deleteContact } from '../../context/actions/contactAction/contactAction';
import LeadList from '../Leads/LeadList';
import LeadDetails from '../Leads/LeadDetails';
import { setConfirmation } from '../../context/actions/confirmationAction';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FollowUpList from './FollowUpList';

const DetailCard = ({ title, detail }) => {
  return (
    <div className="flex w-full">
      <p className="flex text-lg font-semibold mr-2">{title}:</p>
      <p className="text-lg">{detail}</p>
    </div>
  );
};

const ContactDetails = () => {
  const history = useHistory();
  const data = useSelector((state) => state.contact.update);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [filter, setFilter] = useState('All');
  const [button, setButton] = useState({
    lead: true,
    fup: false,
  });
  const [fupFilter, setFupFilter] = useState('Upcoming');

  const actions = [
    {
      icon: <SpeedDialIcon />,
      name: 'Lead',
      task: () => {
        dispatch(
          createleadCard({
            show: true,
            phone: data.phone,
            fromContact: true,
          }),
        );
      },
    },
    {
      icon: <SpeedDialIcon />,
      name: 'FollowUp',
      task: () => {
        dispatch(
          createFollowUp({
            show: true,
            phone: data.phone,
            fromContact: true,
          }),
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(refreshContact(id));
  }, [dispatch, id]);

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

  let quotation = 0,
    invoice = 0,
    orderForm = 0;

  data?.allLeads?.forEach((element) => {
    if (
      element.stage !== 'Preliminary' &&
      element.stage !== 'Qualified' &&
      element.stage !== 'Converted'
    ) {
      quotation++;
    }
    if (
      element.stage === 'Order Form' ||
      element.stage === 'Dispatched' ||
      element.stage === 'Invoice'
    ) {
      orderForm++;
    }
    if (element.stage === 'Invoice') {
      invoice++;
    }
  });

  return (
    <div className="flex w-full">
      <LeadDetails
        setShow={setShowLeadDetails}
        show={showLeadDetails}
        data={data}
      />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 40, right: 40 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.task}
          />
        ))}
      </SpeedDial>
      <div className="w-100">
        {/* <div className="m-10 mt-7 mr-5 p-3 rounded-lg mb-1 flex justify-end items-center">
          <Button
            onClick={() => {
              setAddLead(true);
              setPhone(data.phone);
            }}
            style={{
              backgroundColor: '#54a3ff',
              color: 'white',
              textTransform: 'capitalize',
              marginRight: '10px',
            }}
          >
            Add lead
          </Button>
          <Button
            onClick={() => {
              dispatch(
                createFollowUp({
                  show: true,
                  phone: data.phone,
                  fromContact: true,
                }),
              );
            }}
            style={{
              backgroundColor: '#54a3ff',
              color: 'white',
              textTransform: 'capitalize',
            }}
          >
            Create FollowUp
          </Button>
        </div> */}
        <div className="m-10 mr-5 p-7 py-10 bg-white rounded-lg mb-4">
          <div className="w-full mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Details</h1>
            <div>
              <IconButton
                onClick={() => {
                  dispatch(setupdatecontact(data));
                  history.push(`/updatecontact/${data._id}`);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  dispatch(
                    setConfirmation({
                      show: true,
                      text: 'Are you sure you want to delete?\n All leads will be deleted.',
                      func: () => {
                        dispatch(deleteContact(data._id));
                        history.push('/contacts');
                      },
                    }),
                  );
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
          <div className="flex items-center w-full justify-between">
            {/* <ReactToPrint
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
          /> */}
          </div>

          <div>
            <DetailCard title="Name" detail={data.name} />
            <DetailCard title="Email" detail={data.email} />
            <DetailCard title="Phone" detail={data.phone} />
            <DetailCard title="Whatsapp" detail={data.whatsapp_no} />
            <DetailCard title="Title" detail={data.title} />
            {data?.organization ? (
              <DetailCard
                title="Organization"
                detail={data?.organization?.name}
              />
            ) : (
              ''
            )}
            <DetailCard
              title="Address"
              detail={
                data?.street +
                ', ' +
                data?.city +
                ', ' +
                data?.state +
                ', ' +
                data?.country +
                ', ' +
                data?.zipcode
              }
            />
            <DetailCard title="Department" detail={data?.department} />
            <DetailCard
              title="Created At"
              detail={new Date(data?.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                day: 'numeric',
                month: 'numeric',
              })}
            />
            <DetailCard title="Description" detail={data?.description} />
          </div>
        </div>
        <div className="m-10 mr-5 p-7 bg-white rounded-lg mt-0">
          <div className="flex justify-between text-xl border-b-2 pb-1 mb-1">
            <p>Quotation</p>
            <p>{quotation}</p>
          </div>
          <div className="flex justify-between text-xl border-b-2 pb-1 mb-1">
            <p>Order Form</p>
            <p>{orderForm}</p>
          </div>
          <div className="flex justify-between text-xl ">
            <p>Invoices</p>
            <p>{invoice}</p>
          </div>
        </div>
      </div>
      <div className="m-10 ml-2 py-5 px-10 flex-1 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <div className="border-b-2 w-max border-blue-300 flex">
            <Button
              style={{
                width: 'max-content',
                textTransform: 'capitalize',
                fontSize: '20px',
                color: `${button.lead ? '#54a3ff' : 'black'}`,
                fontWeight: `${button.lead ? '600' : '500'}`,
              }}
              onClick={() => {
                setButton({
                  lead: true,
                  fup: false,
                });
              }}
            >
              Leads
            </Button>
            <Button
              style={{
                width: 'max-content',
                textTransform: 'capitalize',
                fontSize: '20px',
                color: `${button.fup ? '#54a3ff' : 'black'}`,
                fontWeight: `${button.fup ? '600' : '500'}`,
              }}
              onClick={() => {
                setButton({
                  lead: false,
                  fup: true,
                });
              }}
            >
              Follow Ups
            </Button>
          </div>
          {button.lead ? (
            <div className="w-full flex items-center justify-end">
              <select
                className={`p-2 py-1 w-1/4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                name=""
                id=""
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All" selected>
                  All
                </option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Preliminary">Preliminary</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
                <option value="Quotation">Quotation</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Order Form">Order Form</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Invoice">Invoice</option>
              </select>
            </div>
          ) : null}
          {button.fup ? (
            <div className="w-full flex items-center justify-end">
              <select
                className={`p-2 py-1 w-1/4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                name=""
                id=""
                value={fupFilter}
                onChange={(e) => setFupFilter(e.target.value)}
              >
                <option value="Upcoming" selected>
                  Upcoming
                </option>
                <option value="Today">Today</option>
                <option value="Completed">Completed</option>
                <option value="Missed">Missed</option>
              </select>
            </div>
          ) : null}
        </div>
        {button.lead ? (
          <div className="mt-4">
            <div className="overflow-auto max-h-lead">
              {data?.allLeads?.length === 0 ? (
                <p className="text-2xl mt-4 text-gray-600 ml-2">
                  No leads available
                </p>
              ) : (
                <>
                  {' '}
                  {data?.allLeads?.map((lead) => {
                    return (
                      <>
                        {lead?.stage === filter ? (
                          <LeadList
                            setShow={setShowLeadDetails}
                            lead={lead}
                            id={data._id}
                          />
                        ) : null}
                        {lead?.status === filter ? (
                          <LeadList
                            setShow={setShowLeadDetails}
                            lead={lead}
                            id={data._id}
                          />
                        ) : null}
                        {filter === 'All' ? (
                          <LeadList
                            setShow={setShowLeadDetails}
                            lead={lead}
                            id={data._id}
                          />
                        ) : null}
                      </>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        ) : null}
        {button.fup ? (
          <div className="mt-4">
            <div className="overflow-auto max-h-lead">
              {data.allFollowups?.map((fup) => {
                return (
                  <>
                    <FollowUpList fupFilter={fupFilter} fup={fup} />
                  </>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ContactDetails;
