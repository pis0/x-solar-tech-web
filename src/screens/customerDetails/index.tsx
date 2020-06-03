import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import {
  Title,
  CustomerDetailsContainer,
  BoxInfo,
  AddressTitle,
  SubTitle,
  AddressComp,
} from './styles';
import IRouteParams from './irouteparams';
import RemoteServices from '../../domain/services/remote/remote.services';
import ICustomer from '../../domain/interfaces/icustomer';
import IAddress from './iddress';

const CustomerDetails: React.FC = () => {
  const { params } = useRouteMatch<IRouteParams>();
  const [customerData, setCustomerData] = useState<ICustomer>();
  const [addressData, setAddressData] = useState<IAddress[]>();
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

  useEffect(() => {
    console.log('CustomerDetails', 'params updated');
    const init = async () => {
      const customerDataResult = await resolveCustomerDataById(params?.id);
      setCustomerData(customerDataResult);

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
      <Title>{customerData?.name}</Title>
      <SubTitle>{`(${customerData?.cpf})`}</SubTitle>
      <CustomerDetailsContainer>
        <section>
          <BoxInfo>
            <span>email</span>
            <a href="mailto:msdraco@gmail.com">MSDRACO@GMAIL.COM</a>
          </BoxInfo>
          <BoxInfo>
            <span>phone</span>
            <a href="tel:+5511991195222">+55 (11) 99119-5222</a>
          </BoxInfo>
        </section>

        <AddressTitle>Endereços</AddressTitle>
        {addressData?.map((item) => (
          <AddressComp key={item?.id} priority={item?.priority}>
            <section className="row">
              <BoxInfo>
                <span>street</span>
                <strong>{item?.street?.toUpperCase()}</strong>
              </BoxInfo>
              <BoxInfo id="small">
                <span>number</span>
                <strong>{item?.number}</strong>
              </BoxInfo>
            </section>
            <section className="row">
              <BoxInfo>
                <span>details</span>
                <strong>{(item?.details ?? ' ')?.toUpperCase()}</strong>
              </BoxInfo>
              <BoxInfo id="small">
                <span>type</span>
                <strong>2</strong>
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
