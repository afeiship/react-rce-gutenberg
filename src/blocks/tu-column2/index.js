const { blocks, editor, data, i18n, components } = window.wp;
const { registerBlockType } = blocks;
const { InnerBlocks } = editor;

import Edit from './edit';

// @wordpress/block-library

registerBlockType('tssblocks/tu-column2', {
  title: 'TssColumns',
  category: 'tssblocks',
  icon: 'cover-image',
  edit(props) {
    return <Edit {...props} />;
  },
  save() {
    return (
      <div className={'tu-column2'}>
        <InnerBlocks.Content />
      </div>
    );
  }
});
