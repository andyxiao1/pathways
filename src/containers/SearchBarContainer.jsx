import React, { Component } from 'react';
import '../styles/SearchBarContainer.css';
import * as actions from '../actions/index';
import Fuse from 'fuse.js';
import { Search } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const initialState = {
  isLoading: false,
  results: [],
  value: '',
  fuse: null
};

export default class SearchBarContainer extends Component {
  state = initialState;

  componentDidMount() {
    this.props.store.subscribe(() =>
      this.setState(this.props.store.getState())
    );
    this.setupSearchFuse();
  }

  setupSearchFuse = () => {
    const { courses } = this.props.store.getState();
    const coursesArray = Object.keys(courses).map(key => {
      const course = courses[key];
      return {
        title: `Hist-${course.number}`,
        number: course.number,
        description: course.title,
        selectedPathways: course.selectedPathways
      };
    });

    const options = {
      shouldSort: true,
      tokenize: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: ['title', 'description', 'selectedPathways']
    };

    const fuse = new Fuse(coursesArray, options);
    this.setState({ fuse });
  };

  handleResultSelect = (e, { result }) => {
    this.props.store.dispatch(actions.searchSelect(Number(result.number)));
    this.setState({ value: '' });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    const { fuse } = this.state;
    const results = fuse.search(this.state.value);
    results.forEach(c => {
      delete c.selectedPathways;
    });
    this.setState({ isLoading: false, results });
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Search
        input={{ fluid: true }}
        fluid={true}
        className="SearchBar"
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        size="large"
        noResultsMessage="No Courses Found"
        results={results}
        value={value}
      />
    );
  }
}
