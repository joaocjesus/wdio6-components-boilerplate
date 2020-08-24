import WebElements from './WebElements';
import ILocator from './ILocator';

type ElementListProps = {
  locator: ILocator | string;
  Type: any;
  isSeries?: boolean;
}

type ComponentProps = {
  refetch?: boolean;
  startAt?: number;
  stopAt?: number;
  offset?: number;
}

class ElementList extends WebElements {
  private readonly Type: any;
  private componentList: any[];

  constructor({ locator, Type, isSeries = false }: ElementListProps) {
    super(locator, isSeries);
    this.Type = Type;
    this.componentList = null;
  }

  public components({ refetch, startAt = 0, stopAt, offset = 0 }: ComponentProps = {}): any[] {
    if (!this.componentList || refetch) {
      const iterations = stopAt || this.count();
      this.componentList = [];
      for (let i = startAt + offset; i < iterations; i++) {
        const selector = this.isSeries()
          ? this.seriesIdSelector(i)
          : `${this.getSelector()}:nth-of-type(${i + 1})`;
        this.componentList.push(new this.Type(selector));
      }
    }
    return this.componentList;
  }

  public getComponent(index: number, refetch?: boolean): any {
    const components = this.components({ refetch, startAt: index, stopAt: index });
    return components[0];
  }
}

export default ElementList;
