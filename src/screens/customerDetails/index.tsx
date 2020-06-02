import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Title } from './styles';
import IRouteParams from './irouteparams';

const CustomerDetails: React.FC = () => {
  const { params } = useRouteMatch<IRouteParams>();

  // TODO to delete
  console.log(params.id);

  return <Title>CustomerDetails</Title>;
};

export default CustomerDetails;
