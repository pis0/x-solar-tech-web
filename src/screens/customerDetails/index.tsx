/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
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

const CustomerDetails: React.FC = () => {
  const { params } = useRouteMatch<IRouteParams>();
  const [customerData, setCustomerData] = useState<ICustomer>();
  const [addressData, setAddressData] = useState<IAddress[]>();
  const [addressType, setAddressType] = useState<IAddressType[]>();

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
        {addressData?.map((item) => (
          <AddressComp key={item?.id} priority={item?.priority}>
            <Radio data={addressData} setData={setAddressData} item={item} />
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
      </CustomerDetailsContainer>
    </>
  );
};

export default CustomerDetails;
