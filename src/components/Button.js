import React from 'react';
import styled from 'styled-components';
import { Button as BaseButton } from 'native-base';

import { buttonStyle } from '../constants/styles';

const StyledButton = styled(BaseButton)`
  padding-left: ${buttonStyle.paddingHorizontal};
  padding-right: ${buttonStyle.paddingHorizontal};
  padding-top: ${buttonStyle.paddingVertical};
  padding-bottom: ${buttonStyle.paddingVertical};
  align-self: auto;
`;

const ButtonText = styled.Text`
  color: ${buttonStyle.textColor};
  font-size: ${buttonStyle.fontSize};
  font-weight: ${buttonStyle.fontWeight};
`;

type Props = {
  children: ?React.Node,
  title: ?string,
};

export default class Button extends React.Component<Props> {
  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }
    return <ButtonText>{this.props.title}</ButtonText>
  }

  render() {
    return (
      <StyledButton {...this.props}>
        {this.renderChildren()}
      </StyledButton>
    );
  }
}