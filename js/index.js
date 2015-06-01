/* jshint node: true */
/* global window,document, $,alert,history */
"use strict";

var timelineCapacity = moment.duration(1, 'seconds');

var ___mouseCursor = ___(timelineCapacity);
var ___mouseIsDown = ___(timelineCapacity);
var ___mouseDrag = ___(timelineCapacity);
var ___kiten = ___(timelineCapacity);

var Component1 = React.createClass(
{
  getInitialState: function()
  {
    return {cursor: {x: 0, y: 0}, kiten: {x: 0, y: 0}};
  },
  onMouseMove: function(e)
  {
    ___mouseCursor.appear({x: e.clientX, y: e.clientY});
  },
  onMouseDown: function(e)
  {
    ___mouseDrag.appear({x: e.clientX, y: e.clientY});
    ___kiten.appear({x: e.clientX, y: e.clientY});
    ___mouseIsDown.appear(true);
  },
  onMouseUp: function(e)
  {
    ___mouseIsDown.appear(false);
  },
  componentDidMount: function()
  {
    var component = this;

    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mouseup", this.onMouseUp);

    ___mouseCursor.compute(function(x)
    {
      if(___mouseIsDown.value(___('NOW')))
        ___mouseDrag.appear(x);
    });

    ___mouseIsDown.compute(function(x)
    {

    });

    ___mouseDrag.compute(function(x)
    {
      component.setState({cursor: x});
    });

    ___kiten.compute(function(x){
      component.setState({kiten: x});
    });
  },
  render: function()
  {
      return (<div><svg height = "100%"  width = "100%" >
      <line x1 = {this.state.kiten.x} y1 = {this.state.kiten.y} x2 = {this.state.cursor.x} y2 = {this.state.cursor.y} stroke="red" strokeWidth="5" />
      </svg></div>);
  }
});

React.render(<Component1/>, document.getElementById('component'));
