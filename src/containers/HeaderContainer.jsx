import React, { Component } from 'react';
import '../styles/HeaderContainer.css';
import Flexbox from 'flexbox-react';
import Fade from 'react-reveal/Fade';

const title = 'PATHWAYS ';
const subtitle =
  "An Interactive Guide to the Penn History Department's Undergraduate Course Offerings";
const pageDescription =
  'Below is a tool to help guide you through the many pathways of history at the University of Pennsylvania. Pathways connect courses that share similar historical themes, helping you select classes that suit your interests.';
const toolDescription =
  'Explore Pathways by either clicking on one of the legends to the left or by clicking one of courses in the graph. Alternatively, you can search for a specific course below to learn about its pathways. More information about the currently selected course can be found at the bottom of the page. ';

const initialState = { showArrow: true };

export default class HeaderContainer extends Component {
  state = initialState;
  descriptionStart = React.createRef();

  componentDidMount() {
    this.props.store.subscribe(() =>
      this.setState(this.props.store.getState())
    );
  }

  handleArrowClick = () => {
    this.descriptionStart.current.scrollIntoView({ behavior: 'smooth' });
    this.setState({ showArrow: false });
  };

  renderArrow = () =>
    this.state.showArrow ? (
      <div className="NavigationArrow bounce" onClick={this.handleArrowClick} />
    ) : (
      <div />
    );

  render() {
    return (
      <Flexbox
        className="HeaderContainer"
        width="100%"
        alignSelf="center"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Flexbox flexDirection="column" alignItems="center" height="100vh">
          <Flexbox className="PageTitle" marginTop="30vh">
            {title}
          </Flexbox>
          <Flexbox className="PageSubtitle" marginTop="10vh">
            {subtitle}
          </Flexbox>
          {this.renderArrow()}
        </Flexbox>
        <div style={{ marginBottom: '2vh' }} ref={this.descriptionStart} />
        <Fade big>
          <div className="Description">{pageDescription}</div>
          <div className="Description" style={{ marginBottom: '28px' }}>
            {toolDescription}
          </div>
        </Fade>
      </Flexbox>
    );
  }
}
