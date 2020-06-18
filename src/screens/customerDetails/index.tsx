/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { MdAdd, MdRemoveCircleOutline } from 'react-icons/md';
import {
  CustomerDetailsContainer,
  BoxInfo,
  AddressTitle,
  AddressComp,
} from './styles';
import IRouteParams from './interfaces/irouteparams';
import RemoteServices from '../../domain/services/remote/remote.services';
import ICustomer from '../../domain/interfaces/icustomer';
import IAddress from './interfaces/iaddress';
import IAddressType from './interfaces/iaddress.type';
import TextArea from './text.area';
import Select from './select';
import Radio from './radio';
import { getDiff } from '../../domain/services/utils/object.utils';

let prevCustomerData = {};
const prevAddressData: IAddress[] = [];

const CustomerDetails: React.FC = () => {
  const { params } = useRouteMatch<IRouteParams>();
  const [customerData, setCustomerData] = useState<ICustomer>();
  const [addressData, setAddressData] = useState<IAddress[]>();
  const [addressType, setAddressType] = useState<IAddressType[]>();
  const [listenToChanges, setListenToChanges] = useState<boolean>(false);

  useEffect(() => {
    if (!listenToChanges) return;

    const diff = getDiff(customerData, prevCustomerData);
    prevCustomerData = customerData ? { ...customerData } : {};

    if (Object.keys(diff).length) {
      const updateCustomerData = async (): Promise<void> => {
        try {
          const response = await RemoteServices.put<ICustomer>(
            `/customer/${customerData?.id}`,
            diff,
          );
          if (response.status === 200) {
            console.log(
              'CustomerDetails',
              'updateCustomerData - Customer data updated!',
            );
            return;
          }
          const errorMessage = `error: inexpected status ${response.status}`;
          console.log('CustomerDetails', errorMessage);
        } catch (error) {
          console.log('CustomerDetails', 'api error:', error);
        }
      };
      updateCustomerData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerData, listenToChanges]);

  useEffect(() => {
    if (!listenToChanges) return;
    if (addressData)
      // eslint-disable-next-line no-restricted-syntax
      for (const address of addressData) {
        const currentPrevAddressData = prevAddressData?.find(
          (prev: IAddress) => prev.id === address.id,
        );
        if (currentPrevAddressData) {
          const diff = getDiff(address, currentPrevAddressData);
          // eslint-disable-next-line no-unused-expressions
          prevAddressData?.forEach((prev: IAddress, index: number) => {
            if (prev.id === address.id) {
              prevAddressData.splice(index, 1);
              prevAddressData.push({ ...address });
            }
          });
          if (Object.keys(diff).length) {
            const updateAddressData = async (): Promise<void> => {
              try {
                const response = await RemoteServices.put<IAddress>(
                  `/address/${address?.id}`,
                  diff,
                );
                if (response.status === 200) {
                  console.log(
                    'CustomerDetails',
                    'updateAddressData - Address data updated!',
                  );
                  // setAddressData([...addressData]);
                  return;
                }
                const errorMessage = `error: inexpected status ${response.status}`;
                console.log(
                  'CustomerDetails',
                  `updateAddressData: ${errorMessage}`,
                );
              } catch (error) {
                console.log(
                  'CustomerDetails',
                  ` updateAddressData - api error:${error}`,
                );
              }
            };
            updateAddressData();
          }
        } else prevAddressData.push({ ...address });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressData, listenToChanges]);

  const resolveCustomerDataById = async (
    id: string,
  ): Promise<ICustomer | undefined> => {
    try {
      const response = await RemoteServices.get<ICustomer>(
        `/customer/?id=${id}`,
      );
      if (response.status === 200) {
        const customer = response.data;
        return customer;
      }
      const errorMessage = `error: inexpected status ${response.status}`;
      console.log('CustomerDetails', errorMessage);
    } catch (error) {
      console.log('CustomerDetails', 'api error:', error);
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
      console.log('CustomerDetails', errorMessage);
    } catch (error) {
      console.log('CustomerDetails', 'api error:', error);
    }
    return undefined;
  };

  const getAddressTypes = async (): Promise<IAddressType[] | undefined> => {
    try {
      const response = await RemoteServices.get<IAddressType[]>(
        '/address/types',
      );
      if (response.status === 200) {
        const addressTypes = response.data;
        return addressTypes;
      }
      const errorMessage = `error: inexpected status ${response.status}`;
      console.log('CustomerDetails', errorMessage);
    } catch (error) {
      console.log('CustomerDetails', 'api error:', error);
    }
    return undefined;
  };

  const addAddress = useCallback(async () => {
    console.log('CustomerDetails', 'addAddress');
    try {
      const response = await RemoteServices.post<IAddress>('/address', {
        customer_id: customerData?.id,
        priority: 2,
      });
      if (response.status === 200) {
        const address = response.data;
        console.log('CustomerDetails', `address ${address?.id} created`);
        const addressDataResult = await resolveAddressByCustomerId(
          customerData?.id,
        );
        setAddressData(addressDataResult);
        return;
      }
      const errorMessage = `error: inexpected status ${response.status}`;
      console.log('CustomerDetails', errorMessage);
    } catch (error) {
      console.log('CustomerDetails', 'api error:', error);
    }
  }, [customerData]);

  const removeAddress = useCallback(
    async (addressId) => {
      console.log('CustomerDetails', 'removeAddress');
      try {
        const response = await RemoteServices.delete<IAddress>(
          `/address/${addressId}`,
        );
        if (response.status === 200) {
          const address = response.data;
          console.log('CustomerDetails', `address ${address?.id} deleted`);
          const addressDataResult = await resolveAddressByCustomerId(
            customerData?.id,
          );
          setAddressData(addressDataResult);
          return;
        }
        const errorMessage = `error: inexpected status ${response.status}`;
        console.log('CustomerDetails', errorMessage);
      } catch (error) {
        console.log('CustomerDetails', 'api error:', error);
      }
    },
    [customerData],
  );

  useEffect(() => {
    console.log('CustomerDetails', 'params updated');

    const init = async () => {
      const customerDataResult = await resolveCustomerDataById(params?.id);
      setCustomerData(customerDataResult);

      const getAddressTypesResult = await getAddressTypes();
      setAddressType(getAddressTypesResult);

      const addressDataResult = await resolveAddressByCustomerId(
        customerDataResult?.id,
      );
      setAddressData(addressDataResult);

      setListenToChanges(true);
    };
    init();
  }, [params]);

  // mount
  useEffect(() => {
    console.log('CustomerDetails', 'awake');
  }, []);

  // unmount
  useEffect(() => {
    return () => {
      console.log('CustomerDetails', 'destroy');
      prevCustomerData = {};
    };
  }, []);

  return (
    <>
      <TextArea
        data={customerData}
        setData={setCustomerData}
        dataPropName="name"
      />
      <TextArea
        data={customerData}
        setData={setCustomerData}
        dataPropName="cpf"
        styles={{ fontSize: 24, color: '#ccc' }}
      />
      <CustomerDetailsContainer>
        <section>
          <BoxInfo>
            <span>email</span>
            <TextArea
              data={customerData}
              setData={setCustomerData}
              dataPropName="email"
              styles={{ fontSize: 18, color: 'inherit' }}
            />
          </BoxInfo>
          <BoxInfo>
            <span>phone</span>
            <TextArea
              data={customerData}
              setData={setCustomerData}
              dataPropName="phone"
              styles={{ fontSize: 18, color: 'inherit' }}
            />
          </BoxInfo>
        </section>

        <AddressTitle>Addresses</AddressTitle>
        {addressData
          ?.sort((a: IAddress, b: IAddress) => {
            if (a.priority < b.priority) return -1;
            if (a.priority > b.priority) return 1;
            return 0;
          })
          ?.map((item) => (
            <AddressComp key={item?.id} priority={item?.priority}>
              <Radio data={addressData} setData={setAddressData} item={item} />
              <button
                id="removeaddress"
                type="button"
                onClick={() => removeAddress(item?.id)}
              >
                <MdRemoveCircleOutline size={26} />
              </button>
              <section className="row">
                <BoxInfo>
                  <span>street</span>
                  <TextArea
                    data={addressData}
                    dataItem={item}
                    setData={setAddressData}
                    dataPropName="street"
                    styles={{ fontSize: 14, color: '#333' }}
                    upperCase
                  />
                </BoxInfo>
                <BoxInfo className="small">
                  <span>number</span>
                  <TextArea
                    data={addressData}
                    dataItem={item}
                    setData={setAddressData}
                    dataPropName="number"
                    styles={{ fontSize: 14, color: '#333' }}
                    upperCase
                  />
                </BoxInfo>
              </section>
              <section className="row">
                <BoxInfo>
                  <span>details</span>
                  <TextArea
                    data={addressData}
                    dataItem={item}
                    setData={setAddressData}
                    dataPropName="details"
                    styles={{ fontSize: 14, color: '#333' }}
                    upperCase
                  />
                </BoxInfo>
                <BoxInfo className="small" id="type">
                  <span>type</span>
                  <Select
                    data={addressData}
                    setData={setAddressData}
                    types={addressType}
                    item={item}
                  />
                </BoxInfo>
              </section>
              <section className="row">
                <BoxInfo>
                  <span>city</span>
                  <TextArea
                    data={addressData}
                    dataItem={item}
                    setData={setAddressData}
                    dataPropName="city"
                    styles={{ fontSize: 14, color: '#333' }}
                    upperCase
                  />
                </BoxInfo>
                <BoxInfo>
                  <span>state</span>
                  <TextArea
                    data={addressData}
                    dataItem={item}
                    setData={setAddressData}
                    dataPropName="state"
                    styles={{ fontSize: 14, color: '#333' }}
                    upperCase
                  />
                </BoxInfo>
              </section>
              <section className="row">
                <BoxInfo>
                  <span>zipCode</span>
                  <TextArea
                    data={addressData}
                    dataItem={item}
                    setData={setAddressData}
                    dataPropName="zipCode"
                    styles={{ fontSize: 14, color: '#333' }}
                    upperCase
                  />
                </BoxInfo>
                <BoxInfo>
                  <span>country</span>
                  <TextArea
                    data={addressData}
                    dataItem={item}
                    setData={setAddressData}
                    dataPropName="country"
                    styles={{ fontSize: 14, color: '#333' }}
                    upperCase
                  />
                </BoxInfo>
              </section>
            </AddressComp>
          ))}
        <button id="addaddress" type="button" onClick={() => addAddress()}>
          <MdAdd size={32} />
        </button>
      </CustomerDetailsContainer>
    </>
  );
};

export default CustomerDetails;
