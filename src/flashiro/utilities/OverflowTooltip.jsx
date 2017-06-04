import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  content: PropTypes.string.isRequired,
};

class OverflowTooltip extends Component {
  constructor(props) {
    super(props);

    this.elementRef = null;

    this.state = {
      overflowing: false,
    };

    this.checkOverflow = this.checkOverflow.bind(this);
  }

  componentDidMount() {
    this.checkOverflow();
  }

  componentWillReceiveProps() {
    this.setState({ overflow: false });
  }

  componentDidUpdate() {
    this.checkOverflow();
  }

  checkOverflow() {
    const overflow = this.elementRef.clientWidth < this.elementRef.scrollWidth;

    if (overflow !== this.state.overflow) {
      this.setState({ overflow });
    }
  }

  render() {
    const childProps = {
      ref: (ref) => { this.elementRef = ref; },
    };

    if (this.state.overflow) {
      childProps.title = this.props.content;
    }

    return React.cloneElement(
      React.Children.only(this.props.children),
      childProps,
    );
  }
}

OverflowTooltip.propTypes = propTypes;

export default OverflowTooltip;
