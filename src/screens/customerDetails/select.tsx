/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import ISelect from './interfaces/iselect';

const Select: React.FC<ISelect> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { data, setData, types, item } = props;

  return (
    <>
      {item && (
        <section>
          <select
            defaultValue={item?.type}
            onChange={(e) => {
              const { options, selectedIndex } = e.target;
              const selectedValue = Number(options[selectedIndex].value);
              const addressDataCopy = [...data];
              const typeItem = addressDataCopy?.find((a) => a?.id === item?.id);
              if (typeItem) typeItem.type = selectedValue;
              setData(addressDataCopy);
            }}
          >
            {types?.map((addressTypeItem: any, index: any) => (
              <option key={`aaddressType_${index}`} value={addressTypeItem?.id}>
                {addressTypeItem?.label?.toUpperCase()}
              </option>
            ))}
          </select>
          <FaEdit size={22} />
        </section>
      )}
    </>
  );
};

export default Select;
