import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

/**
 * A component that displays a message when there is no data available to be displayed.
 *
 * @function NoDataComponent
 * @returns {React.ReactElement} A React element that displays the message.
 */
const NoDataComponent = () => (
  <Container>
    <StyledIcon name="exclamation-circle" size={60} color="#999" />
    <Message>No data available</Message>
  </Container>
);

export default NoDataComponent;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Message = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledIcon = styled(Icon)`
  margin-bottom: 10px;
`;
