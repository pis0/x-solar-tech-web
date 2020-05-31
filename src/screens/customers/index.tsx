import React from 'react';

import { Title, Form, Clients, FormIcon } from './styles';

const Customers: React.FC = () => {
  return (
    <>
      <Title>Customers</Title>
      <Form>
        <input placeholder="Search Clients by Name or CPF" />
        <FormIcon />
      </Form>

      <Clients>
        <a href="/customers/details">
          <strong>Maiko Stievem</strong>
          <span>050.450.309-06</span>
        </a>
      </Clients>
    </>
  );
};

export default Customers;
