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
const { PanelBody, FontSizePicker } = components;
const { InspectorControls, PanelColorSettings, PlainText, RichText } = editor;

console.log(editor);

// TODO: Add here the editable block attributes
const BLOCK_ATTRIBUTES = {
  title: {
    type: 'array',
    source: 'children',
    selector: 'span',
    default: 'Tss customize block'
  },
  fontSize: {
    type: 'number',
    default: 56
  },
  fontColor: {
    type: 'string'
  },
  tid: {
    type: 'number',
    default: 'https://echarts.baidu.com/examples/editor.html?c=area-basic'
  },
  backgroundColor: {
    type: 'string'
  }
};

const FONT_SIZES = [
  { name: 'small', shortName: 'S', size: 28 },
  { name: 'regular', shortName: 'M', size: 40 },
  { name: 'large', shortName: 'L', size: 56 },
  { name: 'larger', shortName: 'XL', size: 72 }
];

export const name = 'tu-chart';

export const settings = {
  title: __('Tss Custom Block'),

  description: __('A custom block for Gutenberg tss-blocks'),

  icon: <img width={32} src={'https://i.stack.imgur.com/qYN3I.png'} />,

  attributes: BLOCK_ATTRIBUTES,

  edit({ attributes, className, setAttributes }) {
    const { title, fontSize, tid, fontColor, backgroundColor } = attributes;
    const containerStyle = {
      backgroundColor
    };
    const titleStyle = {
      fontSize: fontSize && `${fontSize}px`,
      color: fontColor
    };

    return (
      <Fragment>
        {/* Block markup (main editor) */}
        <div className={className} style={containerStyle}>
          <center>
            <iframe width={'80%'} height={400} src={tid} frameborder="0" />
          </center>
        </div>

        <InspectorControls>
          {/* Block settings (sidebar) */}
          <PanelBody title={__('Settings')} initialOpen={true}>
            <input
              value={tid}
              placeholder={'图表的 id '}
              onChange={(event) => setAttributes({ tid: event.target.value })}
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  },

  save({ attributes, className }) {
    const { title, fontSize, fontColor, backgroundColor } = attributes;
    const containerStyle = {
      backgroundColor
    };
    const titleStyle = {
      fontSize: fontSize && `${fontSize}px`,
      color: fontColor
    };

    return (
      <div className={className} style={containerStyle}>
        <tuchart />
      </div>
    );
  }
};
