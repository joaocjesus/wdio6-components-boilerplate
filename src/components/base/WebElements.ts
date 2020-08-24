import { TIMEOUT } from '../../constants/timeouts';
import { TEST_ID } from '../../constants/global';
import ILocator from './ILocator';
import { testId, testIdEndingWith } from '../../lib/utils';
import * as cloneDeep from 'lodash.clonedeep';

class WebElements {
  private readonly locator: ILocator;

  constructor(locator: ILocator | string, isSeries?: boolean) {
    if (typeof locator === 'string') {
      this.locator = { isSeries, nodes: [locator] };
    } else {
      this.locator = locator;
    }
    if (isSeries) {
      this.locator.isSeries = isSeries;
      this.locator.seriesId = this.getLastChildTestId();
      // Change to have locator use 'endsWith' cssSelector
      this.locator.nodes[this.locator.nodes.length - 1] = testIdEndingWith(`-${this.locator.seriesId}`);
    }
  }

  public count(): number {
    return this.getElements().length;
  }

  public waitForCount(count: number, timeout: number = TIMEOUT): boolean {
    browser.waitUntil(() =>
      this.count() === count, {
        timeout,
        timeoutMsg: `Element list with ${this.count()} items after ${timeout}ms.
      Expected count: ${count} (locator: '${this.getSelector()}')`,
      },
    );
    return true;
  }

  public waitForNotEmpty(timeout: number = TIMEOUT): void {
    browser.waitUntil(() =>
      this.count() > 0, {
        timeout,
        timeoutMsg: `Element list still empty after ${timeout}ms (locator: '${this.getSelector()}')`,
      },
    );
  }

  public elementsContainText(text: string): boolean {
    return this.getElements().every(element => element.getText().toLowerCase().includes(text.toLowerCase()));
  }

  public elementsAreVisible(): boolean {
    return this.getElements().every(element => element.isDisplayed());
  }

  public waitForCountToBeLessThan(count: number, timeout: number = TIMEOUT): void {
    browser.waitUntil(() =>
      this.count() < count, {
        timeout,
        timeoutMsg: `Element list with ${this.count()} items after ${timeout}ms.
      Expected count to be less than: ${count} (locator: '${this.getSelector()}')`,
      },
    );
  }

  public waitForCountToBeMoreThan(count: number, timeout: number = TIMEOUT): void {
    browser.waitUntil(() =>
      this.count() > count, {
        timeout,
        timeoutMsg: `Element list with ${this.count()} items after ${timeout}ms.
      Expected count to be over: ${count} (locator: '${this.getSelector()}')`,
      },
    );
  }

  /**
   * Returns the full selector, (eg.: [data-testid='page'] [data-testid$='-commodity'])
   */
  public getSelector(): string {
    return this.locator.nodes.join(' ');
  }

  protected append(locator: string): ILocator {
    const locatorCopy = cloneDeep(this.locator);
    locatorCopy.nodes.push(locator);
    return locatorCopy;
  }

  /**
   * Returns the testid of the last child element (requires 'isSeries: true')
   * eg.: '[data-testid="id-one"] [data-testid="id-two"] [data-testid="id-three"]' would return 'id-three'
   */
  protected getLastChildTestId(): string {
    const regex = new RegExp(`.*${TEST_ID}[$]?=['"](.*)['"]`);
    return this.lastNode().match(regex)[1];
  }

  protected getSeriesId(): string {
    return this.locator.seriesId;
  }

  protected isSeries(): boolean {
    return this.locator.isSeries;
  }

  /**
   * Same as getSelector, but returning the series id (eg.: [data-testid='page'] [data-testid='0-commodity'])
   * @param index
   */
  protected seriesIdSelector(index: number): string {
    const nodes = cloneDeep(this.locator.nodes);
    const idSelector = testId(`${index}-${this.getSeriesId()}`);
    nodes.splice(-1, 1, idSelector);
    return nodes.join(' ');
  }

  private getElements(): WebdriverIO.ElementArray {
    return $$(this.getSelector());
  }

  private lastNode() {
    const lastNode = this.locator.nodes.length - 1;
    return this.locator.nodes[lastNode];
  }
}

export default WebElements;
