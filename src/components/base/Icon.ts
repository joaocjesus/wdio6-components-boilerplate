import Component from './Component';
import Image from './Image';

class Icon extends Component {
  private imageComponent: Image;

  public image(): Image {
    this.imageComponent = this.imageComponent || new Image(this.append('img'));
    return this.imageComponent;
  }
}

export default Icon;
