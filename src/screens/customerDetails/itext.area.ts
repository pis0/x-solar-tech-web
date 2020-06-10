/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface ITextArea {
  dataPropName: string;
  data: any | undefined;
  setData: React.Dispatch<React.SetStateAction<any | undefined>>;
  styles?: any;
}
