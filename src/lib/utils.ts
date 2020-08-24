import { TIMEOUT } from '../constants/timeouts';
import { TEST_ID } from '../constants/global';
import WebdriverIO = require('@wdio/sync');

export const setAttribute = (element: WebdriverIO.Element, attribute: string, value: string): void => {
  browser.execute(
    // tslint:disable-next-line:only-arrow-functions
    function (elem, attr, val) {
      elem.setAttribute(attr, val);
    },
    element,
    attribute,
    value,
  );
};

export const setValueWithJS = (element: WebdriverIO.Element | string, value: string): void => {
  browser.execute(
    // tslint:disable-next-line:only-arrow-functions
    function (elem, val) {
      const el = typeof elem === 'string' ? document.querySelector(elem) : elem;
      el.click();
      el.value = val;
    },
    element,
    value,
  );
};

export const navigate = (page: string = '/'): void =>
  browser.url(`${browser.config.baseUrl}${page}`);

export const reloadSession = (): void => {
  browser.reloadSession();
  navigate();
};

export const getUrl = (): string => browser.getUrl();

export const getBrowserTitle = (): string => browser.getTitle();

export const waitForUrlToContain = (url: string, timeout: number = TIMEOUT): boolean =>
  browser.waitUntil(() => this.getUrl().includes(url), {
      timeout,
      timeoutMsg: `expected url to contain '${url}' after ${timeout}ms, but it was '${browser.getUrl()}'`,
      interval: 1000,
    },
  );

export const waitForUrlToChange = (url: string, timeout: number = TIMEOUT): boolean =>
  browser.waitUntil(() => url !== this.getUrl(), {
      timeout,
      timeoutMsg:
        `expected url to change from '${url}' after ${timeout}ms, but it was still '${browser.getUrl()}'`,
      interval: 1000,
    },
  );

export const waitUntilOneVisible = ({ components, timeout = TIMEOUT }): void => {
  browser.waitUntil(() => components.some(component => component.isVisibleCurrently()), {
      timeout,
      timeoutMsg: `Expected at least one component to be visible within ${timeout}ms:
      ${components.map(component => component.constructor.name)}`,
      interval: 1000,
    },
  );
};

export const switchToWindow = (url: string, timeout: number = TIMEOUT): boolean =>
  browser.waitUntil(() => {
      browser.switchWindow(url);
      return this.getUrl() === url;
    }, {
      timeout,
      timeoutMsg: `expected new tab to have opened with url: '${url}'`,
    },
  );

export const switchToFrame = (locator: WebdriverIO.Element): void => browser.switchToFrame(locator);

export const isDate = (date: any): boolean => {
  const newDate = new Date(date);
  const isDateValid = newDate instanceof Date && !isNaN(newDate.getTime());
  if (!isDateValid) {
    throw Error(`'${date}' is not a valid Date!`);
  }
  return true;
};

export const testId = (dataTestId: string): string => `[${TEST_ID}="${dataTestId}"]`;

export const testIdEndingWith = (dataTestId: string): string => `[${TEST_ID}$="${dataTestId}"]`;

export const itLocal = (d: string, fn: () => void) =>
  process.env.TEST_ENV === 'local' ? it(d, fn) : it.skip(d, fn);

export const describeLocal = (d: string, fn: () => void) =>
  process.env.TEST_ENV === 'local' ? describe(d, fn) : describe.skip(d, fn);
