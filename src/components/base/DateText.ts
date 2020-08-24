import Text from './Text';
import { isDate } from '../../lib/utils';

class DateText extends Text {
  public getDate(): Date {
    if (isDate(this.getText())) {
      return new Date(this.getText());
    }
  }
}

export default DateText;
