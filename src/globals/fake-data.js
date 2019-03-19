const date = new Date().toISOString();
const tmpl1 = require('./template1.html');

export const pageType = {
  id: 1,
  rest_base: 'pages',
  slug: 'page',
  supports: {
    title: false
  }
};

export const page = {
  id: 1,
  content: {
    // raw: '<!-- wp:verse --> <pre class="wp-block-verse"/> <!-- /wp:verse -->',
    raw: '',
    rendered: ''
  },
  status: 'draft',
  revisions: { count: 0, last_id: 0 },
  parent: 0,
  theme_style: true,
  type: 'page',
  link: `${window.location.origin}/preview`,
  categories: [],
  featured_media: 0,
  permalink_template: `${window.location.origin}/preview`,
  preview_link: `${window.location.origin}/preview`
};

export const getMedias = (n = 3) => {
  return Array(n)
    .fill('')
    .map((i, index) => {
      const id = index + 1;
      return {
        id,
        caption: { raw: '', rendered: '' },
        date_gmt: date,
        date,
        link: `${window.location.origin}/img${id}.png`,
        media_type: 'image',
        mime_type: 'image/jpeg',
        source_url: `${window.location.origin}/img${id}.png`,
        media_details: {
          file: '',
          height: 2100,
          image_meta: {},
          sizes: {},
          width: 3360
        },
        title: { raw: '', rendered: '' }
      };
    });
};

export const themes = [
  {
    theme_supports: {}
  }
];
