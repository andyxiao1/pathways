import React, { Component } from 'react';
import NetworkContainer from './NetworkContainer';
import HeaderContainer from './HeaderContainer';
// import CatalogContainer from './CatalogContainer';
import LegendContainer from './LegendContainer';
import SearchBarContainer from './SearchBarContainer';
import InformationContainer from './InformationContainer';
import Flexbox from 'flexbox-react';
import _ from 'lodash';
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
    const store = this.props.store;
    const state = store.getState();
    const showInformationContainer = state.activePathways.length > 0;
    return (
      <Flexbox className="RootContainer" flexDirection="column">
        <HeaderContainer store={store} />
        <SearchBarContainer store={store} />
        <Flexbox flexDirection="column" justifyContent="flex-start">
          <Flexbox 
            flexDirection="row" 
            justifyContent="center" 
            height="90vh"
            padding="1em"
          >
            {showInformationContainer ? "" : <Flexbox flex="1"></Flexbox>}
            <Flexbox flex={showInformationContainer ? "1" : "2"} justifyContent="center">
              <NetworkContainer
                store={store}
              />
            </Flexbox>
            {showInformationContainer 
              ? <Flexbox flex=".66">
                  <InformationContainer store={store} />
                </Flexbox>
              : <Flexbox flex="1"></Flexbox>}
          </Flexbox>
          <Flexbox height="10vh" padding="0px 0px 16px">
            <LegendContainer store={store} />
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }
}
