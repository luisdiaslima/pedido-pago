import styled from 'styled-components';

import { motion } from 'framer-motion';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #b7c1cc44;
`;

export const Paper = styled(motion.div)``;
