import React, { Component } from 'react';
import Legend from '../components/Legend';
import Flexbox from 'flexbox-react';

export default class LegendContainer extends Component {
  componentWillMount() {
    this.props.store.subscribe(
      function() {
        this.setState(this.props.store.getState());
      }.bind(this)
    );
  }

  renderPathwayLegends() {
    const pathways = this.props.store.getState().pathways;
    const markup = Object.keys(pathways).map((pathway, index) => {
      return (
        <Legend
          store={this.props.store}
          pathway={pathways[pathway]}
          key={index}
        />
      );
    });
    return markup;
  };

  render() {
    return (
      <Flexbox
        flexDirection="row"
        justifyContent="center"
        flex="1"
      >
        {this.renderPathwayLegends()}
      </Flexbox>
    );
  }
}
