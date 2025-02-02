import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth'


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        // localStorage.getItem('userlogined')
            auth.isAuthenticated()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)