/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import styled, { css } from 'styled-components';
import IAddressComp from './iAddressComp';

export const Title = styled.h1`
  font-size: 36px;
  color: #aaa;
`;

export const SubTitle = styled.h2`
  font-size: 24px;
  color: #ccc;
`;

export const AddressTitle = styled.h3`
  margin-top: 20px;
  font-size: 24px;
  color: #aaa;
`;

export const AddressComp = styled.address<IAddressComp>`
  opacity: 1;
  ${(props) => {
    if (props.priority !== 1)
      return css`
        opacity: 0.6;
      `;
    return null;
  }}
`;

export const CustomerDetailsContainer = styled.div`
  margin-top: 40px;
  max-width: 600px;
  min-width: 320px;
  display: flex;
  flex-direction: column;

  address {
    margin-top: 10px;
    font-style: normal;

    .row {
      display: flex;
      flex-direction: row;
    }

    div {
      background: #eee;
      span {
        color: #aaa;
        font-size: 14px;
      }

      strong {
        color: #333;
        font-size: 14px;
      }
    }

    div#small {
      max-width: 150px;
    }
  }
`;

export const BoxInfo = styled.div`
  background: #eee;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 4px;
  border-radius: 8px;
  margin: 1px 0 0 1px;

  span {
    color: #aaa;
    font-size: 20px;
  }

  strong {
    color: #333;
    font-size: 18px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
