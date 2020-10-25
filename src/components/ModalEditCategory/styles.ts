import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }
  button {
    margin-top: 48px;
    align-self: flex-end;
    color: #22e0a1;
  }
  button {
    width: 280px;
    height: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    font-weight: 600;

    border: 2px solid #22e0a1;
    box-sizing: border-box;
    border-radius: 99px;
    text-transform: lowercase;

    &:hover {
      background: #22e0a1;
      color: white;
    }

    > span {
      padding: 0 10px 0;
    }
  }

  .edit {
    color: white;
    background: #22e0a1;
    border: none;

    &:hover {
      background: #034afd;
    }
  }
`;

export const ButtonContent = styled.div`
  display: flex
  align-items: center;
  justify-content: space-between;
`;
