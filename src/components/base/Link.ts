import Text from './Text';

class Link extends Text {
  private hrefAttribute: string;

  public href(): string {
    this.hrefAttribute = this.hrefAttribute || this.getElement().getAttribute('href');
    return this.hrefAttribute;
  }
}

export default Link;
