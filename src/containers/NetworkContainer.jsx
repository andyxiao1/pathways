import React, { Component } from 'react';
import '../styles/NetworkContainer.css';
import Network from '../components/Network';
import Flexbox from 'flexbox-react';

export default class NetworkContainer extends Component {
  componentWillMount() {
    this.props.store.subscribe(
      function() {
        this.setState(this.props.store.getState());
      }.bind(this)
    );
  }

  render() {
    //  console.log(this.props.store.getState().graph);
    return (
      <Flexbox flex="6" height="100vh" className="NetworkContainer">
        <Network store={this.props.store} />
      </Flexbox>
    );
  }
}
