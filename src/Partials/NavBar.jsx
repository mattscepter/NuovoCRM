import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Button, Menu, MenuItem } from '@material-ui/core';
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import HomeIcon from '@mui/icons-material/Home';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import MessageIcon from '@mui/icons-material/Message';
import ContactsIcon from '@mui/icons-material/Contacts';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useHistory } from 'react-router';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import EmailIcon from '@mui/icons-material/Email';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { setAlert } from '../context/actions/errorActions';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DomainIcon from '@mui/icons-material/Domain';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { createFollowUp } from '../context/actions/contactAction/contactAction';
import axiosInstance from '../utils/axiosInstance';
import CheckIcon from '@mui/icons-material/Check';

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const navOptions = [
  {
    title: 'Dashboard',
    icon: <HomeIcon style={{ fontSize: '30px' }} />,
    path: '/',
  },
  {
    title: 'All Contacts',
    icon: <ContactsIcon style={{ fontSize: '30px' }} />,
    path: '/contacts',
  },
  {
    title: 'Organization',
    icon: <DomainIcon style={{ fontSize: '30px' }} />,
    path: '/organizations',
  },
  {
    title: 'Persons',
    icon: <PersonIcon style={{ fontSize: '30px' }} />,
    path: '/persons',
  },

  {
    title: 'Inventory',
    icon: <InventoryIcon style={{ fontSize: '30px' }} />,
    path: '/inventory',
  },
  {
    title: 'Send SMS',
    icon: <MessageIcon style={{ fontSize: '30px' }} />,
    path: '/message',
  },
];

export default function MiniDrawer({ Component, props }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const user = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const followUpOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const refreshFollowUp = useSelector((state) => state.contact.followUp);
  const contact = useSelector((state) => state.contact.contact);
  const [followUp, setFollowUp] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/followups`)
      .then((res) => {
        setFollowUp(res.data);
      })
      .catch((error) => {});
  }, [refreshFollowUp]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ backgroundColor: '#54a3ff' }}
      >
        <Toolbar>
          <div className="flex justify-between w-full items-center">
            <div className="flex">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <img src={logo} alt="" className="h-16" />
            </div>
            <div className="flex items-center justify-center sm:mr-4">
              <IconButton
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={followUpOpen ? 'true' : undefined}
                onClick={handleClick}
              >
                <CircleNotificationsIcon
                  fontSize="large"
                  style={{ color: 'white' }}
                />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={followUpOpen}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                className="mt-10 ml-2"
              >
                {followUp?.map((fup) => {
                  const name = contact?.filter(
                    (f) => f._id === fup?.contactId,
                  )[0];
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
                        <MenuItem
                          style={{ width: '20vw' }}
                          onClick={handleClose}
                        >
                          <div className="w-full flex justify-between">
                            <div
                              onClick={() => {
                                history.push(`/contactdetail/${name?._id}`);
                              }}
                            >
                              <p>{fup?.text}</p>
                              <p className="text-sm">
                                {name?.name + '(' + name?.phone + ')'}
                              </p>
                            </div>
                            <IconButton
                              onClick={() => {
                                const token = Cookies.get('JWT');
                                const User = JSON.parse(
                                  localStorage.getItem('user'),
                                );
                                axiosInstance
                                  .delete(
                                    `/delete-followup/${fup?._id}/${User._id}`,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    },
                                  )
                                  .then((res) => {
                                    console.log(res);
                                    dispatch(
                                      createFollowUp({
                                        show: false,
                                        phone: '',
                                        fromContact: false,
                                      }),
                                    );
                                  });
                              }}
                            >
                              <CheckIcon />
                            </IconButton>
                          </div>
                        </MenuItem>
                      ) : null}
                    </>
                  );
                })}
              </Menu>

              <Button
                onClick={() =>
                  dispatch(
                    createFollowUp({
                      show: true,
                      phone: null,
                      fromContact: false,
                    }),
                  )
                }
                style={{
                  textTransform: 'capitalize',
                  backgroundColor: 'white ',
                  marginRight: '10px',
                }}
              >
                Create FollowUp
                <AddIcon />
              </Button>

              <Button
                onClick={() => history.push('/createlead')}
                style={{
                  textTransform: 'capitalize',
                  backgroundColor: 'white ',
                  marginRight: '10px',
                }}
              >
                Create Lead
                <AddIcon />
              </Button>
              <h2 className=" text-xs m-0 p-2">{user?.user?.name}</h2>
              <Avatar />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <div></div>
        <Divider />
        <List>
          {navOptions.map((item, index) => (
            <ListItem
              style={{ paddingTop: '10px', paddingBottom: '10px' }}
              button
              onClick={() => {
                history.push(item.path);
              }}
              key={index}
            >
              <Tooltip title={item.title}>
                <ListItemIcon style={{ paddingLeft: '5px' }}>
                  {item.icon}
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              Cookies.remove('JWT');
              localStorage.clear();
              history.push('/login');
              dispatch(
                setAlert({ message: 'Logged out successfully', error: false }),
              );
            }}
          >
            <Tooltip title="Logout">
              <ListItemIcon style={{ paddingLeft: '5px' }}>
                <LogoutIcon style={{ fontSize: '30px' }} />,
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
      </Drawer>
      <main className="mt-14 w-full">
        <Component {...props} />
      </main>
    </div>
  );
}