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
  refreshContact,
  setupdatecontact,
} from '../../context/actions/contactAction/contactAction';
import { deleteContact } from '../../context/actions/contactAction/contactAction';
import LeadList from '../Leads/LeadList';
import LeadDetails from '../Leads/LeadDetails';
import CreateLeadCard from '../Leads/CreateLeadCard';
import { setConfirmation } from '../../context/actions/confirmationAction';
import axiosInstance from '../../utils/axiosInstance';
import Cookies from 'js-cookie';

const DetailCard = ({ title, detail }) => {
  return (
    <div className="flex items-center justify-center w-max">
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
  const refreshFollowUp = useSelector((state) => state.contact.followUp);

  const token = Cookies.get('JWT');
  const user = JSON.parse(localStorage.getItem('user'));

  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [selectedLead, setSelectedLead] = useState({});
  const [addLead, setAddLead] = useState(false);
  const [phone, setPhone] = useState(data.phone);
  const [filter, setFilter] = useState('All');
  const [followUp, setFollowUp] = useState([]);

  useEffect(() => {
    dispatch(refreshContact(id));
  }, [dispatch, id]);

  useEffect(() => {
    axiosInstance
      .get(`/get-all-followups/${data._id}`)
      .then((res) => {
        setFollowUp(res.data);
      })
      .catch((error) => {});
  }, [data._id, refreshFollowUp]);

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

  return (
    <div className="flex h-90vh ">
      <CreateLeadCard
        addLead={addLead}
        setAddLead={setAddLead}
        phone={phone}
        id={id}
      />
      <LeadDetails
        setShow={setShowLeadDetails}
        show={showLeadDetails}
        data={data}
        selectedLead={selectedLead}
      />
      <div className="m-10 mr-5 py-10 px-10 bg-white flex-1 w-full">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl font-semibold mb-6">Contact Details</h1>
          <div>
            <Button
              onClick={() => {
                setAddLead(true);
                setPhone(data.phone);
              }}
              style={{
                backgroundColor: '#54a3ff',
                color: 'white',
                textTransform: 'capitalize',
                marginBottom: '10px',
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
                marginBottom: '10px',
              }}
            >
              Create FollowUp
            </Button>
          </div>
        </div>
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
                dispatch(setupdatecontact(data));
                history.push('/updatecontact');
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

        <table ref={componentRef}>
          <tbody>
            <tr>
              <td>
                <DetailCard title="Name" detail={data.name} />
              </td>
              <td>
                <DetailCard title="Email" detail={data.email} />
              </td>
            </tr>
            <tr>
              <td>
                <DetailCard title="Phone Number" detail={data.phone} />
              </td>
              <td>
                <DetailCard title="Whatsapp Number" detail={data.whatsapp_no} />
              </td>
            </tr>
            <tr>
              <td>
                <DetailCard title="Title" detail={data.title} />
              </td>
              <td>
                {data.company !== 'NA' ? (
                  <DetailCard title="Compnay" detail={data.company} />
                ) : (
                  ''
                )}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="text-lg">
                <p>
                  <span className="font-semibold mr-1">Address:</span>
                  {data?.street +
                    ', ' +
                    data?.city +
                    ', ' +
                    data?.state +
                    ', ' +
                    data?.country +
                    ', ' +
                    data?.zipcode}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <DetailCard title="Department" detail={data?.department} />
              </td>
              <td>
                <DetailCard
                  title="Created At"
                  detail={new Date(data?.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    day: 'numeric',
                    month: 'numeric',
                  })}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <DetailCard title="Description" detail={data?.description} />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <h2 className="text-xl font-semibold py-2 mt-6">FollowUps</h2>
          <div className="h-64 overflow-auto">
            {followUp?.map((fup) => {
              return (
                <div
                  key={fup?._id}
                  className="bg-gray-100 w-full p-4 py-3 rounded-md flex justify-between items-center mb-2 cursor-pointer"
                >
                  <p className="text-lg font-semibold">{fup?.text}</p>
                  <div className="flex items-center">
                    <p>
                      {new Date(fup?.date).toLocaleString('en-US', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <IconButton
                      onClick={() => {
                        axiosInstance
                          .delete(`/delete-followup/${fup?._id}/${user._id}`, {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          })
                          .then((res) => {
                            dispatch(
                              createFollowUp({
                                show: false,
                                phone: '',
                                fromContact: false,
                              }),
                            );
                          });
                      }}
                      style={{ padding: '4px', marginLeft: '10px' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="m-10 ml-5 py-10 px-10 bg-white flex-1 w-full">
        <div className="w-full flex items-center justify-between pb-4">
          <p className="text-xl font-semibold">All Leads</p>
          <select
            className={`p-2 w-1/2 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
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
        <div className="overflow-auto h-95">
          {data?.allLeads?.map((lead) => {
            return (
              <>
                {lead?.stage === filter ? (
                  <LeadList
                    setShow={setShowLeadDetails}
                    setSelectedLead={setSelectedLead}
                    lead={lead}
                    id={data._id}
                  />
                ) : null}
                {lead?.status === filter ? (
                  <LeadList
                    setShow={setShowLeadDetails}
                    setSelectedLead={setSelectedLead}
                    lead={lead}
                    id={data._id}
                  />
                ) : null}
                {filter === 'All' ? (
                  <LeadList
                    setShow={setShowLeadDetails}
                    setSelectedLead={setSelectedLead}
                    lead={lead}
                    id={data._id}
                  />
                ) : null}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
