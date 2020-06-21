/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import IAddressComp from './interfaces/iaddress.comp';
import IForm from './interfaces/iform';

export const Header = styled.section`
  flex: 1;
  display: flex;
  flex-direction: row;
  width: 100%;
  section {
    width: 100%;
    height: 100%;
  }

  #removecustomer,
  #backtouserlist {
    border: none;
    background: none;
    svg {
      color: #bbb;
      height: 100%;
    }
    &:hover {
      svg {
        color: ${lighten(0.1, '#bbb')};
      }
    }

    &#backtouserlist {
      padding: 0 10px 0px 0px;
    }

    &#removecustomer {
      padding: 0 0 10px 10px;
    }
  }
`;

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
    padding: 4px;
    margin-left: 2px;
    border-radius: 4px;
    color: #eee;
  }
  button#submit {
    background: #60a873;
    &:hover {
      background: ${lighten(0.1, '#60a873')};
    }
  }
  button#undo {
    background: #d17373;
    &:hover {
      background: ${lighten(0.1, '#d17373')};
    }
  }

  svg#edit {
    visibility: hidden;
    opacity: 0.2;
  }
  &:hover {
    svg#edit {
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
  margin-top: 40px;
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
    margin-bottom: 40px;
    font-style: normal;
    position: relative;

    .row {
      display: flex;
      flex-direction: row;
    }

    section {
      span {
        color: #aaa;
        font-size: 14px;
      }
    }

    .small {
      max-width: 150px;
    }

    .priority {
      position: absolute;
      display: flex;
      align-items: center;
      right: 45px;
      top: -30px;
      &:hover {
        cursor: pointer;
      }
      label {
        display: block;
        padding: 4px;
        user-select: none;
        color: #aaa;
        &:hover {
          cursor: pointer;
        }
      }

      input {
        display: block;
        filter: grayscale(1);
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  button#addaddress,
  button#removeaddress {
    border-radius: 90px;
    border: none;
    padding: 4px 6px;
    background: #aaa;
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

    &#addaddress {
      width: 45px;
    }
    &#removeaddress {
      position: absolute;
      right: 0;
      top: -30px;
      background: none;
      padding: 0;
      svg {
        color: #aaa;
      }
      &:hover {
        svg {
          color: ${lighten(0.1, '#aaa')};
        }
      }
    }
  }
`;

export const BoxInfo = styled.section`
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

  &#type {
    section {
      display: flex;
      flex-direction: row;

      select {
        width: 100%;
        cursor: pointer;
        border: none;
        outline: none;
        display: inline-block;
        appearance: none;
        background: transparent;

        option {
          background: #333;
          color: #e1e1e1;
        }
      }

      svg {
        visibility: hidden;
        opacity: 0.2;
      }
    }

    &:hover {
      svg {
        visibility: visible;
      }
    }
  }
`;
