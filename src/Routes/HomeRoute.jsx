import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MiniDrawer from '../Partials/NavBar';
import Cookies from 'js-cookie';

function HomeRoute({ component: Component, ...rest }) {
  return (
    <>
      <Route
        {...rest}
        render={(props) => (
          <>
            {Cookies.get('JWT') ? (
              <MiniDrawer Component={Component} props={props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location },
                }}
              />
            )}
          </>
        )}
      />
    </>
  );
}

export default HomeRoute;
