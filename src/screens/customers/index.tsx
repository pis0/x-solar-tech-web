import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import RemoteServices from '../../domain/services/remote/remote.services';
import { Title, Form, Clients, FormIcon, NoResults } from './styles';
import ICustomer from '../../domain/interfaces/icustomer';

let inputOnChangeDelay: number;

const Customers: React.FC = () => {
  const [resultError, setResultError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('xsolartechweb:inputValue') ?? '',
  );
  const [clients, setClients] = useState<ICustomer[]>([]);

  const clientListCompare = (a: ICustomer, b: ICustomer) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  };

  const resolveClients = (customers: ICustomer[], value: string) => {
    const toMatchName = value.toLowerCase().trimStart();
    const toMatchCpf = toMatchName.replace(/[^\d]/g, '');

    console.log('Customers', 'resolveClients', toMatchName, toMatchCpf);

    const result = customers
      .filter((client) =>
        toMatchCpf?.length
          ? client.cpf.replace(/[^\d]/g, '').toLowerCase().match(toMatchCpf)
          : client.name.toLowerCase().match(toMatchName),
      )
      .sort(clientListCompare);

    setResultError(!result?.length ? 'No results for this search.' : null);

    return result;
  };

  const getClientsFromApi = async (value: string | null) => {
    console.log('Customers', 'getClientsFromApi');

    await RemoteServices.get<ICustomer[]>('/customer/').then(
      (response) => {
        const customers = response.data;
        if (response.status === 200) {
          setClients(resolveClients(customers, value ?? ''));
        } else {
          const errorMessage = `error: inexpected status ${response.status}`;
          console.log('Customers', errorMessage);
          setResultError(errorMessage);
        }
      },
      (error) => {
        console.log('Customers', 'api error:', error);
        setResultError(error.toString());
      },
    );
  };

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e?.target?.value;
    setInputValue(result ?? '');
    if (inputOnChangeDelay) clearTimeout(inputOnChangeDelay);
    inputOnChangeDelay = setTimeout(async () => {
      console.log('Customers', 'inputOnChange - result:', result);
      await getClientsFromApi(result);
    }, 300);
  };

  useEffect(() => {
    console.log('Customers', 'clients was updated');
    localStorage.setItem('xsolartechweb:inputValue', inputValue);
  }, [inputValue]);

  // mount
  useEffect(() => {
    console.log('Customers', 'awake');
    const init = async () => {
      await getClientsFromApi(inputValue);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // unmount
  useEffect(() => {
    return () => {
      console.log('Customers', 'destroy');
    };
  }, []);

  return (
    <>
      <Title>Customers</Title>
      <Form hasError={!!resultError} onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="Search Clients by Name or CPF"
          value={inputValue}
          onChange={inputOnChange}
        />
        <FormIcon />
      </Form>

      <Clients>
        {clients?.map((client) => (
          <Link key={client.id} to={`/customers/details/${client.id}`}>
            <strong>{client.name}</strong>
            <span>{client.cpf}</span>
          </Link>
        ))}
      </Clients>
      {resultError !== null && <NoResults>{resultError}</NoResults>}
    </>
  );
};

export default Customers;
