import Component from './Component';
import Checkbox from './Checkbox';

class RadioButton extends Component {
  private inputComponent: Checkbox;

  public input(): Checkbox {
    this.inputComponent =
      this.inputComponent || new Checkbox(this.append('input'));
    return this.inputComponent;
  }

  public isSelected(noWait: boolean): boolean {
    return this.input().isSelected(noWait);
  }

  public isNotSelected(noWait: boolean): boolean {
    return this.input().isNotSelected(noWait);
  }

  public waitUntilSelected(): void {
    this.input().waitUntilSelected();
  }

  public waitUntilNotSelected(): void {
    this.input().waitUntilNotSelected();
  }
}

export default RadioButton;
