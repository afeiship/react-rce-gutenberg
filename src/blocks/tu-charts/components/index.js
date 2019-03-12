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
    type: 'number'
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

  icon: 'cover-image',

  attributes: BLOCK_ATTRIBUTES,

  edit({ attributes, className, setAttributes }) {
    const { title, fontSize, fontColor, backgroundColor } = attributes;
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
            <img
              width="500"
              src="https://ws2.sinaimg.cn/large/006tKfTcly1g0zw9slwi2j30rs0jgwfb.jpg"
            />
          </center>
        </div>

        <InspectorControls>
          {/* Block settings (sidebar) */}
          <PanelBody title={__('Settings')} initialOpen={true}>
            <FontSizePicker
              fontSizes={FONT_SIZES}
              fallbackFontSize={56}
              value={fontSize}
              onChange={(value) => setAttributes({ fontSize: value })}
            />
          </PanelBody>

          <PanelColorSettings
            title={__('Color Settings')}
            initialOpen={false}
            colorSettings={[
              {
                value: backgroundColor,
                onChange: (value) => setAttributes({ fontColor: value }),
                label: __('Font Color')
              },
              {
                value: backgroundColor,
                onChange: (value) => setAttributes({ backgroundColor: value }),
                label: __('Background Color')
              }
            ]}
          />
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
        {/* <RichText.Content tagName="h1" style={titleStyle} value={title} /> */}
      </div>
    );
  }
};
