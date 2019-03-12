import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';

// Registering Custom Blocks
import { data, editPost, domReady } from '@frontkom/gutenberg-js';

// Gutenberg JS Style
import '@frontkom/gutenberg-js/build/css/block-library/style.css';
import '@frontkom/gutenberg-js/build/css/style.css';


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

  componentDidMount() {
    const settings = {
      alignWide: true,
      availableTemplates: [],
      allowedBlockTypes: true,
      disableCustomColors: false,
      disablePostFormats: false,
      titlePlaceholder: 'Add title',
      bodyPlaceholder: 'Insert your custom block',
      isRTL: false,
      autosaveInterval: 0,
      postLock: {
        isLocked: false
      },
      canPublish: false,
      canSave: false,
      canAutosave: false,
      mediaLibrary: true
    };

    // reset localStorage
    localStorage.removeItem('g-editor-page');

    // Disable tips
    data.dispatch('core/nux').disableTips();

    // Initialize the editor
    window._wpLoadGutenbergEditor = new Promise(function(resolve) {
      domReady(function() {
        resolve(editPost.initializeEditor('editor', 'page', 1, settings, {}));
      });
    });
  }

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classNames('react-rce-gutenberg', className)} {...props}>
        <div id="editor" className="gutenberg__editor" />
      </div>
    );
  }
}
