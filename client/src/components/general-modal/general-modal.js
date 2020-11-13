import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    color: "#fff",
    width: 260,
    backgroundColor: "black",
    border: "1px solid #f50057",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
}));

export default function GeneralModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Delete {props.item && props.item.title}?</h2>
      <Button
        onClick={() => props.action(props.item)}
        variant="outlined"
        color="secondary"
      >
        DELETE
      </Button>
      <GeneralModal />
    </div>
  );

  return (
    <Modal
      id="generalModal"
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="simple-modal-title"
    >
      {body}
    </Modal>
  );
}
