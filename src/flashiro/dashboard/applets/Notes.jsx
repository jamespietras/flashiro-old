import _debounce from 'lodash/debounce';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './Notes.scss';

const propTypes = {
  onNotesClear: PropTypes.func.isRequired,
  onNotesSave: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

class Notes extends Component {
  constructor(props) {
    super(props);

    this.debouncedOnNotesSave = _debounce(this.props.onNotesSave, 500);

    this.state = {
      currentValue: props.value,
    };

    this.editNotes = this.editNotes.bind(this);
  }

  editNotes(event) {
    event.preventDefault();

    const fieldValue = event.target.value;

    this.setState({
      currentValue: fieldValue,
    }, () => this.debouncedOnNotesSave(fieldValue));
  }

  render() {
    return (
      <div>
        <header className="notes__header">
          <FontAwesome className="notes__icon" name="sticky-note-o" />
          <h3 className="notes__heading">Notes</h3>
        </header>

        <textarea
          className="notes__field"
          maxLength="500"
          onChange={this.editNotes}
          value={this.state.currentValue}
        />

        <footer className="notes__info">
          {500 - this.state.currentValue.length} characters left

          <button className="notes__clear" onClick={this.props.onNotesClear}>
            Clear
          </button>
        </footer>
      </div>
    );
  }
}

Notes.propTypes = propTypes;

export default Notes;
