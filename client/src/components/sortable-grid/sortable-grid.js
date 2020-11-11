import React from "react";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { TrackThumbnail } from "../../components";
import "./sortable-grid.scss";
import "../player/player.scss";

export default function SortableGrid(props) {
  const SortableItem = sortableElement(({ i, track }) => {
    return (
      <TrackThumbnail
        thumbnailUrl={track.thumbnailUrl}
        deleteTrack={props.deleteTrack}
        index={i}
        className="sortable-item"
      />
    );
  });

  const SortableContainer = sortableContainer(({ children }) => {
    return <div className="sortable-container">{children}</div>;
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const previousTracks = props.tracks;
    props.setTracks(arrayMove(previousTracks, oldIndex, newIndex));
  };

  return (
    <SortableContainer axis="xy" onSortEnd={onSortEnd}>
      {props.tracks.map((track, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          i={index}
          track={track}
        />
      ))}
    </SortableContainer>
  );
}
