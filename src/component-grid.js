import React from "react";
import _ from "lodash";
import cx from "classnames";
import {autobind} from "core-decorators";

class GridItem extends React.Component {
  render() {
    return (
      <div className="image-grid-item">
        {this.props.children}
      </div>
    );
  }
}

export default class ImageGrid extends React.Component {
  constructor() {
    super();

    // We use a unique id so that in css we can select only this instance
    // of the image grid.
    this.state = {
      id: _.uniqueId(),
    };
  }

  static propTypes = {
    margin: React.PropTypes.number,
    minWidth: React.PropTypes.number,
  };

  static defaultProps = {
    minWidth: 154,
    margin: 25,
  };

  // Calculate the width for images in the grid
  @autobind
  setImageWidth() {
    // Need the width of the container to see how many images can fit inside of it.
    const cw = this._container.clientWidth;
    // Minimum width of the images
    const mw = this.props.minWidth;
    // Spacing between images, needs to take into account the border
    const margin = this.props.margin;

    // We find the max number of min-width images that can fit in this row
    // by dividing the container width by the min width, then we set the
    // width of the images to something near that by dividing container width
    // by the aforementioned quantity.
    const size = (cw / Math.floor(cw / (mw + margin))) - margin;

    // Set the dimensions for children of this instance of the image grid
    this._stylesheet.innerHTML = `
      [data-instance-id=\"${this.state.id}\"] > * {
        width: ${size}px;
        height: ${size}px;
      }
    `;
  }

  componentDidMount() {
    this.setImageWidth();
    this.setImageWidth();

    window.addEventListener("resize", this.setImageWidth, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setImageWidth, false);
  }

  componentDidUpdate() {
    this.setImageWidth();
  }

  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      return (<GridItem key={index}>{child}</GridItem>);
    });

    return (
      <div className={cx("image-grid image-grid-container", this.props.className)}>
        <div className="image-grid-inner-container"
             ref={(x) => {this._container = x}}
             data-instance-id={this.state.id}>
          <style ref={(x) => {this._stylesheet = x}}></style>
          {children}
          <div className="clear"></div>
        </div>
      </div>
    );
  }
}
