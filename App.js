// @flow
import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';

const CenterView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export default () => (
  <CenterView>
    <Text>
Open up App.js to start working on your app!
    </Text>
    <Text>
Changes you make will automatically reload.
    </Text>
    <Text>
Shake your phone to open the developer menu.
    </Text>
  </CenterView>
);
