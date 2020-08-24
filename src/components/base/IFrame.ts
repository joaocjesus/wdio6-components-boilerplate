import Component from "./Component";
import { switchToFrame } from "../../lib/utils";

class IFrame extends Component {
   public switchTo(): void {
      this.waitUntilPresent();
      switchToFrame(this.getElement());
   }
}

export default IFrame;

