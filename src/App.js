import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeRoute from './Routes/HomeRoute';
import Dashboard from './Views/Dashboard/Dashboard';
import Leads from './Views/Leads/Leads';
import Message from './Views/Message/Message';
import Inventory from './Views/Inventory/Inventory';
import Contacts from './Views/Contact/Contacts';
import Organization from './Views/Organization/Organization';
import CreateLead from './Views/Leads/CreateLead';
import UpdateLead from './Views/Leads/UpdateLead';
import UpdateContact from './Views/Contact/UpdateContact';
import ContactDetail from './Views/Contact/ContactDetail';
import CreateInventory from './Views/Inventory/CreateInventory';
import UpdateInventory from './Views/Inventory/UpdateInventory';
import InventoryDetails from './Views/Inventory/InventoryDetails';
import Login from './Views/Auth/Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFromStorage } from './context/actions/authActions/authActions';
import { getInventory } from './context/actions/inventoryAction/inventoryAction';
import {
  getContact,
  getOrganization,
} from './context/actions/contactAction/contactAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confirmation from './Components/Confirmation';
import CreateFollowUpCard from './Views/Contact/CreateFollowUpCard';
import CreateLeadCard from './Views/Leads/CreateLeadCard';
import CreateContactCard from './Views/Contact/CreateContactCard';
import OrganizationDetails from './Views/Organization/OrganizationDetails';
import CreateOrgCard from './Views/Organization/CreateOrgCard';

function App() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert.alert);

  useEffect(() => {
    dispatch(getFromStorage());
    dispatch(getOrganization());
    dispatch(getInventory());
    dispatch(getContact());
  }, [dispatch]);

  useEffect(() => {
    if (alert.error === false) {
      toast.success(alert.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (alert.error === true) {
      toast.error(alert.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [alert]);

  const { show, func, text } = useSelector(
    (state) => state.confirmation.confirmation,
  );

  const followUp = useSelector((state) => state.contact.followUp);
  const leadCreate = useSelector((state) => state.contact.leadCreate);
  const contactCreate = useSelector((state) => state.contact.contactCreate);
  const orgCreate = useSelector((state) => state.contact.orgCreate);

  return (
    <div className="">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Confirmation show={show} func={func} text={text} />
      <CreateFollowUpCard
        phone={followUp.phone}
        show={followUp.show}
        fromContact={followUp.fromContact}
      />
      <CreateLeadCard
        phone={leadCreate.phone}
        show={leadCreate.show}
        fromContact={leadCreate.fromContact}
      />
      <CreateContactCard
        phone={contactCreate.phone}
        show={contactCreate.show}
        fromLead={contactCreate.fromContact}
      />
      <CreateOrgCard show={orgCreate.show} />
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/register" component={Signup} /> */}
        <HomeRoute path="/" exact component={Dashboard} />
        <HomeRoute path="/leads" exact component={Leads} />
        <HomeRoute path="/inventory" exact component={Inventory} />
        <HomeRoute path="/contacts" exact component={Contacts} />
        <HomeRoute path="/organizations" exact component={Organization} />
        <HomeRoute path="/message" exact component={Message} />

        <HomeRoute path="/createlead" exact component={CreateLead} />
        <HomeRoute path="/createinventory" exact component={CreateInventory} />

        <HomeRoute path="/updatelead" exact component={UpdateLead} />
        <HomeRoute
          path="/updateinventory/:id"
          exact
          component={UpdateInventory}
        />
        <HomeRoute path="/updatecontact/:id" exact component={UpdateContact} />

        <HomeRoute
          path="/inventorydetails/:id"
          exact
          component={InventoryDetails}
        />
        <HomeRoute path="/contactdetail/:id" exact component={ContactDetail} />
        <HomeRoute
          path="/organizationdetail/:id"
          exact
          component={OrganizationDetails}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}

export default App;
