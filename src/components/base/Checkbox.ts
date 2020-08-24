import Component from './Component';
import { TIMEOUT } from '../../constants/timeouts';

class Checkbox extends Component {
  public isSelected(noWait: boolean): boolean {
    if (!noWait) {
      this.waitUntilSelected();
    }
    return this.getElement().isSelected();
  }

  public isNotSelected(noWait: boolean): boolean {
    if (!noWait) {
      this.waitUntilNotSelected();
    }
    return !this.getElement().isSelected();
  }

  public waitUntilSelected(): void {
    browser.waitUntil(
      () => this.getElement().isSelected(), {
        timeout: TIMEOUT,
        timeoutMsg: `expected checkbox to be selected after ${TIMEOUT}ms`,
      },
    );
  }

  public waitUntilNotSelected(): void {
    browser.waitUntil(
      () => !this.getElement().isSelected(), {
        timeout: TIMEOUT,
        timeoutMsg: `expected checkbox to not be selected after ${TIMEOUT}ms`,
      },
    );
  }
}

export default Checkbox;
