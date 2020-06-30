const About = createClass({
  render: function () {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'title']);
    var subTitle = entry.getIn(['data', 'subTitle']);
    var buttonText = entry.getIn(['data', 'buttonText']);

    return h('div', {}, [
      h('h2', {}, title),
      h('p', { className: 'lead' }, subTitle),
      h('a', { className: 'btn btn-primary btn-xl text-light' }, buttonText),
    ]);
  },
});

export default About;
