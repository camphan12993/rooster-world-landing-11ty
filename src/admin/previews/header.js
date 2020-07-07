import htm from 'https://unpkg.com/htm?module';
const html = htm.bind(h);

const HeaderPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'brandTitle']);

    return html`
      <header>
      <nav class="flex items-center justify-between flex-wrap p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <span class="font-semibold text-xl tracking-tight text-blue-800">${title}</span>
        </div>
        <div class="flex-grow flex items-center w-auto justify-end" id="nav-menu">
            ${this.props
              .widgetsFor('nav')
              .map(
                (item) => html`
                  <a
                    href="${item.getIn(['data', 'url'])}"
                    class="block text-blue-800 hover:text-blue-600 mr-4"
                  >
                    ${item.getIn(['data', 'label'])}</a
                  >
                `
              )}
      </nav>
    </header>
    `;
  },
});

export default HeaderPreview;
