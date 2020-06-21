/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Clients, FormIcon, NoResults } from './styles';
import ICustomer from '../../domain/interfaces/icustomer';
import {
  getClientsFromApi,
  inputOnChange,
} from './controllers/customers.controller';
import { log } from '../../domain/utils/logger.utils';

const Customers: React.FC = () => {
  const [resultError, setResultError] = useState<string | undefined>(undefined);
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('xsolartechweb:inputValue') ?? '',
  );
  const [clients, setClients] = useState<ICustomer[]>([]);

  useEffect(() => {
    log('Customers', 'clients was updated');
    localStorage.setItem('xsolartechweb:inputValue', inputValue);
  }, [inputValue]);

  // mount
  useEffect(() => {
    log('Customers', 'awake');
    const init = async () => {
      await getClientsFromApi(inputValue, setClients, setResultError);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // unmount
  useEffect(() => {
    return () => {
      log('Customers', 'destroy');
    };
  }, []);

  return (
    <>
      <Form hasError={!!resultError} onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="Search Customers by Name or CPF"
          value={inputValue}
          onChange={(e) =>
            inputOnChange(e, setInputValue, setClients, setResultError)
          }
        />
        <FormIcon />
      </Form>

      <Clients>
        {clients?.map((client) => (
          <Link key={client.id} to={`/customers/details/${client.id}`}>
            <strong>{client?.name ?? 'NAME'}</strong>
            <span>{client?.cpf ?? '000.000.00-00'}</span>
          </Link>
        ))}
      </Clients>
      {resultError !== null && <NoResults>{resultError}</NoResults>}
    </>
  );
};

export default Customers;
