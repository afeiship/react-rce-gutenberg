import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';

// Don't forget to import the style
import 'moment/min/moment.min.js';
import 'jquery/dist/jquery.min.js';
import { editPost } from '@frontkom/gutenberg-js';
import '@frontkom/gutenberg-js/build/css/block-library/style.css';
import '@frontkom/gutenberg-js/build/css/style.css';

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

  componentDidMount() {
    console.log('cdm');
    const settings = {
      alignWide: true,
      availableTemplates: [],
      allowedBlockTypes: true,
      disableCustomColors: false,
      disablePostFormats: false,
      titlePlaceholder: 'Add title',
      bodyPlaceholder: 'Insert your custom block',
      isRTL: false,
      autosaveInterval: 10,
      canPublish: false,
      canSave: true,
      canAutosave: true,
      mediaLibrary: true,
      postLock: {
        isLocked: false
      }
    };
    editPost.initializeEditor('editor', 'page', 1, settings, {});
  }

  _onChange = (e) => {
    console.log(e);
  };

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classNames('react-rce-gutenberg', className)} {...props}>
        <div id="editor" className="gutenberg__editor" />
      </div>
    );
  }
}
