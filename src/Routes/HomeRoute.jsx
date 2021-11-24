import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MiniDrawer from '../Partials/NavBar';
import { useSelector } from 'react-redux';

function HomeRoute({ component: Component, ...rest }) {
  const auth = useSelector((state) => state.user.auth);

  return (
    <>
      <Route
        {...rest}
        render={(props) => (
          <>
            {auth ? (
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
