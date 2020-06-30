import HeaderPreview from '/admin/previews/header.js';
import Footer from '/admin/previews/footer.js';
CMS.registerPreviewTemplate('header', HeaderPreview);
CMS.registerPreviewTemplate('footer', Footer);
CMS.registerPreviewStyle(
  'https://use.fontawesome.com/releases/v5.13.0/css/all.css'
);
CMS.registerPreviewStyle('/assets/css/styles.css');
