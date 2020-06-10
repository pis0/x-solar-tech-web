import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import {
  CustomerDetailsContainer,
  BoxInfo,
  AddressTitle,
  AddressComp,
} from './styles';
import IRouteParams from './irouteparams';
import RemoteServices from '../../domain/services/remote/remote.services';
import ICustomer from '../../domain/interfaces/icustomer';
import IAddress from './iaddress';
import IAddressType from './iaddress.type';
import TextArea from './text.area';

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

  const addressListCompare = (a: IAddress, b: IAddress) => {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
  };

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
            {/* <a href="mailto:msdraco@gmail.com">MSDRACO@GMAIL.COM</a> */}
            <TextArea
              data={customerData}
              setData={setCustomerData}
              dataPropName="email"
              styles={{ fontSize: 18, color: 'inherit' }}
            />
          </BoxInfo>
          <BoxInfo>
            <span>phone</span>
            {/* <a href="tel:+5511991195222">+55 (11) 99119-5222</a> */}
            <TextArea
              data={customerData}
              setData={setCustomerData}
              dataPropName="phone"
              styles={{ fontSize: 18, color: 'inherit' }}
            />
          </BoxInfo>
        </section>

        <AddressTitle>Addresses</AddressTitle>
        {addressData?.sort(addressListCompare)?.map((item) => (
          <AddressComp key={item?.id} priority={item?.priority}>
            <section className="row">
              <BoxInfo>
                <span>street</span>
                <strong>{item?.street?.toUpperCase()}</strong>
              </BoxInfo>
              <BoxInfo className="small">
                <span>number</span>
                <strong>{item?.number}</strong>
              </BoxInfo>
            </section>
            <section className="row">
              <BoxInfo>
                <span>details</span>
                <strong>{(item?.details ?? ' ')?.toUpperCase()}</strong>
              </BoxInfo>
              <BoxInfo className="small">
                <span>type</span>
                <strong>
                  {addressType?.find((t) => t?.id === item?.type)?.label ?? ''}
                </strong>
              </BoxInfo>
            </section>
            <section className="row">
              <BoxInfo>
                <span>city</span>
                <strong>{item?.city?.toUpperCase()}</strong>
              </BoxInfo>
              <BoxInfo>
                <span>state</span>
                <strong>{item?.state?.toUpperCase()}</strong>
              </BoxInfo>
            </section>
            <section className="row">
              <BoxInfo>
                <span>zipCode</span>
                <strong>{item?.zipCode}</strong>
              </BoxInfo>
              <BoxInfo>
                <span>country</span>
                <strong>{item?.country?.toUpperCase()}</strong>
              </BoxInfo>
            </section>
          </AddressComp>
        ))}
      </CustomerDetailsContainer>
    </>
  );
};

export default CustomerDetails;
