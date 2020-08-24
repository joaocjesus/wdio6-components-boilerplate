import Text from './Text';

class Button extends Text {
  public isEnabled(): boolean {
    return this.getElement().isEnabled();
  }
}

export default Button;
