import htm from 'https://unpkg.com/htm?module';
const html = htm.bind(h);

const Footer = createClass({
  render: function () {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'title']);

    var copyRight = entry.getIn(['data', 'copyRight']);

    var author = entry.getIn(['data', 'madeBy', 'author']);
    var url = entry.getIn(['data', 'madeBy', 'url']);
    var socials = this.props.widgetsFor('socials');

    return html`
      <footer class="footer-area py-10 md:py-18">
        <div class="container mx-auto">
          <h5 class="uppercase text-center text-2xl text-blue-900">${title}</h5>
          <div class="flex justify-center my-3 text-blue-900">
            ${socials.map(
              (item) => html`
                <a
                  href="${item.getIn(['data', 'url'])}"
                  class="block p-6 md:px-10"
                >
                  <img src="${item.getIn(['data', 'icon'])}" class="w-8 h-8" />
                </a>
              `
            )}
          </div>
          <div class="copyrights text-center text-blue-900">
            <p class="para">
              ${copyRight} | Made by
              <a href="${url}">
                <b> ${author}</b>
              </a>
            </p>
          </div>
        </div>
      </footer>
    `;
  },
});

export default Footer;
