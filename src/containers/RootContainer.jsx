import React, { Component } from 'react';
import NetworkContainer from './NetworkContainer';
import HeaderContainer from './HeaderContainer';
import CatalogContainer from './CatalogContainer';
import LegendContainer from './LegendContainer';
import SearchBarContainer from './SearchBarContainer';
import Flexbox from 'flexbox-react';
import '../styles/RootContainer.css';

export default class RootContainer extends Component {
  componentWillMount() {
    this.props.store.subscribe(
      function() {
        this.setState(this.props.store.getState());
      }.bind(this)
    );
  }

  render() {
    return (
      <Flexbox className="RootContainer" flexDirection="column">
        <HeaderContainer store={this.props.store} />
        <SearchBarContainer store={this.props.store} />
        <Flexbox flexDirection="row" justifyContent="flex-start">
          <LegendContainer store={this.props.store} />
          <NetworkContainer store={this.props.store} />
        </Flexbox>
        <CatalogContainer store={this.props.store} />
      </Flexbox>
    );
  }
}
