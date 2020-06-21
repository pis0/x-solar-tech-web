/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import styled, { css } from 'styled-components';
import { shade } from 'polished';
import { MdSearch } from 'react-icons/md';
import IForm from './interfaces/iform';

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

export const Clients = styled.div`
  margin-top: 60px;
  max-width: 400px;

  a {
    display: flex;
    flex-direction: column;
    background: #aaa;
    border-radius: 8px;
    width: 100%;
    align-items: left;
    padding: 18px;

    transition: 0.1s;
    &:hover {
      transform: translateY(2px);
      background: ${shade(0.1, '#aaa')};
    }

    & + a {
      margin-top: 4px;
    }
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
  font-size: 22px;
  color: #aaa;
  text-align: center;
  width: 100%;
`;
