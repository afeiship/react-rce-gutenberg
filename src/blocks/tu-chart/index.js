// import { blocks, data, i18n } from 'wp';
const { blocks, editor, data, i18n, components } = window.wp;
const { registerBlockType } = blocks;
const { dispatch, select } = data;
const { __ } = i18n;
const { AlignmentToolbar, BlockControls, RichText, FontSizePicker } = editor;
const { Popover } = components;
import React from 'react';

// TODO: Import each block herer
import * as block1 from './components';

// Category name and slug

const category = {
  slug: 'tssblocks', // needs to match the css class of the block container: ".wp-block-cloudblocks-[block-name]"
  title: __('TSS Blocks')
};

const category2 = {
  slug: 'tsstemplates', // needs to match the css class of the block container: ".wp-block-cloudblocks-[block-name]"
  title: __('TSS Templates')
};

// Register the new category and blocks
export function registerBlocks() {
  // Add the new category to the list
  const currentCategories = select('core/blocks')
    .getCategories()
    .filter((item) => item.slug !== category.slug);
  // dispatch('core/blocks').setCategories([category, ...currentCategories.slice(0, 4)]);
  dispatch('core/blocks').setCategories([category, category2, ...currentCategories]);
  // TODO: Register each block
  registerBlockType(`${category.slug}/${block1.name}`, {
    category: category.slug,
    ...block1.settings
  });

  //register another blocks:
  registerBlockType(`${category.slug}/tu-test-block`, {
    title: 'My first block',
    icon: 'universal-access-alt',
    category: 'tssblocks',
    attributes: {
      content: {
        type: 'array',
        source: 'children',
        selector: 'p'
      },
      alignment: {
        type: 'string'
      }
    },
    edit({ attributes, className, setAttributes }) {
      const { content, alignment } = attributes;

      function onChangeContent(newContent) {
        setAttributes({ content: newContent });
      }

      function onChangeAlignment(newAlignment) {
        setAttributes({ alignment: newAlignment });
      }

      return [
        <BlockControls>
          <AlignmentToolbar value={alignment} onChange={onChangeAlignment} />
        </BlockControls>,
        <RichText
          tagName="p"
          className={className}
          placeholder={'为TSS定制的?'}
          style={{ textAlign: alignment }}
          onChange={onChangeContent}
          value={content}
        />
      ];
    },
    save({ attributes, className }) {
      const { content, alignment } = attributes;

      return (
        <RichText.Content className={className} style={{ textAlign: alignment }} value={content} />
      );
    }
  });
}

registerBlocks();

// import { blocks, editor } from '@frontkom/gutenberg-js';

const el = wp.element.createElement;
// const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;

const BLOCKS_TEMPLATE = [['core/image', {}], ['core/paragraph', { placeholder: 'Image Details' }]];

registerBlockType('tssblocks/template', {
  title: 'My Template Block',
  category: category2.slug,
  edit: (props) => {
    return el(InnerBlocks, {
      template: BLOCKS_TEMPLATE,
      templateLock: false
    });
  },
  save: (props) => {
    return el(InnerBlocks.Content, {});
  }
});

const currentCategories = select('core/blocks');
console.log(currentCategories);
// wp.blocks.unregisterBlockStyle('core/embed');
// wp.blocks.unregisterBlockType('core/embed');

// ======= ======= ======= add customize formTypeBar:======= ======= ======= =======
const { createElement, Fragment } = window.wp.element;
const {
  registerFormatType,
  removeFormat,
  getActiveFormat,
  applyFormat,
  toggleFormat
} = window.wp.richText;
const { RichTextToolbarButton, RichTextShortcut } = window.wp.editor;
import { find } from 'lodash';
// unregisterBlockType:

class MyFontSizePicker extends React.Component {
  state = {
    fontSize: null,
    isExpanded: false
  };

  componentWillUpdate(nextProps) {
    console.log('new Props', nextProps);
    if (this.state.fontSize !== nextProps.fontSize) {
      this.setState({ fontSize: nextProps.fontSize });
    }

    if (this.state.isExpanded !== nextProps.isExpanded) {
      this.setState({ isExpanded: nextProps.isExpanded });
    }
  }

  onClick = (e) => {
    this.setState({ isExpanded: true });
  };

  onChange = (e) => {
    this.setState({ fontSize: e });
    this.props.onChange(e);
  };

  render() {
    return (
      <Fragment>
        <RichTextToolbarButton
          title="TSS font-size plate"
          onClick={this.onClick}
          isActive={this.props.isActive}
          shortcutType={'primary'}
          className={`toolbar-button-with-text toolbar-button__advanced-tssfz`}
        />
        {this.state.isExpanded && (
          <Popover focusOnMount={false}>
            <FontSizePicker value={this.state.fontSize} onChange={this.onChange} />
          </Popover>
        )}
      </Fragment>
    );
  }
}

[
  {
    name: 'tssfz',
    title: 'TSS font-size plate',
    icon: (
      <svg>
        <path d="M5 4v3h5.5v12h3V7H19V4z" />
      </svg>
    ),
    character: ']'
  }
].forEach(({ name, title, character, icon }) => {
  const type = `tss-plugins/${name}`;

  registerFormatType(type, {
    title,
    tagName: name,
    className: null,
    attributes: {
      style: 'style'
    },
    edit({ isActive, value, onChange }) {
      const args = arguments;
      const currentFormats = getActiveFormat(value, type);
      const onToggle = (e) => {};
      let fontSize = 13;

      if (isActive) {
        const activeFormat = getActiveFormat(value, type);
        const style = activeFormat.attributes.style;
      }

      const onFontChange = (e) => {
        onChange(
          applyFormat(value, {
            type,
            attributes: {
              style: `font-size:${e}px`
            }
          })
        );
      };

      if (!currentFormats) {
        removeFormat(value, type);
        fontSize = null;
      } else {
        fontSize = parseInt(currentFormats.attributes.style.split(':')[1]) || null;
      }

      return (
        <Fragment>
          <RichTextShortcut type={'primary'} character={character} onUse={onToggle} />
          <MyFontSizePicker isExpanded={isActive} fontSize={fontSize} isActive={isActive} onChange={onFontChange} />
        </Fragment>
      );
    }
  });
});
