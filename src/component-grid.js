import React from "react";
import _ from "lodash";
import cx from "classnames";
import {autobind} from "core-decorators";
import styles from "../styles/component-grid.css";

// Wrapper class so that we don't bork styles for components that
// have been passed in
class GridItem extends React.Component {
  render() {
    return (
      <div className="component-grid-item">
        {this.props.children}
      </div>
    );
  }
}

export default class ComponentGrid extends React.Component {
  constructor() {
    super();

    // We use a unique id so that in css we can select only this instance
    // of the component grid.
    this.state = {
      id: _.uniqueId(),
    };
  }

  // The component grid will keep all items above minWidth, growing
  // and grow items into any available space after minWidth has been
  // distributed.
  static propTypes = {
    margin: React.PropTypes.number,
    minWidth: React.PropTypes.number,
  };

  // Arbitrary and project
  static defaultProps = {
    minWidth: 154,
    margin: 25,
  };

  // Calculate the width for components in the grid
  @autobind
  setChildWidth() {
    // Need the width of the container to see how many components can fit inside of it.
    // HACK: Magic numbers, ain't nothing to it, gangsta rap made me do it.
    // (also rounding errors...)
    const cw = Math.floor(this._container.clientWidth) - 1;
    // Minimum width of the components
    const mw = this.props.minWidth;
    // Spacing between components
    const margin = this.props.margin;

    // We find the max number of min-width components that can fit in this row
    // by dividing the container width by the min width plus margin
    // We have to take into account margin between items as well
    // Running it through Math.floor creates the "growing" effect when we size
    // up the window.
    const count = Math.floor(cw / (mw + margin));
    // Then we set the width of the components to something near that by
    // dividing container width by the aforementioned quantity.
    // We subtract margin since we factored it into count
    // We end up with one extra margin width at the end of the row, so
    // we divide it evenly amongst the items in the row (margin / count)
    const size = ((cw / count) - margin) + (margin / count);

    // Be nice and kill margins on things that have nothing next to them
    // If we have less than two items per row things get wierd
    const nthChild = count > 1 ? `:nth-child(${count}n)` : ``;

    // Set the dimensions for children of this instance of the component grid
    this._stylesheet.innerHTML = `
      [data-instance-id=\"${this.state.id}\"] > .component-grid-item {
        width: ${size}px;
        height: ${size}px;
        margin-right: ${margin}px;
        margin-bottom: ${margin}px;
      }
      [data-instance-id=\"${this.state.id}\"] > .component-grid-item::after {
        content: '${count}';
        width: 0px;
        height: 0px;
      }
      [data-instance-id=\"${this.state.id}\"] > .component-grid-item${nthChild} {
        margin-right: 0px;
      }
    `;
  }

  componentDidMount() {
    this.setChildWidth();
    this.setChildWidth();

    window.addEventListener("resize", this.setChildWidth, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setChildWidth, false);
  }

  componentDidUpdate() {
    this.setChildWidth();
  }

  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      return (<GridItem key={index}>{child}</GridItem>);
    });

    return (
      <div
        className={cx("component-grid component-grid-container", this.props.className)}
        ref={(x) => {this._container = x}}
      >
        <div className="component-grid-inner-container"
             data-instance-id={this.state.id}>
          {children}
          <div className="clear">
            <style ref={(x) => {this._stylesheet = x}}></style>
          </div>
        </div>
      </div>
    );
  }
}
