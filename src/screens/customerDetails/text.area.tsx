/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, useCallback } from 'react';
import { FaEdit, FaCheck, FaUndoAlt } from 'react-icons/fa';
import { Form } from './styles';
import ITextArea from './interfaces/itext.area';

const TextArea: React.FC<ITextArea> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { data, dataItem, setData, dataPropName, styles, upperCase } = props;

  const [inputEditorMode, setInputEditorMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>();
  const [
    formSubmitButtonRef,
    setFormSubmitButtonRef,
  ] = useState<HTMLButtonElement | null>();

  const inputOnChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const result = e?.target?.value;
      if (escape(result)?.match(/%0A/) && formSubmitButtonRef) {
        formSubmitButtonRef.click();
        return;
      }
      setInputValue(result ?? '');
    },
    [formSubmitButtonRef],
  );

  const resolveData = (
    dataObj: any | undefined,
    dataObjItem: any,
    dataObjPropName: string,
  ) => {
    const obj = dataObjItem
      ? dataObj?.find((item: any) => item?.id === dataObjItem?.id)
      : dataObj;

    const result = obj?.[dataObjPropName]?.toString();
    return upperCase ? result?.toUpperCase() : result;
  };

  return (
    <>
      <Form
        styles={styles}
        editorMode={!!inputEditorMode}
        onSubmit={(e: any) => {
          e.preventDefault();
          setInputEditorMode(false);
          if (data && inputValue?.length) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newCustomerData: any = dataItem ? [...data] : { ...data };
            const obj = dataItem
              ? newCustomerData?.find((item: any) => item?.id === dataItem?.id)
              : newCustomerData;
            obj[dataPropName] = inputValue.trimEnd();
            const result = obj[dataPropName]?.toString();
            setInputValue(upperCase ? result?.toUpperCase() : result);
            setData(newCustomerData);
          } else {
            setInputValue(resolveData(data, dataItem, dataPropName));
          }
        }}
      >
        <textarea
          style={{ background: inputEditorMode ? '#fff' : 'transparent' }}
          rows={1}
          // cols={resolveCols()}
          // maxLength={30}
          readOnly={!inputEditorMode}
          spellCheck={false}
          placeholder={resolveData(data, dataItem, dataPropName)}
          value={inputValue ?? resolveData(data, dataItem, dataPropName)}
          onChange={inputOnChange}
          onClick={() => {
            setInputEditorMode(true);
          }}
        />
        <FaEdit size={22} id="edit" />
        {inputEditorMode && (
          <>
            <button
              ref={(ref) => setFormSubmitButtonRef(ref)}
              id="submit"
              type="submit"
            >
              <FaCheck size={20} />
            </button>
            <button
              id="undo"
              type="button"
              onClick={() => {
                setInputValue(resolveData(data, dataItem, dataPropName));
                setInputEditorMode(false);
              }}
            >
              <FaUndoAlt size={20} />
            </button>
          </>
        )}
      </Form>
    </>
  );
};

export default TextArea;
