/**
 * External dependencies
 */
import React from 'react';
const { element, i18n, components, editor } = window.wp;

/**
 * Internal dependencies
 */
import './style.scss';

const { Fragment } = element;
const { __ } = i18n;

// TODO: Chooose components for the sidebar settings
const { PanelBody } = components;
const { InspectorControls } = editor;

// TODO: Add here the editable block attributes
const BLOCK_ATTRIBUTES = {
  title: {
    type: 'string'
  },
  description: {
    type: 'string'
  },
  tid: {
    type: 'string',
    default: null
  }
};

export const name = 'tu-chart';

export const settings = {
  title: __('Tss Custom Block'),
  description: __('A custom block for Gutenberg tss-blocks'),
  icon: <svg><path d="M5 4v3h5.5v12h3V7H19V4z" /></svg> ,
  attributes: BLOCK_ATTRIBUTES,
  edit({ attributes, className, setAttributes }) {
    const { title, description, tid } = attributes;

    return (
      <Fragment>
        {/* Block markup (main editor) */}
        <div className="tss-block">
          {tid && (
            <iframe className={className} width={'100%'} height={400} src={tid} frameBorder="0" />
          )}
          {!tid && (
            <img
              width={'80%'}
              src="https://ws2.sinaimg.cn/large/006tKfTcly1g0zw9slwi2j30rs0jgwfb.jpg"
            />
          )}
        </div>
        <InspectorControls>
          {/* Block settings (sidebar) */}
          <PanelBody title={__('Settings')} initialOpen={false}>
            <div className="tu-chart-settings">
              <label className={'row'}>
                <strong>标题</strong>
                <input
                  value={title}
                  onChange={(event) => setAttributes({ title: event.target.value })}
                  type="text"
                />
              </label>
              <label className={'row'}>
                <strong>描述</strong>
                <textarea
                  value={description}
                  onChange={(event) => setAttributes({ description: event.target.value })}
                />
              </label>
              <label className={'row'}>
                <strong>tid</strong>
                <input
                  value={tid}
                  onChange={(event) => setAttributes({ tid: event.target.value })}
                  type="text"
                />
              </label>
            </div>
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  },

  save({ attributes, className }) {
    const { tid, ...extra } = attributes;
    const str = JSON.stringify(extra);
    return (
      <div className={className}>
        <tu-chart tid={tid} data-json={btoa(str)} />
      </div>
    );
  }
};


// wp.blocks.getBlockTypes()
