/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IRadio {
  data: any | undefined;
  setData: React.Dispatch<React.SetStateAction<any | undefined>>;
  item: any;
}
