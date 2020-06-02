import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Users from '../screens/users';
import Custumers from '../screens/customers';
import CustumerDetails from '../screens/customerDetails';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Users} />
      <Route path="/customers" exact component={Custumers} />
      <Route path="/customers/details/:id+" component={CustumerDetails} />
    </Switch>
  );
};

export default Routes;
