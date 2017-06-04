import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './Notes.scss';

const propTypes = {
  onNotesClear: PropTypes.func.isRequired,
  onNotesEdit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

class Notes extends Component {
  constructor(props) {
    super(props);

    this.editNotes = this.editNotes.bind(this);
  }

  editNotes(event) {
    event.preventDefault();

    this.props.onNotesEdit(event.target.value);
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
          value={this.props.value}
        />

        <footer className="notes__info">
          {500 - this.props.value.length} characters left

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
