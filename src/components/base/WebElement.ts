import { TIMEOUT } from '../../constants/timeouts';
import { setAttribute, testId, testIdEndingWith } from '../../lib/utils';
import { TEST_ID } from '../../constants/global';
import * as cloneDeep from 'lodash.clonedeep';
import ILocator from './ILocator';

const tag = 'tagged';

class WebElement {
  private readonly locator: ILocator;

  constructor(locator: ILocator | string) {
    this.locator = typeof locator === 'string'
      ? { nodes: [locator] }
      : locator;
  }

  public getTestIdAttr(): string {
    return this.getAttribute(TEST_ID);
  }

  public getAttribute(attribute: string): string {
    return this.getElement().getAttribute(attribute);
  }

  public getCSSProperty(property: string): string {
    return this.getElement().getCSSProperty(property).value;
  }

  public setCSSProperty(property: string, value: string): void {
    browser.execute(
      (element, prop, val) => {
        // eslint-disable-next-line no-param-reassign
        element.style[prop] = val;
      },
      this.getElement(),
      property,
      value
    );
  }

  public classContains(value: string): boolean {
    return this.getAttribute('class').includes(value);
  }

  public setAttribute(attribute: string, value?: string): void {
    // @ts-ignore
    setAttribute(this.getElement(), attribute, value);
  }

  public tag(): void {
    this.setAttribute(tag);
    this.waitForTagged();
  }

  public isTagged(): boolean {
    return !!this.getAttribute(tag);
  }

  public isNotTagged(): boolean {
    return !this.getAttribute(tag);
  }

  public waitForTagged(timeout: number = TIMEOUT): void {
    browser.waitUntil(
      () => this.isTagged(), {
        timeout,
        timeoutMsg: `'${this.getSelector()}' still not tagged after ${timeout}ms`
      }
    );
  }

  public waitForNotTagged(timeout: number = TIMEOUT): void {
    browser.waitUntil(
      () => this.isNotTagged(), {
        timeout,
        timeoutMsg: `'${this.getSelector()}' still tagged after ${timeout}ms`
      }
    );
  }

  protected getElement(): WebdriverIO.Element {
    return $(this.getSelector());
  }

  protected getSelector(): string {
    return this.locator.nodes.join(' ');
  }

  protected append(locator: string): ILocator {
    const locatorCopy = cloneDeep(this.locator);
    locatorCopy.nodes.push(locator);
    return locatorCopy;
  }

  /**
   * @returns a locator for the passed data-testid, as a descendant of this object's locator
   */
  protected appendTestId(dataTestId: string): ILocator {
    return this.append(testId(dataTestId));
  }

  protected appendTestIdEndingWith(dataTestId: string): ILocator {
    return this.append(testIdEndingWith(dataTestId));
  }
}

export default WebElement;
