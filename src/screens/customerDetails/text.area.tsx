import React, { useState, ChangeEvent, useCallback } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Form } from './styles';
import ITextArea from './itext.area';

const TextArea: React.FC<ITextArea> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { data, setData, dataPropName, styles } = props;

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

  return (
    <>
      <Form
        styles={styles}
        editorMode={!!inputEditorMode}
        onSubmit={(e) => {
          e.preventDefault();
          setInputEditorMode(false);
          if (data && inputValue?.length) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newCustomerData: any = { ...data };
            newCustomerData[dataPropName] = inputValue.trimEnd();
            setInputValue(newCustomerData[dataPropName]);
            setData(newCustomerData);
          } else {
            setInputValue(data?.[dataPropName]);
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
          placeholder={data?.[dataPropName]}
          value={inputValue ?? data?.[dataPropName]}
          onChange={inputOnChange}
          onClick={() => {
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
                setInputValue(data?.[dataPropName]);
                setInputEditorMode(false);
              }}
            >
              UNDO
            </button>
          </>
        )}
      </Form>
    </>
  );
};

export default TextArea;
