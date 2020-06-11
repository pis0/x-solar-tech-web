/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface ISelect {
  data: any | undefined;
  setData: React.Dispatch<React.SetStateAction<any | undefined>>;
  types: any | undefined;
  item: any;
}
