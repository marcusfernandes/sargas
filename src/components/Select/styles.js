import styled, { css } from 'styled-components';
import ReactSelect from 'react-select';
import Colors from '~/styles/colors';

export const Container = styled.div`
  border: 1px solid ${Colors().info};
  border-radius: 4px;
  position: relative;

  ${(props) =>
    props.isErrored &&
    css`
      border: 1px solid ${Colors().danger};
    `}

  > span {
    position: absolute;
    top: 4px;
    right: 40px;
    z-index: 9;
  }
`;

export const ReactSelectComponent = styled(ReactSelect)``;

export const Label = styled.label`
  font-weight: 700;
  font-size: 12px;
`;
