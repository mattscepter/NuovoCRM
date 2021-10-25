import React, { useEffect, useState } from 'react';
import LeadsChart from '../../Components/LeadsChart';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import DashboardFollowUp from './DashboardFollowUp';
import EventIcon from '@mui/icons-material/Event';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DomainIcon from '@mui/icons-material/Domain';
import ContactsIcon from '@mui/icons-material/Contacts';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [followUp, setFollowUp] = useState([]);
  const contact = useSelector((state) => state.contact.contact);
  const org = useSelector((state) => state.contact.organizations);
  const refreshFollowUp = useSelector((state) => state.contact.followUp);
  const [fupFilter, setFupFilter] = useState('Today');
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
  let cancelled = 0;
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
      } else if (element.status === 'Cancelled') {
        cancelled++;
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
      <div className="w-full bg-white p-6 rounded-lg">
        <h2 className="text-3xl font-semibold">Dashboard</h2>
      </div>

      <div className="w-full flex justify-between mt-5">
        <div className="w-full flex flex-col flex-1 items-center ">
          <div className="w-full flex mb-4">
            <div className=" bg-green-400 mr-2 rounded-lg w-full h-32 flex flex-col justify-center items-center p-6">
              <p className="text-2xl flex items-center">
                <ThumbUpAltIcon fontSize="large" />
                <span className="ml-3">Closed Leads</span>
              </p>
              <p className="text-2xl">{completed}</p>
            </div>
            <div className=" bg-yellow-400 mr-2 rounded-lg w-full h-32 flex flex-col justify-center items-center p-6">
              <p className="text-2xl flex items-center">
                <AccessTimeFilledIcon fontSize="large" />
                <span className="ml-3">Pending Leads</span>
              </p>
              <p className="text-2xl">{totalLeads - completed - cancelled}</p>
            </div>
          </div>
          <div className="w-full flex mb-4">
            <div className=" bg-red-400 mr-2 rounded-lg w-full h-32 flex flex-col justify-center items-center p-6">
              <p className="text-2xl flex items-center">
                <PersonOffIcon fontSize="large" />
                <span className="ml-3">Rejected Leads</span>
              </p>
              <p className="text-2xl">{cancelled}</p>
            </div>
            <div className=" bg-blue-400 mr-2 rounded-lg w-full h-32 flex flex-col justify-center items-center p-6">
              <p className="text-2xl flex items-center">
                <ListAltIcon fontSize="large" />
                <span className="ml-3">All Leads</span>
              </p>
              <p className="text-2xl">{totalLeads}</p>
            </div>
          </div>
          <div className="w-full flex">
            <div className=" bg-purple-400 mr-2 rounded-lg w-full h-32 flex flex-col justify-center items-center p-6">
              <p className="text-2xl flex items-center">
                <DomainIcon fontSize="large" />
                <span className="ml-3">Total Organizations</span>
              </p>
              <p className="text-2xl">{org.length}</p>
            </div>
            <div className="bg-purple-400  mr-2 rounded-lg w-full h-32 flex flex-col justify-center items-center p-6">
              <p className="text-2xl flex items-center">
                <ContactsIcon fontSize="large" />
                <span className="ml-3">Total Contacts</span>
              </p>
              <p className="text-2xl">{contact.length}</p>
            </div>
          </div>

          {/* <h2 className="text-xl my-4">Leads This Year</h2> */}
          {/* <LeadsChart leads={leads} /> */}
        </div>
        <div className=" max-h-lead w-full flex flex-col flex-1 items-center bg-white rounded-lg">
          <div className="flex my-3 justify-between w-full px-4">
            <h2 className="text-2xl ml-4 w-max">
              Follow Ups today <EventIcon />
            </h2>
            <div className="w-1/2 flex items-center justify-end">
              <select
                className={`p-2 w-3/4 py-1 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                name=""
                id=""
                value={fupFilter}
                onChange={(e) => setFupFilter(e.target.value)}
              >
                <option value="Today" selected>
                  Today
                </option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="Missed">Missed</option>
              </select>
            </div>
          </div>
          <div className="h-68 w-full px-4 overflow-auto">
            {followUp?.map((fup) => {
              const detail = contact?.filter(
                (f) => f._id === fup?.contactId,
              )[0];
              return (
                <>
                  <DashboardFollowUp
                    name={detail}
                    fupFilter={fupFilter}
                    fup={fup}
                  />
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
