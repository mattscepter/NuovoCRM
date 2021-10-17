import React, { useEffect, useState } from 'react';
import Stockchart from '../Components/StocksChart';
import LeadsChart from '../Components/LeadsChart';
import RevenueChart from '../Components/RevenueChart';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { IconButton } from '@material-ui/core';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { createFollowUp } from '../context/actions/contactAction/contactAction';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [followUp, setFollowUp] = useState([]);
  const contact = useSelector((state) => state.contact.contact);
  const refreshFollowUp = useSelector((state) => state.contact.followUp);
  const token = Cookies.get('JWT');
  const user = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();
  useEffect(() => {
    axiosInstance.get('/leads').then((res) => {
      setLeads(res.data);
    });
  }, []);
  useEffect(() => {
    axiosInstance
      .get(`/followups`)
      .then((res) => {
        setFollowUp(res.data);
      })
      .catch((error) => {});
  }, [refreshFollowUp]);

  const month = new Date().toLocaleString('en-US', {
    month: '2-digit',
  });
  const year = new Date().toLocaleString('en-US', {
    year: 'numeric',
  });

  let completed = 0;
  let totalLeads = 0;
  let customer = 0;

  leads?.forEach((element) => {
    const leadyear = new Date(element.updatedAt).toLocaleString('en-US', {
      year: 'numeric',
    });
    const leadmonth = new Date(element.updatedAt).toLocaleString('en-US', {
      month: '2-digit',
    });
    if (leadyear === year && leadmonth === month) {
      totalLeads++;
      if (element.status === 'Completed') {
        completed++;
      }
    }
  });

  contact?.forEach((element) => {
    if (element.isCustomer) {
      customer++;
    }
  });

  return (
    <div className="mt-10 mx-10">
      <div className="w-full bg-white mb-8 p-6 ">
        <h2 className="text-3xl font-semibold">Dashboard</h2>
      </div>
      <div className="flex w-full justify-between">
        <div className="bg-white p-4 w-full pl-6">
          <h2 className="text-2xl font-semibold mb-2">Leads This Month</h2>
          <p className="text-xl">
            <span className="text-xl font-semibold">Total leads: </span>
            {totalLeads}
          </p>
          <p className="text-xl">
            <span className="text-xl font-semibold">Converted leads: </span>
            {completed}
          </p>
        </div>
        <div className="bg-white p-4 w-full pl-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2">Total Customers:</h2>
          <p className="text-2xl mt-2">
            <span className="font-semibold">{customer}</span>
          </p>
        </div>
      </div>

      <div className="w-full flex justify-between mt-10">
        <div className="h-96 w-full flex flex-col flex-1 items-center bg-white mr-2 ">
          <h2 className="text-xl my-4">Leads This Year</h2>
          <LeadsChart leads={leads} />
        </div>
        <div className="h-96 w-full flex flex-col flex-1 items-center bg-white">
          <h2 className="text-xl my-4">Follow Ups today</h2>
          <div className="h-68 w-full px-4 overflow-auto">
            {followUp?.map((fup) => {
              const name = contact?.filter((f) => f._id === fup?.contactId)[0];
              return (
                <>
                  {new Date(fup?.date).toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  }) ===
                  new Date().toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  }) ? (
                    <div
                      key={fup?._id}
                      className="bg-gray-100 w-full p-4 py-3 rounded-md flex justify-between items-center mb-2 cursor-pointer"
                    >
                      <div>
                        <p className="text-lg font-medium w-3/5">{fup?.text}</p>
                        <p className="text-sm">
                          {name?.name + '(' + name?.phone + ')'}
                        </p>
                      </div>
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
                              .delete(
                                `/delete-followup/${fup?._id}/${user._id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                },
                              )
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
                  ) : null}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
