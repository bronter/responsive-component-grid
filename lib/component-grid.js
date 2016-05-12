"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = void 0;

var _getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _uniqueId2 = require("lodash/uniqueId");

var _uniqueId3 = _interopRequireDefault(_uniqueId2);

var _jsx2 = require("babel-runtime/helpers/jsx");

var _jsx3 = _interopRequireDefault(_jsx2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _desc, _value, _class, _class2, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _coreDecorators = require("core-decorators");

var _componentGrid = require("../styles/component-grid.css");

var _componentGrid2 = _interopRequireDefault(_componentGrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = !0;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = void 0;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var GridItem = function (_React$Component) {
  (0, _inherits3["default"])(GridItem, _React$Component);

  function GridItem() {
    (0, _classCallCheck3["default"])(this, GridItem);
    return (0, _possibleConstructorReturn3["default"])(this, (0, _getPrototypeOf2["default"])(GridItem).apply(this, arguments));
  }

  (0, _createClass3["default"])(GridItem, [{
    key: "render",
    value: function render() {
      return (0, _jsx3["default"])("div", {
        className: "component-grid-item"
      }, void 0, this.props.children);
    }
  }]);
  return GridItem;
}(_react2["default"].Component);

var ComponentGrid = (_class = (_temp = _class2 = function (_React$Component2) {
  (0, _inherits3["default"])(ComponentGrid, _React$Component2);

  function ComponentGrid() {
    (0, _classCallCheck3["default"])(this, ComponentGrid);


    // We use a unique id so that in css we can select only this instance
    // of the component grid.

    var _this2 = (0, _possibleConstructorReturn3["default"])(this, (0, _getPrototypeOf2["default"])(ComponentGrid).call(this));

    _this2.state = {
      id: (0, _uniqueId3["default"])()
    };
    return _this2;
  }

  (0, _createClass3["default"])(ComponentGrid, [{
    key: "setChildWidth",


    // Calculate the width for components in the grid
    value: function setChildWidth() {
      // Need the width of the container to see how many components can fit inside of it.
      var cw = this._container.clientWidth;
      // Minimum width of the components
      var mw = this.props.minWidth;
      // Spacing between components
      var margin = this.props.margin;

      // We find the max number of min-width components that can fit in this row
      // by dividing the container width by the min width plus margin
      // We have to take into account margin between items as well
      var count = Math.floor(cw / (mw + margin));
      // Then we set the width of the components to something near that by
      // dividing container width by the aforementioned quantity.
      var size = cw / count - margin;

      // Be nice and kill margins on things that have nothing next to them
      // If we have less than two items per row things get wierd
      var nthChild = count > 1 ? ":nth-child(" + count + "n)" : "";

      // Set the dimensions for children of this instance of the component grid
      this._stylesheet.innerHTML = "\n      [data-instance-id=\"" + this.state.id + "\"] > .component-grid-item {\n        width: " + size + "px;\n        height: " + size + "px;\n        margin-right: " + margin + "px;\n        margin-bottom: " + margin + "px;\n      }\n      [data-instance-id=\"" + this.state.id + "\"] > .component-grid-item" + nthChild + " {\n        margin-right: 0px;\n      }\n    ";
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setChildWidth();
      this.setChildWidth();

      window.addEventListener("resize", this.setChildWidth, !1);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.setChildWidth, !1);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.setChildWidth();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var children = _react2["default"].Children.map(this.props.children, function (child, index) {
        return (0, _jsx3["default"])(GridItem, {}, index, child);
      });

      return _react2["default"].createElement(
        "div",
        {
          className: (0, _classnames2["default"])("component-grid component-grid-container", this.props.className),
          ref: function ref(x) {
            _this3._container = x;
          }
        },
        (0, _jsx3["default"])("div", {
          className: "component-grid-inner-container",
          "data-instance-id": this.state.id
        }, void 0, children, (0, _jsx3["default"])("div", {
          className: "clear"
        }, void 0, _react2["default"].createElement("style", { ref: function ref(x) {
            _this3._stylesheet = x;
          } })))
      );
    }
  }]);
  return ComponentGrid;
}(_react2["default"].Component), _class2.propTypes = {
  margin: _react2["default"].PropTypes.number,
  minWidth: _react2["default"].PropTypes.number
}, _class2.defaultProps = {
  minWidth: 154,
  margin: 25
}, _temp), (_applyDecoratedDescriptor(_class.prototype, "setChildWidth", [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2["default"])(_class.prototype, "setChildWidth"), _class.prototype)), _class);
exports["default"] = ComponentGrid;