import React from 'react';
import '../styles/SearchModal.css';
import Flexbox from 'flexbox-react';
import * as actions from '../actions/index';

// NO LONGER NEED

class SearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.notifyParentOfSelect = this.notifyParentOfSelect.bind(this);
  }

  notifyParentOfSelect() {
    this.props.notifyParent(this.props.course.number);
  }

  render() {
    return (
      <Flexbox
        height="50px"
        margin="0 0 10px 0"
        width="74vw"
        alignItems="center"
        justifyContent="center"
        className="SearchModal"
        onClick={this.notifyParentOfSelect}
      >
        {'HIST-' + this.props.course.number + ': ' + this.props.course.title}
      </Flexbox>
    );
  }
}

export default SearchModal;
