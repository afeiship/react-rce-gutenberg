// import { blocks, data, i18n } from 'wp';
const { blocks, editor, data, i18n } = window.wp;
const { registerBlockType } = blocks;
const { dispatch, select } = data;
const { __ } = i18n;
const { AlignmentToolbar, BlockControls, RichText } = editor;

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
  console.log(currentCategories);
  // dispatch('core/blocks').setCategories([category, ...currentCategories.slice(0, 3)]);
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

registerBlockType('myplugin/template', {
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
