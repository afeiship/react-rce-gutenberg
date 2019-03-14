// import { blocks, data, i18n } from 'wp';
const { blocks, data, i18n } = window.wp;
const { registerBlockType } = blocks;
const { dispatch, select } = data;
const { __ } = i18n;

// TODO: Import each block herer
import * as block1 from './components';
import RichText from '../advanced-rich-text-tools/dist/index.js';

// Category name and slug

const category = {
  slug: 'tssblocks', // needs to match the css class of the block container: ".wp-block-cloudblocks-[block-name]"
  title: __('TSS Blocks')
};
const category2 = {
  slug: 'tssblocks', // needs to match the css class of the block container: ".wp-block-cloudblocks-[block-name]"
  title: __('TSS Blocks2')
};

// Register the new category and blocks
export function registerBlocks() {
  // Add the new category to the list
  const currentCategories = select('core/blocks')
    .getCategories()
    .filter((item) => item.slug !== category.slug);
  dispatch('core/blocks').setCategories([category, ...currentCategories]);
  // TODO: Register each block
  registerBlockType(`${category.slug}/${block1.name}`, {
    category: category.slug,
    ...block1.settings
  });
}

registerBlocks();
