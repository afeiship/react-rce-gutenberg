import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';

// Registering Custom Blocks
import { data, editPost, domReady } from '@frontkom/gutenberg-js';

// Gutenberg JS Style
// import '@frontkom/gutenberg-js/build/css/block-library/style.css';
// import '@frontkom/gutenberg-js/build/css/style.css';

export default class extends Component {
  componentDidMount() {
    const settings = {
      alignWide: true,
      availableTemplates: [],
      allowedBlockTypes: true,
      disableCustomColors: true,
      disablePostFormats: false,
      titlePlaceholder: 'Add title',
      bodyPlaceholder: 'Insert your custom block',
      isRTL: false,
      autosaveInterval: 20,
      canPublish: false,
      canSave: true,
      canAutosave: true,
      mediaLibrary: false
    };

    // reset localStorage
    localStorage.removeItem('g-editor-page');

    // Disable tips
    data.dispatch('core/nux').disableTips();
    // data.dispatch('core/edit-post').closeGeneralSidebar();

    // Initialize the editor
    window._wpLoadGutenbergEditor = new Promise(function(resolve) {
      wp.i18n.setLocaleData(require('../data/cn_b.json'));
      resolve(editPost.initializeEditor('editor', 'page', 1, settings, {}));
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
