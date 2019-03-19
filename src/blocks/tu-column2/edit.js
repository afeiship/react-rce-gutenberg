const { blocks, editor, data, i18n, components } = window.wp;
const { registerBlockType, createBlock } = blocks;
const { InnerBlocks, Columns } = editor;
const { ResizableBox } = components;
import Resizable from 're-resizable';

const ALLOWED_BLOCKS = [
  'core/paragraph',
  'core/heading',
  'core/list',
  'core/verse',
  'tssblocks/tu-column2'
];
const TEMPLATE = [
  [
    'core/paragraph',
    { fontSize: 'normal', placeholder: i18n._x('Content…', 'content placeholder') }
  ]
];

const TEMPLATE2 = [
  ['core/heading', { placeholder: 'Recipe Title' }],
  [
    'core/columns',
    {},
    [
      ['core/column', {}, [['core/image']]],
      [
        'core/column',
        {},
        [
          ['core/paragraph', { placeholder: 'Enter short recipe description...' }],
          ['core/paragraph', { placeholder: 'Enter ingredients...' }],
          ['core/button', { text: 'Make this Recipe' }],
        ]
      ]
    ]
  ]
];

export default class extends React.Component {
  _onResize = (event, direction, elt) => {
    console.log('on resize elt:->', elt);
  };

  _onResizeStop = (event, direction, elt) => {
    console.log(parseInt(elt.style.width));
  };

  render() {
    console.log(this.props);
    console.log(
      createBlock('core/heading', {
        content: 'test'
      })
    );
    return (
      <div className="tu-column2-edit">
        <Resizable
          className="left editor-media-container__resizer"
          minWidth="10%"
          maxWidth="100%"
          size={this._onResize}
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
          <InnerBlocks
            allowedBlocks={ALLOWED_BLOCKS}
            template={TEMPLATE2}
            templateLock={'all'}
            templateInsertUpdatesSelection={false}
          />
        </Resizable>
        <div className="right">RIGHT</div>
      </div>
    );
  }
}
