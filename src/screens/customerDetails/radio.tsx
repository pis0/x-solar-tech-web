/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import IRadio from './interfaces/iradio';
import IAddress from './interfaces/iaddress';

const Radio: React.FC<IRadio> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { data, setData, item } = props;

  return (
    <>
      <section className="priority">
        <input
          type="radio"
          id={item?.id}
          checked={item?.priority === 1}
          onChange={(e) => {
            const { target } = e;
            const addressDataCopy = [...data];
            // eslint-disable-next-line no-unused-expressions
            addressDataCopy?.forEach((a: IAddress): void => {
              const element = a;
              element.priority = element?.id === target?.id ? 1 : 2;
            });
            setData(addressDataCopy);
          }}
        />
        <label htmlFor={item?.id}>main address</label>
      </section>
    </>
  );
};

export default Radio;
