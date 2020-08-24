import Component from './Component';
import InputBox from './InputBox';
import ElementList from './ElementList';

class Dropdown extends Component {
  private inputComponent: InputBox;

  public getValue(): string {
    return this.input().getValue();
  }

  public optionsList(): ElementList {
    return new ElementList({
      locator: this.append('.select__option'),
      Type: Text
    });
  }

  private input(): InputBox {
    this.inputComponent = this.inputComponent || new InputBox(this.append('input'));
    return this.inputComponent;
  }
}

export default Dropdown;
