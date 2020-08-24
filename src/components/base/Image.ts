import Component from './Component';

class Image extends Component {
  public getSrc(): string {
    return this.getElement().getAttribute('src');
  }
}

export default Image;
