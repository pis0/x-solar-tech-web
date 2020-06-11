export default interface IAddress {
  id: string;
  number: number;
  street: string;
  details: string;
  type: number;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  priority: number;
  // eslint-disable-next-line camelcase
  customer_id: string;
}
