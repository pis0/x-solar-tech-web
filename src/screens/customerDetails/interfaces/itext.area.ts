/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface ITextArea {
  dataPropName: string;
  data: any | undefined;
  setData: React.Dispatch<React.SetStateAction<any | undefined>>;
  dataItem?: any;
  styles?: any;
  upperCase?: boolean;
  placeholder?: string;
}
