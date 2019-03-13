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

// console.log(editor);

window.editor = editor;

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
    default: 'https://echarts.baidu.com/examples/editor.html?c=area-basic'
  }
};

export const name = 'tu-chart';

export const settings = {
  title: __('Tss Custom Block'),
  description: __('A custom block for Gutenberg tss-blocks'),
  icon: <img width={32} src={'https://i.stack.imgur.com/qYN3I.png'} />,
  attributes: BLOCK_ATTRIBUTES,
  edit({ attributes, className, setAttributes }) {
    const { title, description, tid } = attributes;

    return (
      <Fragment>
        {/* Block markup (main editor) */}
        <iframe className={className} width={'100%'} height={400} src={tid} frameBorder="0" />
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
    // const str = JSON.stringify(attributes);
    // console.log(str, btoa(str));
    console.log(attributes);
    return (
      <div className={className}>
        <tu-chart />
      </div>
    );
  }
};
