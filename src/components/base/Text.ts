import Component from './Component';
import { TIMEOUT } from '../../constants/timeouts';

class Text extends Component {
  public getText(): string {
    this.waitUntilVisible();
    return this.getElement().getText();
  }

  public getLowerCaseText(): string {
    return this.getText().toLowerCase();
  }

  public textMatches(regex: string): RegExpMatchArray {
    return this.getText().match(regex);
  }

  public textContains(text: string): boolean {
    return this.getText().includes(text);
  }

  public textEquals(text: string): boolean {
    return this.getText() === text;
  }

  public textNotEquals(text: string): boolean {
    return this.getText() !== text;
  }

  public waitForRegex(regex: string, timeout: number = TIMEOUT): string {
    this.waitUntilVisible();
    // @ts-ignore
    browser.waitUntil(() => this.textMatches(regex), {
        timeout,
        timeoutMsg: `expected text to match '${regex}', but was '${this.getText()}' after ${timeout}ms`,
      },
    );
    return this.getText();
  }

  public waitForText(text: string, timeout: number = TIMEOUT): string {
    this.waitUntilVisible();
    browser.waitUntil(
      () => this.textEquals(text), {
        timeout,
        timeoutMsg: `expected text to equal '${text}', but was '${this.getText()}' after ${timeout}ms`,
      },
    );
    return this.getText();
  }

  public waitForTextToNotEqual(text: string, timeout: number = TIMEOUT): string {
    this.waitUntilVisible();
    browser.waitUntil(
      () => this.textNotEquals(text),{
        timeout,
        timeoutMsg: `expected text to be different from '${text}' after ${timeout}ms`}
    );
    return this.getText();
  }
}

export default Text;
