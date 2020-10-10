import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.footer`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.2);
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const FooterCopyright = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 75px;

  p {
    font-size: 13px;
  }
  span {
    color: #cfcece;
    font-size: 13px;
  }
`;

export const MadeInSp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 150px;

  p {
    font-size: 13px;
  }

  > svg {
    color: #22e0a1;
    fill: #22e0a1;
  }
`;
