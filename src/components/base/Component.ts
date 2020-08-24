import { TIMEOUT } from '../../constants/timeouts';
import WebElement from './WebElement';
import { LocationReturn } from '@wdio/sync';

class Component extends WebElement {
  public isVisibleCurrently(): boolean {
    return this.getElement().isDisplayed();
  }

  public isVisible(timeout: number = TIMEOUT): boolean {
    this.waitUntilVisible(timeout);
    return this.isVisibleCurrently();
  }

  public isNotVisibleCurrently(): boolean {
    return !this.getElement().isDisplayed();
  }

  public isNotVisible(timeout: number = TIMEOUT): boolean {
    this.waitUntilNotVisible(timeout);
    return this.isNotVisibleCurrently();
  }

  public waitUntilVisible(timeout: number = TIMEOUT): void {
    this.getElement().waitForDisplayed({ timeout });
  }

  public waitUntilNotVisible(timeout: number = TIMEOUT): void {
    this.getElement().waitForDisplayed({ timeout, reverse: true });
  }

  public isPresentCurrently(): boolean {
    return this.getElement().isExisting();
  }

  public isNotPresentCurrently(): boolean {
    return !this.getElement().isExisting();
  }

  public isPresent(timeout: number = TIMEOUT): boolean {
    this.waitUntilPresent(timeout);
    return this.isPresentCurrently();
  }

  public isNotPresent(timeout: number = TIMEOUT): boolean {
    this.waitUntilNotPresent(timeout);
    return this.isNotPresentCurrently();
  }

  public isInView(): boolean {
    if (this.isPresentCurrently()) {
      return this.getElement().isDisplayedInViewport();
    }
    return false;
  }

  public isNotInView(): boolean {
    if (this.isNotPresentCurrently()) {
      return true;
    }
    return !this.getElement().isDisplayedInViewport();
  }

  public waitUntilPresent(timeout: number = TIMEOUT): void {
    this.getElement().waitForExist({ timeout });
  }

  public waitUntilNotPresent(timeout = TIMEOUT): void {
    this.getElement().waitForExist({ timeout, reverse: true });
  }

  public click(): void {
    this.waitUntilVisible();
    this.getElement().click();
  }

  public hover(): void {
    this.waitUntilVisible();
    this.getElement().moveTo();
  }

  public scrollToView(): void {
    this.waitUntilPresent();
    this.getElement().scrollIntoView();
  }

  public getPosition(): LocationReturn {
    return this.getElement().getLocation();
  }
}

export default Component;
