# todos:

1. 181n
2. init template
3. customize block
4. `tuchart` BUT NOT `TuChart`
5. upload to cdn
6. tinymce 的配置
7. remove unused blocks.
8. plugin 改造 如：'https://github.com/ellatrix/advanced-rich-text-tools'
9. upload image(ERROR for upload)
10. 多个编辑器共存的情况，需要处理处理 store/storage 的情况

## backlogs sp10:
- https://finxos.atlassian.net/wiki/spaces/PRD/pages/70452543/Sprint+10+Backlogs
- https://finxos.atlassian.net/wiki/spaces/PRD/pages/72384513/mmss+Editor+backlog+I
- https://www.yuque.com/docs/share/19aa6afa-a9f1-4971-8b0c-30b9f1869c5d

## todo for sp10:
- [x] 自动verse写作模式优先，并定义基础格式(border+graybg)
- [x] 自定义block菜单 (Tss blocks)
- [ ] 目前，拼音输入时，1~3个字幕会被默认英文输入(这个可能是 autosave/输入法 造成的?)
- [x] 可以去掉一些不要的 blocks(但底下会报错)
- [ ] 真正开发的时候，可以尝试另一个思路：用 wordpress 的模块，而不是用 `@frontkom/gutenberg-js` 的东西


## 对每个块的样式进行定制：
```js
// https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/
// Our filter function
function setBlockCustomClassName( className, blockName ) {
    return blockName === 'core/code' ?
        'my-plugin-code' :
        className;
}

// Adding the filter
wp.hooks.addFilter(
    'blocks.getBlockDefaultClassName',
    'my-plugin/set-block-custom-class-name',
    setBlockCustomClassName
);
```
