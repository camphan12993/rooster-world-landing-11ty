const HeaderPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'brandTitle']);
    var navItems = this.props.widgetsFor('nav');
    var nav = navItems.map((item) => {
      return h(
        'li',
        { className: 'nav-item' },
        h('a', { className: 'nav-link' }, item.getIn(['data', 'label']))
      );
    });

    return h('nav', { className: 'navbar navbar-expand-md navbar-light' }, [
      h('a', { className: 'navbar-brand' }, title),
      h(
        'div',
        { className: 'collapse navbar-collapse' },
        h('ul', { className: 'navbar-nav ml-auto my-2' }, nav)
      ),
    ]);
  },
});

export default HeaderPreview;
