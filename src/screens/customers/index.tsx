/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdAdd, MdWarning } from 'react-icons/md';
import {
  Form,
  CustomerList,
  CustomerItem,
  FormIcon,
  NoResults,
  AddCustomerButton,
} from './styles';
import ICustomer from '../../domain/interfaces/icustomer';
import {
  getClientsFromApi,
  inputOnChange,
  addCustomer,
  customerHasPendingReg,
} from './controllers/customers.controller';
import { log } from '../../domain/utils/logger.utils';

const Customers: React.FC = () => {
  const history = useHistory();

  const [resultError, setResultError] = useState<string | undefined>(undefined);
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('xsolartechweb:inputValue') ?? '',
  );
  const [clients, setClients] = useState<ICustomer[]>([]);
  const [showAddCustomerButton, setShowAddCustomerButton] = useState<boolean>(
    true,
  );

  useEffect(() => {
    log('Customers', 'clients was updated');
    const flag = clients?.length
      ? clients?.filter(
          (client) =>
            !client?.name || !client?.cpf || !client?.email || !client?.phone,
        )?.length === 0
      : true;
    setShowAddCustomerButton(!inputValue?.length && flag);
  }, [clients, inputValue]);

  useEffect(() => {
    log('Customers', 'inputValue was updated');
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

      <CustomerList>
        {clients?.map((client) => (
          <CustomerItem
            pendingReg={customerHasPendingReg(clients, client.id)}
            key={client.id}
          >
            <Link to={`/customers/details/${client.id}`}>
              <strong>{client?.name ?? 'NAME'}</strong>
              <span>{client?.cpf ?? 'cpf'}</span>
              <MdWarning size={20} />
            </Link>
          </CustomerItem>
        ))}
      </CustomerList>

      {resultError !== null && <NoResults>{resultError}</NoResults>}

      {showAddCustomerButton && (
        <AddCustomerButton onClick={() => addCustomer(history)}>
          <MdAdd size={32} />
        </AddCustomerButton>
      )}
    </>
  );
};

export default Customers;
