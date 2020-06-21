/* eslint-disable react/jsx-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import { MdAdd, MdRemoveCircleOutline, MdArrowBack } from 'react-icons/md';
import {
  CustomerDetailsContainer,
  BoxInfo,
  AddressTitle,
  AddressComp,
  Header,
} from './styles';
import IRouteParams from './interfaces/irouteparams';
import RemoteServices from '../../domain/services/remote/remote.services';
import ICustomer from '../../domain/interfaces/icustomer';
import IAddress from './interfaces/iaddress';
import IAddressType from './interfaces/iaddress.type';
import TextArea from './text.area';
import Select from './select';
import Radio from './radio';
import { getDiff } from '../../domain/utils/object.utils';
import {
  resolveCustomerDataById,
  resolveAddressByCustomerId,
  getAddressTypes,
  addAddress,
  removeAddress,
  removeCustomer,
} from './controllers/customer.details.controller';

let prevCustomerData = {};
const prevAddressData: IAddress[] = [];

const CustomerDetails: React.FC = () => {
  const history = useHistory();

  const { params } = useRouteMatch<IRouteParams>();
  const [customerData, setCustomerData] = useState<ICustomer | undefined>();
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
      <Header>
        <Link to="/customers">
          <section id="backtouserlist">
            <MdArrowBack size={42} />
          </section>
        </Link>
        <section>
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
        </section>
        <button
          id="removecustomer"
          type="button"
          onClick={() => removeCustomer(customerData?.id, history)}
        >
          <MdRemoveCircleOutline size={42} />
        </button>
      </Header>
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
                onClick={() =>
                  removeAddress(item?.id, customerData, setAddressData)
                }
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
        <button
          id="addaddress"
          type="button"
          onClick={() => addAddress(customerData, setAddressData)}
        >
          <MdAdd size={32} />
        </button>
      </CustomerDetailsContainer>
    </>
  );
};

export default CustomerDetails;
