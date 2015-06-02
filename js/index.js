/* jshint node: true */
/* global window,document, $,alert,history */
"use strict";

var timelineCapacity = moment.duration(1, 'seconds');

var ___mouseCursor = ___(timelineCapacity);
var ___mouseIsDown = ___(timelineCapacity);
var ___mouseDrag = ___(timelineCapacity);
// var ___kiten = ___(timelineCapacity);

var Component1 = React.createClass(
{
  getInitialState: function()
  {
      return {items: [], cursor: {x: null, y: null}, kiten: {x: null, y: null}};
  },
  getMouseXYInElement: function(e)
  {
    var rect = document.getElementById('component').getBoundingClientRect();
    var mouse = {x: null, y: null}
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    // console.log("x:" + mouse.x + ", y:" + mouse.y + " " + "l:" + rect.left + ", t:" + rect.top); // is debug.
    return mouse;
  },
  onMouseMove: function(e)
  {
    ___mouseCursor.appear(this.getMouseXYInElement(e));
  },
  onMouseDown: function(e)
  {
    ___mouseDrag.appear(this.getMouseXYInElement(e));
    this.setState({kiten: this.getMouseXYInElement(e)});
    // ___kiten.appear({x: e.clientX, y: e.clientY});
    ___mouseIsDown.appear(true);
  },
  onMouseUp: function(e)
  {
    var nextItems = this.state.items.concat({cursor: this.state.cursor, kiten: this.state.kiten});
    var nextCursor = {x: null, y: null};
    var nextKiten = {x: null, y: null};
    this.setState({items: nextItems, cursor: nextCursor, kiten: nextKiten});
    ___mouseIsDown.appear(false);
  },
  componentDidMount: function()
  {
    var component = this;
    var svg = document.getElementById('component');

    svg.addEventListener("mousemove", this.onMouseMove);
    svg.addEventListener("mousedown", this.onMouseDown);
    svg.addEventListener("mouseup", this.onMouseUp);

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

    // ___kiten.compute(function(x){
    //   component.setState({kiten: x});
    // });
  },
  render: function()
  {
      var createItem = function(item)
      {
         return <line x1 = {item.kiten.x} y1 = {item.kiten.y} x2 = {item.cursor.x} y2 = {item.cursor.y} stroke="red" strokeWidth="5" />
      }
      return (<div><svg height = "100%"  width = "100%" >
      {this.state.items.map(createItem)}
      {createItem(this.state)}
      // <line x1 = {this.state.kiten.x} y1 = {this.state.kiten.y} x2 = {this.state.cursor.x} y2 = {this.state.cursor.y} stroke="red" strokeWidth="5" />
      </svg></div>);
  }
});

React.render(<Component1/>, document.getElementById('component'));
