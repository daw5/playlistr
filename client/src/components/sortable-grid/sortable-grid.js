import React, { Component } from "react";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import ReactPlayer from "react-player";
import arrayMove from "array-move";
import "./sortable-grid.scss";
import "../player/player.scss";

const SortableItem = sortableElement(({ value }) => (
  <div className="sortable-item player-wrapper">
    <ReactPlayer
      className="react-player"
      url={value}
      width="100%"
      height="100%"
    />
  </div>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <div className="sortable-container">{children}</div>;
});

export default class SortableGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  render() {
    const { items } = this.state;

    return (
      <SortableContainer axis="xy" onSortEnd={this.onSortEnd}>
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
      </SortableContainer>
    );
  }
}
