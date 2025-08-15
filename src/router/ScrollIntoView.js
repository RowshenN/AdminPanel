import { PureComponent } from "react";
import { withRouter } from "react-router-dom";

class ScrollIntoView extends PureComponent {
  componentDidMount = () => window.scrollTo(0, 0);

  componentDidUpdate = (prevProps) => {
    // console.log(this.props.location, prevProps.location);
    if (this.props.location.pathname === prevProps.location.pathname) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  };

  render = () => this.props.children;
}

export default withRouter(ScrollIntoView);
