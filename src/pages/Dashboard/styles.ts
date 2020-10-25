import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TableMotion = styled(motion.div)`
  width: 100%;
`;
