const Footer = createClass({
  render: function () {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'title']);

    var copyRight = entry.getIn(['data', 'copyRight']);

    var author = entry.getIn(['data', 'madeBy', 'author']);
    var url = entry.getIn(['data', 'madeBy', 'url']);
    var socials = this.props.widgetsFor('socials');

    var socialIcons = socials.map((item) => {
      return h(
        'a',
        { href: item.getIn(['data', 'url']) },
        h('i', { className: item.getIn(['data', 'icon']) })
      );
    });

    return h(
      'footer',
      { className: 'footer-area' },
      h('div', { className: 'container' }, [
        h('h5', { className: 'text-uppercase text-center' }, title),
        h('div', { className: 'social text-center' }, socialIcons),
        h(
          'div',
          { className: 'copyrights text-center' },
          h('p', { className: 'para' }, [
            copyRight + ' | Made by ',
            h('a', { href: url }, h('span', {}, author)),
          ])
        ),
      ])
    );
  },
});

export default Footer;
