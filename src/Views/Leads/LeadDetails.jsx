import React, { useRef, useState } from 'react';
import { Button, IconButton } from '@material-ui/core';
import DetailCard from '../../Components/DetailCard';
import Quotation from '../../printable/Ouotation';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import ReactToPrint from 'react-to-print';
import OrderForm from '../../printable/OrderForm';
import axiosInstance from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import LeadItems from './LeadItems';
import { refreshContact } from '../../context/actions/contactAction/contactAction';
import { setAlert } from '../../context/actions/errorActions';
import { setConfirmation } from '../../context/actions/confirmationAction';
import { getInventory } from '../../context/actions/inventoryAction/inventoryAction';
import Invoice from '../../printable/Invoice';

const LeadDetails = ({ setShow, show, data, selectedLead }) => {
  const [button, setbutton] = useState({
    details: true,
    items: false,
    quotation: false,
    order: false,
    invoice: false,
  });

  const inventory = useSelector((state) => state.inventory.inventory);
  const DATA = useSelector((state) => state.contact.update);
  const [stage, setStage] = useState({
    stage: '',
    error: '',
  });
  const [status, setStatus] = useState({ status: '', error: '' });

  var lead = DATA?.allLeads?.filter((d) => d._id === selectedLead?._id)[0];

  const token = Cookies.get('JWT');
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  var inventorySku = [];

  selectedLead?.items?.forEach((element) => {
    var inventoryItem = inventory.filter(
      (f) => f?._id === element?.item?._id,
    )[0];
    inventorySku.push({
      _id: inventoryItem?._id,
      sku: inventoryItem?.sku,
      item_name: inventoryItem?.item_name,
      article: inventoryItem?.article,
      sale_price: inventoryItem?.sale_price,
      gst: inventoryItem?.gst,
    });
  });

  let totalAmt = 0;
  const quotationRef = useRef();
  const orderFormRef = useRef();
  const invoiceRef = useRef();

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
    margin: 10mm;
  }`;

  const dispatchOrder = () => {
    axiosInstance
      .put(
        `/dispatch-order/${lead._id}/${user._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        axiosInstance
          .put(
            `/update-stage/${lead._id}/${user._id}`,
            { stage: 'Dispatched' },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((res) => {
            dispatch(refreshContact(DATA._id));
            dispatch(setAlert({ message: 'Order dispatched', error: false }));
            dispatch(getInventory());
          })
          .catch((err) => {
            dispatch(
              setAlert({ message: 'Error dispatching order', error: true }),
            );
          });
        setStage({ stage: '', error: '' });
      });
  };

  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-white z-40 shadow-2xl w-3/4 h-3/4 drop-shadow-2xl p-4`}
    >
      <div className="h-full">
        <div className="w-full flex justify-between ">
          <div
            className={`${
              lead?.status === 'Active'
                ? 'bg-green-500'
                : lead?.status === 'Cancelled'
                ? 'bg-red-500'
                : 'bg-blue-500'
            } bg-gray-200 p-2 rounded-md`}
          >
            <p className="text-lg font-semibold ">
              Stage: <span className="font-medium">{lead?.stage}</span>
            </p>
            <p className="text-lg font-semibold">
              Status: <span className="font-medium">{lead?.status}</span>
            </p>
          </div>
          <div>
            <IconButton
              onClick={() => {
                setShow(false);
                setbutton({
                  details: true,
                  items: false,
                  quotation: false,
                  order: false,
                  invoice: false,
                });
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className="flex justify-center flex-col">
          <div className="w-full flex justify-center">
            <div className="p-2 border-b-2 w-max border-blue-300">
              <Button
                style={{
                  textTransform: 'capitalize',
                  fontSize: '20px',
                  color: `${button.details ? '#54a3ff' : 'black'}`,
                  fontWeight: `${button.details ? '600' : '500'}`,
                }}
                onClick={() => {
                  setbutton({
                    details: true,
                    items: false,
                    quotation: false,
                    order: false,
                    invoice: false,
                  });
                }}
              >
                Details
              </Button>
              <Button
                style={{
                  textTransform: 'capitalize',
                  fontSize: '20px',
                  color: `${button.items ? '#54a3ff' : 'black'}`,
                  fontWeight: `${button.items ? '600' : '500'}`,
                }}
                onClick={() => {
                  setbutton({
                    details: false,
                    items: true,
                    quotation: false,
                    order: false,
                    invoice: false,
                  });
                }}
              >
                Items
              </Button>
              <Button
                style={{
                  textTransform: 'capitalize',
                  fontSize: '20px',
                  color: `${button.quotation ? '#54a3ff' : 'black'}`,
                  fontWeight: `${button.quotation ? '600' : '500'}`,
                }}
                onClick={() => {
                  setbutton({
                    details: false,
                    items: false,
                    quotation: true,
                    order: false,
                    invoice: false,
                  });
                }}
              >
                Quotation
              </Button>
              <Button
                style={{
                  textTransform: 'capitalize',
                  fontSize: '20px',
                  color: `${button.order ? '#54a3ff' : 'black'}`,
                  fontWeight: `${button.order ? '600' : '500'}`,
                }}
                onClick={() => {
                  setbutton({
                    details: false,
                    quotation: false,
                    items: false,
                    order: true,
                    invoice: false,
                  });
                }}
              >
                Order Form
              </Button>
              <Button
                style={{
                  textTransform: 'capitalize',
                  fontSize: '20px',
                  color: `${button.invoice ? '#54a3ff' : 'black'}`,
                  fontWeight: `${button.invoice ? '600' : '500'}`,
                }}
                onClick={() => {
                  setbutton({
                    details: false,
                    quotation: false,
                    items: false,
                    order: false,
                    invoice: true,
                  });
                }}
              >
                Invoice
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full h-5/6 overflow-auto">
          {button.details ? (
            <div className="ml-20 m-4">
              <div>
                <DetailCard title="Title" detail={lead?.title} />
                <DetailCard title="Type" detail={data?.type} />
                <DetailCard title="No. of items" detail={lead?.items?.length} />
                <DetailCard title="Description" detail={data?.description} />
              </div>
              <div className="mt-6">
                <div className="flex place-items-end">
                  <div className="flex flex-col w-1/2">
                    <lable className="text-gray-2 text-md font-semibold ">
                      Update stage
                    </lable>
                    <div className="flex items-center w-full">
                      <select
                        className={`p-2 w-3/4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                        name=""
                        id=""
                        value={stage.stage}
                        onChange={(e) =>
                          setStage({ stage: e.target.value, error: '' })
                        }
                      >
                        <option
                          value=""
                          selected
                          style={{ color: 'lightgray' }}
                        >
                          Select stage
                        </option>
                        <option value="Preliminary">Preliminary</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Converted">Converted</option>
                        <option value="Quotation">Quotation</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Order Form">Order Form</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Invoice">Invoice</option>
                      </select>
                      <Button
                        onClick={() => {
                          if (stage.stage === '') {
                            setStage({ stage: '', error: '*Required' });
                          } else {
                            if (stage.stage === 'Dispatched') {
                              dispatch(
                                setConfirmation({
                                  show: true,
                                  func: dispatchOrder,
                                  text: 'Are you sure you want to dispatch order?',
                                }),
                              );
                            } else if (
                              stage.stage === 'Invoice' &&
                              lead?.stage !== 'Dispatched'
                            ) {
                              dispatch(
                                setAlert({
                                  message: 'Order not dispatched yet!!!',
                                  error: true,
                                }),
                              );
                            } else {
                              axiosInstance
                                .put(
                                  `/update-stage/${lead._id}/${user._id}`,
                                  { stage: stage.stage },
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  },
                                )
                                .then((res) => {
                                  dispatch(refreshContact(DATA._id));
                                  setStage({ stage: '', error: '' });
                                });
                            }
                          }
                        }}
                        style={{
                          backgroundColor: '#54a3ff',
                          color: 'white',
                          textTransform: 'capitalize',
                          marginBottom: '2px',
                          marginLeft: '8px',
                        }}
                      >
                        Update Stage
                      </Button>
                    </div>
                    {stage.error ? (
                      <div className="w-full text-sm text-red-400">
                        {stage.error}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex place-items-end">
                  <div className="flex mt-3 flex-col w-1/2">
                    <lable className="text-gray-2 text-md font-semibold ">
                      Update status
                    </lable>
                    <div className="flex items-center w-full">
                      <select
                        className={`p-2 w-3/4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                        name=""
                        id=""
                        value={status.status}
                        onChange={(e) =>
                          setStatus({ status: e.target.value, error: '' })
                        }
                      >
                        <option
                          value=""
                          selected
                          style={{ color: 'lightgray' }}
                        >
                          Select status
                        </option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <Button
                        onClick={() => {
                          if (status.status === '') {
                            setStatus({ status: '', error: '*Required' });
                          } else {
                            axiosInstance
                              .put(
                                `/update-status/${lead._id}/${user._id}`,
                                { status: status.status },
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                },
                              )
                              .then((res) => {
                                dispatch(refreshContact(DATA._id));
                                setStatus({ status: '', error: '' });
                              });
                          }
                        }}
                        style={{
                          backgroundColor: '#54a3ff',
                          color: 'white',
                          textTransform: 'capitalize',
                          marginBottom: '2px',
                          marginLeft: '8px',
                        }}
                      >
                        Update Status
                      </Button>
                    </div>
                    {status.error ? (
                      <div className="w-full text-sm text-red-400">
                        {status.error}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {button.items ? <LeadItems data={lead} leadId={DATA._id} /> : null}
          {button.quotation ? (
            <div className="m-4">
              {lead?.stage === 'Preliminary' ||
              lead?.stage === 'Qualified' ||
              lead?.stage === 'Converted' ? (
                <div className="w-full justify-center flex">
                  <Button
                    onClick={() => {
                      axiosInstance
                        .put(
                          `/update-stage/${lead._id}/${user._id}`,
                          { stage: 'Quotation' },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          },
                        )
                        .then((res) => {
                          dispatch(refreshContact(DATA._id));
                        });
                    }}
                    style={{
                      backgroundColor: '#54a3ff',
                      color: 'white',
                      textTransform: 'capitalize',
                      marginBottom: '10px',
                    }}
                  >
                    Create Quotation
                  </Button>
                </div>
              ) : (
                <div>
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
                    content={() => quotationRef.current}
                  />

                  <Quotation componentRef={quotationRef} lead={lead} />
                  <div>
                    <table>
                      <tr>
                        <th colSpan="5">User Information</th>
                      </tr>
                      <tr>
                        <td colSpan="3">
                          Name: <span>{DATA?.name}</span>
                        </td>
                        <td colSpan="3">
                          Phone No: <span>{DATA?.phone}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="5">
                          Address:{' '}
                          <span>
                            {DATA?.street +
                              ', ' +
                              DATA?.city +
                              ', ' +
                              DATA?.state +
                              ', ' +
                              DATA?.country +
                              ', ' +
                              DATA?.zipcode}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="5">
                          Email: <span>{DATA?.email}</span>
                        </td>
                      </tr>
                      <tr>
                        <th colSpan="5">Order Information</th>
                      </tr>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>GST</th>
                        <th>Amount</th>
                      </tr>
                      {lead?.items?.map((item) => {
                        let gst = inventory.filter(
                          (f) => f._id === item?.item?._id,
                        )[0]?.gst;
                        let amt =
                          item?.quantity *
                          item?.item?.sale_price *
                          (1 + gst / 100);
                        totalAmt += amt;
                        return (
                          <tr>
                            <td>{item?.item?.item_name}</td>
                            <td>{item?.quantity}</td>
                            <td>
                              ₹
                              {item?.updatedSalePrice > 0
                                ? item?.updatedSalePrice
                                : item?.item?.sale_price}
                            </td>
                            <td>{gst}%</td>
                            <td>₹{amt}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <th colSpan="4">Total</th>
                        <td>₹{totalAmt}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : null}
          {button.order ? (
            <div className="m-4">
              {!(
                lead?.stage === 'Preliminary' ||
                lead?.stage === 'Qualified' ||
                lead?.stage === 'Converted' ||
                lead?.stage === 'Quotation' ||
                lead?.stage === 'Negotiation'
              ) ? (
                <>
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
                    content={() => orderFormRef.current}
                  />
                  <OrderForm componentRef={orderFormRef} lead={lead} />
                  <table>
                    <tbody>
                      <tr>
                        <th>Article No.</th>
                        <th>Colour</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                      </tr>
                      {lead.items.map((item, index) => {
                        let inven = inventory.filter(
                          (f) => f._id === item?.item?._id,
                        )[0];
                        let amt =
                          item?.quantity *
                          item?.item?.sale_price *
                          (1 + inven?.gst / 100);
                        totalAmt += amt;
                        return (
                          <tr>
                            <td>{inven?.article}</td>
                            <td>{inven?.colour}</td>
                            <td>
                              {inven?.length +
                                '*' +
                                inven?.width +
                                '*' +
                                inven?.height}
                            </td>
                            <td>{item?.quantity}</td>
                            <td>
                              ₹
                              {item?.updatedSalePrice > 0
                                ? item?.updatedSalePrice
                                : item?.item?.sale_price}
                            </td>
                            <td>₹{amt}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <th colSpan="5">
                          <p className="text-right">Total</p>
                        </th>
                        <td>₹{totalAmt}</td>
                      </tr>
                    </tbody>
                  </table>
                </>
              ) : (
                <>
                  <div className="w-full flex justify-center">
                    <Button
                      onClick={() => {
                        axiosInstance
                          .put(
                            `/update-stage/${lead._id}/${user._id}`,
                            { stage: 'Order Form' },
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            },
                          )
                          .then((res) => {
                            dispatch(refreshContact(DATA._id));
                          });
                      }}
                      style={{
                        backgroundColor: '#54a3ff',
                        color: 'white',
                        textTransform: 'capitalize',
                        marginBottom: '10px',
                      }}
                    >
                      Generate order form
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : null}
          {button.invoice ? (
            <div className="m-4">
              {lead?.stage !== 'Invoice' ? (
                <div className="w-full justify-center flex">
                  <Button
                    onClick={() => {
                      if (lead.stage === 'Dispatched') {
                        axiosInstance
                          .put(
                            `/update-stage/${lead._id}/${user._id}`,
                            { stage: 'Invoice' },
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            },
                          )
                          .then((res) => {
                            dispatch(refreshContact(DATA._id));
                          });
                        axiosInstance
                          .put(
                            `/update-status/${lead._id}/${user._id}`,
                            { status: 'Completed' },
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            },
                          )
                          .then((res) => {
                            dispatch(refreshContact(DATA._id));
                          });
                      } else {
                        dispatch(
                          setConfirmation({
                            text: 'Order not dispatched yet. Dispatch and generate invoice',
                            show: true,
                            func: () => {
                              axiosInstance
                                .put(
                                  `/dispatch-order/${lead._id}/${user._id}`,
                                  {},
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  },
                                )
                                .then((res) => {
                                  dispatch(refreshContact(DATA._id));
                                  axiosInstance
                                    .put(
                                      `/update-stage/${lead._id}/${user._id}`,
                                      { stage: 'Invoice' },
                                      {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      },
                                    )
                                    .then((res) => {
                                      dispatch(refreshContact(DATA._id));
                                    });
                                  axiosInstance
                                    .put(
                                      `/update-status/${lead._id}/${user._id}`,
                                      { status: 'Completed' },
                                      {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      },
                                    )
                                    .then((res) => {
                                      dispatch(refreshContact(DATA._id));
                                    });
                                  dispatch(
                                    setAlert({
                                      message: 'Order dispatched',
                                      error: false,
                                    }),
                                  );
                                  dispatch(getInventory());
                                })
                                .catch((err) => {
                                  dispatch(
                                    setAlert({
                                      message: 'Error dispatching order',
                                      error: true,
                                    }),
                                  );
                                });
                            },
                          }),
                        );
                      }
                    }}
                    style={{
                      backgroundColor: '#54a3ff',
                      color: 'white',
                      textTransform: 'capitalize',
                      marginBottom: '10px',
                    }}
                  >
                    Create Invoice
                  </Button>
                </div>
              ) : (
                <div>
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
                    content={() => invoiceRef.current}
                  />

                  <Invoice componentRef={invoiceRef} lead={lead} />
                  <div>
                    <table>
                      <tr>
                        <th colSpan="5">User Information</th>
                      </tr>
                      <tr>
                        <td colSpan="3">
                          Name: <span>{DATA?.name}</span>
                        </td>
                        <td colSpan="3">
                          Phone No: <span>{DATA?.phone}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="5">
                          Address:{' '}
                          <span>
                            {DATA?.street +
                              ', ' +
                              DATA?.city +
                              ', ' +
                              DATA?.state +
                              ', ' +
                              DATA?.country +
                              ', ' +
                              DATA?.zipcode}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="5">
                          Email: <span>{DATA?.email}</span>
                        </td>
                      </tr>
                      <tr>
                        <th colSpan="5">Order Information</th>
                      </tr>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>GST</th>
                        <th>Amount</th>
                      </tr>
                      {lead?.items?.map((item) => {
                        let gst = inventory.filter(
                          (f) => f._id === item?.item?._id,
                        )[0]?.gst;
                        let amt =
                          item?.quantity *
                          item?.item?.sale_price *
                          (1 + gst / 100);
                        totalAmt += amt;
                        return (
                          <tr>
                            <td>{item?.item?.item_name}</td>
                            <td>{item?.quantity}</td>
                            <td>
                              ₹
                              {item?.updatedSalePrice > 0
                                ? item?.updatedSalePrice
                                : item?.item?.sale_price}
                            </td>
                            <td>{gst}%</td>
                            <td>₹{amt}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <th colSpan="4">Total</th>
                        <td>₹{totalAmt}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="ml-2 mt-4"></div>
    </div>
  );
};

export default LeadDetails;
