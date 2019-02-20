import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';
import { editor } from '@frontkom/gutenberg-js';
// Don't forget to import the style
import '@frontkom/gutenberg-js/build/css/block-library/style.css';
import '@frontkom/gutenberg-js/build/css/style.css';

const { AlignmentToolbar, BlockControls, RichText } = editor;

// Registering Custom Blocks

export default class extends Component {
  /*===properties start===*/
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: null,
    onChange: noop
  };
  /*===properties end===*/

  constructor(inProps) {
    super(inProps);
    this.state = {};
  }

  _onChange = (e) => {
    console.log(e);
  };

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classNames('react-rce-gutenberg', className)} {...props}>
        <AlignmentToolbar />
        <BlockControls />
        <RichText onChange={this._onChange} />
      </div>
    );
  }
}
