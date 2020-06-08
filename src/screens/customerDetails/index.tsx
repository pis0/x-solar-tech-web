import React, { useEffect, useState, ChangeEvent, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
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
import IAddress from './iaddress';
import IAddressType from './iaddress.type';

const CustomerDetails: React.FC = () => {
  const { params } = useRouteMatch<IRouteParams>();
  const [customerData, setCustomerData] = useState<ICustomer>();
  const [addressData, setAddressData] = useState<IAddress[]>();
  const [addressType, setAddressType] = useState<IAddressType[]>();
  const [inputValue, setInputValue] = useState<string>();
  const [inputEditorMode, setInputEditorMode] = useState<boolean>(false);
  const [
    formSubmitButtonRef,
    setFormSubmitButtonRef,
  ] = useState<HTMLButtonElement | null>();

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

  const inputOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const result = e?.target?.value;
    if (escape(result)?.match(/%0A/) && formSubmitButtonRef) {
      formSubmitButtonRef.click();
      return;
    }
    setInputValue(result ?? '');
  };

  const resolveCols = useCallback(() => {
    const MAX_COLS = 30;
    let result = inputValue?.length ?? customerData?.name?.length ?? 0;
    if (result > MAX_COLS) result = MAX_COLS;
    return result;
  }, [inputValue, customerData]);

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
      {/* <Title>{customerData?.name}</Title> */}
      <Title
        editorMode={!!inputEditorMode}
        onSubmit={(e) => {
          e.preventDefault();
          setInputEditorMode(false);
          if (customerData && inputValue?.length) {
            const newCustomerData: ICustomer = { ...customerData };
            newCustomerData.name = inputValue.trimEnd();
            setInputValue(newCustomerData.name);
            setCustomerData(newCustomerData);
          } else {
            setInputValue(customerData?.name);
          }
        }}
      >
        <textarea
          style={{ background: inputEditorMode ? '#fff' : 'transparent' }}
          rows={1}
          cols={resolveCols()}
          maxLength={30}
          readOnly={!inputEditorMode}
          spellCheck={false}
          placeholder={customerData?.name}
          value={inputValue ?? customerData?.name}
          onChange={inputOnChange}
          onClick={() => {
            console.log('onClick');
            setInputEditorMode(true);
          }}
        />
        <FaEdit size={22} />
        {inputEditorMode && (
          <>
            <button ref={(ref) => setFormSubmitButtonRef(ref)} type="submit">
              SAVE
            </button>
            <button
              type="button"
              onClick={() => {
                setInputValue(customerData?.name);
                setInputEditorMode(false);
              }}
            >
              UNDO
            </button>
          </>
        )}
      </Title>
      <SubTitle>{customerData?.cpf}</SubTitle>
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
