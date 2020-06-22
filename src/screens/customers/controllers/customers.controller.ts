/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from 'react';
import * as H from 'history';
import ICustomer from '../../../domain/interfaces/icustomer';
import RemoteServices from '../../../domain/services/remote/remote.services';
import { log } from '../../../domain/utils/logger.utils';

let inputOnChangeDelay: number;

const clientListCompare = (a: ICustomer, b: ICustomer) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

const resolveClients = (
  customers: ICustomer[],
  value: string,
  setResultError: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  const toMatchName = value.toLowerCase().trimStart();
  const toMatchCpf = toMatchName.replace(/[^\d]/g, '');

  log('Customers', 'resolveClients', toMatchName, toMatchCpf);

  const filteredCustomers = customers.filter((client) =>
    toMatchCpf?.length
      ? client?.cpf?.replace(/[^\d]/g, '')?.toLowerCase()?.match(toMatchCpf)
      : client?.name?.toLowerCase()?.match(toMatchName),
  );
  const result =
    toMatchName?.length && filteredCustomers
      ? filteredCustomers.sort(clientListCompare)
      : customers;

  setResultError(
    // eslint-disable-next-line no-nested-ternary
    !customers?.length
      ? 'You currently have no customers registered.'
      : !result?.length
      ? 'No results for this search.'
      : undefined,
  );

  return result;
};

const getClientsFromApi = async (
  value: string | null,
  setClients: React.Dispatch<React.SetStateAction<ICustomer[]>>,
  setResultError: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  log('Customers', 'getClientsFromApi');

  await RemoteServices.get<ICustomer[]>('/customer/').then(
    (response) => {
      const customers = response.data;
      if (response.status === 200) {
        setClients(
          resolveClients(customers, value ?? '', setResultError) ?? [],
        );
      } else {
        const errorMessage = `error: inexpected status ${response.status}`;
        log('Customers', errorMessage);
        setResultError(errorMessage);
      }
    },
    (error) => {
      log('Customers', 'api error:', error);
      setResultError(error.toString());
    },
  );
};

const inputOnChange = (
  e: ChangeEvent<HTMLInputElement>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  setClients: React.Dispatch<React.SetStateAction<ICustomer[]>>,
  setResultError: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  const result = e?.target?.value;
  setInputValue(result ?? '');
  if (inputOnChangeDelay) clearTimeout(inputOnChangeDelay);
  inputOnChangeDelay = setTimeout(async () => {
    log('Customers', 'inputOnChange - result:', result);
    await getClientsFromApi(result, setClients, setResultError);
  }, 300);
};

const addCustomer = async (history: H.History<any>) => {
  log('Customers', 'addCustomer');
  try {
    const response = await RemoteServices.post<ICustomer>('/customer', {});
    if (response.status === 200) {
      const customer = response.data;
      log('Customers', `customer ${customer?.id} created`);
      history.push(`/customers/details/${customer?.id}`);
      return;
    }
    const errorMessage = `error: inexpected status ${response.status}`;
    log('Customers', errorMessage);
  } catch (error) {
    log('Customers', 'api error:', error);
  }
};

const customerHasPendingReg = (
  clients: ICustomer[],
  customerId: string,
): boolean => {
  const flag = clients?.length
    ? clients?.filter(
        (client) =>
          client?.id === customerId &&
          (!client?.name || !client?.cpf || !client?.email || !client?.phone),
      )?.length > 0
    : true;
  return flag;
};

export { getClientsFromApi, inputOnChange, addCustomer, customerHasPendingReg };
