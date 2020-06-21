import { ChangeEvent } from 'react';

const inputOnChange = (
  e: ChangeEvent<HTMLTextAreaElement>,
  formSubmitButtonRef: HTMLButtonElement | undefined | null,
  setInputValue: React.Dispatch<React.SetStateAction<string | undefined>>,
): void => {
  const result = e?.target?.value;
  if (escape(result)?.match(/%0A/) && formSubmitButtonRef) {
    formSubmitButtonRef.click();
    return;
  }
  setInputValue(result ?? '');
};

const resolveData = (
  dataObj: any | undefined,
  dataObjItem: any,
  dataObjPropName: string,
  upperCase: boolean | undefined,
) => {
  const obj = dataObjItem
    ? dataObj?.find((item: any) => item?.id === dataObjItem?.id)
    : dataObj;

  const result = obj?.[dataObjPropName]?.toString();
  return upperCase ? result?.toUpperCase() : result;
};

export { inputOnChange, resolveData };
