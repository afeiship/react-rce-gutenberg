/**
 * WordPress dependencies
 */


const { blocks, editor, data, i18n, components, element } = window.wp;
const { registerBlockType } = blocks;
const { InnerBlocks, InspectorControls } = editor;
const { __ } = i18n;
export const name = 'tssblocks/column';

export const settings = {
  title: __('Tss Column'),

  parent: ['tssblocks/columns'],

  icon: 'image',

  description: __('A single column within a tss-columns block.'),

  category: 'tssblocks',

  supports: {
    inserter: false,
    reusable: false,
    html: false
  },

  edit() {
    return (
      <div className="tss-column-edit-item">
        <InnerBlocks templateLock={false} />
      </div>
    );
  },

  save() {
    return (
      <div className="tss-column-item">
        <InnerBlocks.Content />
      </div>
    );
  }
};

registerBlockType(name, settings);
