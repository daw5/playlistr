import React from "react";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import "./sortable-grid.scss";
import "../player/player.scss";

const SortableItem = sortableElement(({ value }) => (
  <img src={value.thumbnailUrl} className="sortable-item" />
));

const SortableContainer = sortableContainer(({ children }) => {
  return <div className="sortable-container">{children}</div>;
});

export default function SortableGrid(props) {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const previousTracks = props.tracks;
    props.setTracks(arrayMove(previousTracks, oldIndex, newIndex));
  };

  return (
    <SortableContainer axis="xy" onSortEnd={onSortEnd}>
      {props.tracks.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </SortableContainer>
  );
}
