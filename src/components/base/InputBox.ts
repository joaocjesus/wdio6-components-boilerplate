import Component from './Component';
import { setValueWithJS } from '../../lib/utils';

class InputBox extends Component {
  public getValue(): string {
    this.waitUntilVisible();
    return this.getElement().getValue();
  }

  public valueMatches(regex: string | RegExp): RegExpMatchArray {
    return this.getValue().match(regex);
  }

  public valueEquals(text: string): boolean {
    return this.getValue() === text;
  }

  public setValue(value: string): void {
    this.getElement().setValue(value);
  }

  public setValueWithJS = (value: string): void => {
    setValueWithJS(this.getSelector(), value);
  };
}

export default InputBox;
