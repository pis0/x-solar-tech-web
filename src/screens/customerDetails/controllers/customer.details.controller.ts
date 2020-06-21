/* eslint-disable @typescript-eslint/no-explicit-any */
import * as H from 'history';
import ICustomer from '../../../domain/interfaces/icustomer';
import RemoteServices from '../../../domain/services/remote/remote.services';
import IAddress from '../interfaces/iaddress';
import IAddressType from '../interfaces/iaddress.type';
import { log } from '../../../domain/utils/logger.utils';

const resolveCustomerDataById = async (
  id: string,
): Promise<ICustomer | undefined> => {
  try {
    const response = await RemoteServices.get<ICustomer>(`/customer/?id=${id}`);
    if (response.status === 200) {
      const customer = response.data;
      return customer;
    }
    const errorMessage = `error: inexpected status ${response.status}`;
    log('CustomerDetails', errorMessage);
  } catch (error) {
    log('CustomerDetails', 'api error:', error);
  }
  return undefined;
};

const resolveAddressByCustomerId = async (
  customerId: string | undefined,
): Promise<IAddress[] | undefined> => {
  try {
    const response = await RemoteServices.get<IAddress[]>(
      `/address/${customerId}`,
    );
    if (response.status === 200) {
      const addresses = response.data;
      return addresses;
    }
    const errorMessage = `error: inexpected status ${response.status}`;
    log('CustomerDetails', errorMessage);
  } catch (error) {
    log('CustomerDetails', 'api error:', error);
  }
  return undefined;
};

const getAddressTypes = async (): Promise<IAddressType[] | undefined> => {
  try {
    const response = await RemoteServices.get<IAddressType[]>('/address/types');
    if (response.status === 200) {
      const addressTypes = response.data;
      return addressTypes;
    }
    const errorMessage = `error: inexpected status ${response.status}`;
    log('CustomerDetails', errorMessage);
  } catch (error) {
    log('CustomerDetails', 'api error:', error);
  }
  return undefined;
};

const addAddress = async (
  customerData: ICustomer | undefined,
  setAddressData: React.Dispatch<React.SetStateAction<IAddress[] | undefined>>,
) => {
  log('CustomerDetails', 'addAddress');
  try {
    const response = await RemoteServices.post<IAddress>('/address', {
      customer_id: customerData?.id,
      priority: 2,
    });
    if (response.status === 200) {
      const address = response.data;
      log('CustomerDetails', `address ${address?.id} created`);
      const addressDataResult = await resolveAddressByCustomerId(
        customerData?.id,
      );
      setAddressData(addressDataResult);
      return;
    }
    const errorMessage = `error: inexpected status ${response.status}`;
    log('CustomerDetails', errorMessage);
  } catch (error) {
    log('CustomerDetails', 'api error:', error);
  }
};

const removeAddress = async (
  addressId: string,
  customerData: ICustomer | undefined,
  setAddressData: React.Dispatch<React.SetStateAction<IAddress[] | undefined>>,
) => {
  log('CustomerDetails', 'removeAddress');
  try {
    const response = await RemoteServices.delete<IAddress>(
      `/address/${addressId}`,
    );
    if (response.status === 200) {
      const address = response.data;
      log('CustomerDetails', `address ${address?.id} deleted`);
      const addressDataResult = await resolveAddressByCustomerId(
        customerData?.id,
      );
      setAddressData(addressDataResult);
      return;
    }
    const errorMessage = `error: inexpected status ${response.status}`;
    log('CustomerDetails', errorMessage);
  } catch (error) {
    log('CustomerDetails', 'api error:', error);
  }
};

const removeCustomer = async (
  customerId: string | undefined,
  history: H.History<any>,
) => {
  log('CustomerDetails', 'removeCustomer');
  try {
    const response = await RemoteServices.delete<void>(
      `/customer/${customerId}`,
    );
    if (response.status === 200) {
      log('CustomerDetails', `customer ${customerId} deleted`);
      history.goBack();
      return;
    }
    const errorMessage = `error: inexpected status ${response.status}`;
    log('CustomerDetails', errorMessage);
  } catch (error) {
    log('CustomerDetails', 'api error:', error);
  }
};

export {
  resolveCustomerDataById,
  resolveAddressByCustomerId,
  getAddressTypes,
  addAddress,
  removeAddress,
  removeCustomer,
};
