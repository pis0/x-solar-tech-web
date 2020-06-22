/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import styled, { css } from 'styled-components';
import { shade, lighten } from 'polished';
import { MdSearch } from 'react-icons/md';
import IForm from './interfaces/iform';
import ICustomerItem from './interfaces/iCustomerItem';

export const Form = styled.form<IForm>`
  margin-top: 40px;
  max-width: 600px;
  min-width: 400px;

  display: flex;

  input {
    flex: 1;
    height: 60px;
    padding: 0 24px;
    border: 0;
    border-radius: 8px 0 0 8px;
    color: #aaa;
    font-size: 20px;

    &::placeholder {
      color: #ccc;
    }

    ${(props) => {
      const errorColor = '#de0000';
      if (props.hasError)
        return css`
          color: ${errorColor};
        `;
      return null;
    }}
  }
`;

export const FormIcon = styled(MdSearch).attrs({
  size: 60,
})`
  background: #fff;
  color: #eee;
  border-radius: 0 8px 8px 0;
`;

export const CustomerList = styled.section`
  margin-top: 60px;
  max-width: 400px;
`;

export const CustomerItem = styled.section<ICustomerItem>`
  a {
    display: flex;
    flex-direction: column;
    background: #aaa;
    border-radius: 8px;
    width: 100%;
    align-items: left;
    padding: 18px;
    transition: 0.1s;
    margin-top: 4px;
    position: relative;

    &:hover {
      transform: translateY(2px);
      background: ${shade(0.1, '#aaa')};
    }

    svg {
      position: absolute;
      color: #dede00;
      right: 10px;
      bottom: 10px;
      display: none;
    }

    ${(props) => {
      if (props.pendingReg) {
        return css`
          opacity: 0.6;
          svg {
            display: block;
          }
        `;
      }
      return null;
    }}
  }

  strong {
    font-size: 16px;
    color: #fff;
  }

  span {
    font-size: 14px;
    color: #ddd;
    margin-top: 4px;
  }
`;

export const NoResults = styled.span`
  display: block;
  font-size: 18px;
  color: #aaa;
  width: 100%;
`;

export const AddCustomerButton = styled.button`
  margin-top: 20px;
  border-radius: 90px;
  border: none;
  padding: 4px 6px;
  background: #aaa;
  width: 45px;

  background-image: linear-gradient(
    to top left,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.2) 30%,
    rgba(0, 0, 0, 0)
  );
  svg {
    color: #fff;
  }

  &:hover {
    background: ${lighten(0.1, '#aaa')};
  }
`;
