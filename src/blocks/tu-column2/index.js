import classnames from 'classnames';

const { blocks, editor, data, i18n, components, element } = window.wp;
const { registerBlockType } = blocks;
const { InnerBlocks, InspectorControls } = editor;
const { __ } = i18n;
const { Fragment } = element;
const { PanelBody, RangeControl } = components;
const { ResizableBox } = components;
const ALLOWED_BLOCKS = ['tssblocks/column'];
import Resizable from 're-resizable';

import memoize from 'memize';

import { times } from 'lodash';

// @wordpress/block-library
const getColumnsTemplate = memoize((columns) => {
  return times(columns, (idx) => ['tssblocks/column', { id: idx + 1 }]);
});

registerBlockType('tssblocks/columns', {
  title: 'TssColumns',
  category: 'tssblocks',
  icon: 'cover-image',
  attributes: {
    columns: {
      type: 'number',
      default: 2
    }
  },
  edit({ attributes, setAttributes, className }) {
    const { columns } = attributes;
    const classes = classnames(className, `has-${columns}-columns`, 'innerblocks-wrap tu-column2');

    const onResize = (event, direction, elt) => {
      // console.log('on resize elt:->', arguments);
    };

    const onResizeStop = (evt, dir, target, xx, yy) => {
      const width = $(target)[0].style.width;
      $(target).next().find('[data-type="tssblocks/column"]')
        .eq(0)
        .css('flex', `0 0 ${width}`);
    };

    return (
      <div className={classes}>
        <Resizable
          className={'editor-media-container__resizer resize-box'}
          minWidth="10%"
          maxWidth="100%"
          onResize={onResize}
          onResizeStop={onResizeStop}
          enable={{
            top: false,
            right: true,
            bottom: true,
            left: false,
            topRight: false,
            bottomRight: true,
            bottomLeft: false,
            topLeft: false
          }}
          defaultSize={{
            width: '50%'
          }}
          axis="x">
          <div className={'resize-bar'}>RESIE</div>
        </Resizable>
        <InnerBlocks
          className={'tu-columns-inner-blocks'}
          template={getColumnsTemplate(columns)}
          templateLock="all"
          allowedBlocks={ALLOWED_BLOCKS}
        />
      </div>
    );
  },

  save({ attributes }) {
    const { columns } = attributes;

    return (
      <div className={`has-${columns}-columns`}>
        <InnerBlocks.Content />
      </div>
    );
  }
});
