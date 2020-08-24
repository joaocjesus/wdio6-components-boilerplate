import InputBox from '../components/base/InputBox';
import Image from '../components/base/Image';
import Text from '../components/base/Text';
import ElementList from '../components/base/ElementList';
import Button from '../components/base/Button';

class GooglePage {
  private searchInputComponent: InputBox;
  private logoComponent: Image;
  private resultStatsComponent: Text;
  private searchButtonComponent: Button;

  public logo(): Image {
    this.logoComponent = this.logoComponent || new Image('#hplogo');
    return this.logoComponent;
  }

  public searchInput(): InputBox {
    this.searchInputComponent = this.searchInputComponent || new InputBox('input[title="Search"]');
    return this.searchInputComponent;
  }

  public searchButton(): Button {
    this.searchButtonComponent = this.searchButtonComponent || new Button('#tsf > div > div > div > center > input[name="btnK"]');
    return this.searchButtonComponent;
  }

  public resultStats(): Text {
    this.resultStatsComponent = this.resultStatsComponent || new Text('#result-stats');
    return this.resultStatsComponent;
  }

  public resultsTitles(): ElementList {
    return new ElementList({
        locator: '#rso .g',
        Type: Text,
        isSeries: false,
      },
    );
  }
}

export default GooglePage;
