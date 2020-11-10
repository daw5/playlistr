import React from "react";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { TrackThumbnail } from "../../components";
import "./sortable-grid.scss";
import "../player/player.scss";

const SortableItem = sortableElement(({ track }) => (
  <TrackThumbnail thumbnailUrl={track.thumbnailUrl} className="sortable-item" />
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
      {props.tracks.map((track, index) => (
        <SortableItem key={`item-${index}`} index={index} track={track} />
      ))}
    </SortableContainer>
  );
}
