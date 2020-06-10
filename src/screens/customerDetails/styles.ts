/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import IAddressComp from './iaddress.comp';
import IForm from './iform';

export const Form = styled.form<IForm>`
  display: flex;
  flex-direction: row;
  align-items: center;

  textarea {
    display: flex;
    padding: 0;
    border: 0;
    color: #aaa;
    font-size: 36px;
    resize: unset;
    text-size-adjust: auto;
    white-space: nowrap;
    overflow-wrap: inherit;
    overflow: hidden;
    width: 100%;
    max-width: 600px;

    &::placeholder {
      color: #ccc;
    }

    ${(props) =>
      props?.styles?.color &&
      css`
        color: ${props?.styles?.color};
      `};

    ${(props) =>
      props?.styles?.fontSize &&
      css`
        font-size: ${`${props?.styles?.fontSize}px`};
      `};
  }

  button {
    display: flex;
    height: 100%;
    border: none;
    padding: 8px;
    margin-left: 2px;
    border-radius: 4px;
    color: #eee;
  }
  button[type='submit'] {
    background: #60a873;
    &:hover {
      background: ${lighten(0.1, '#60a873')};
    }
  }
  button[type='button'] {
    background: #d17373;
    &:hover {
      background: ${lighten(0.1, '#d17373')};
    }
  }

  svg {
    visibility: hidden;
    opacity: 0.2;
  }
  &:hover {
    svg {
      visibility: ${(props) => (props.editorMode ? 'hidden' : 'visible')};
    }

    ${(props) =>
      !props.editorMode &&
      css`
        textarea {
          color: #00aaf2;
        }
      `};
  }
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
        opacity: 0.7;
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

    .small {
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
