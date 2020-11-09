import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AuthService, MessagingService } from "../../services";
import "./side-menu.scss";

export default function SideMenu(props) {
  const [authService, setAuthService] = useState(null);
  const [messagingService, setMessagingService] = useState(null);

  useEffect(() => {
    setAuthService(new AuthService());
    setMessagingService(new MessagingService());
  }, []);

  const [state, setState] = React.useState({
    sideMenu: false,
  });

  const toggleSideMenu = (sideMenu, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [sideMenu]: open });
  };

  const handleLogout = () => {
    authService.logout().then(() => {
      messagingService.disconnectSocket();
      props.loadUserData();
    });
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleSideMenu(anchor, false)}
      onKeyDown={toggleSideMenu(anchor, false)}
    >
      <List>
        <ListItem onClick={handleLogout} button key={"logout"}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"sideMenu"}>
        <Button
          style={{ height: "100%" }}
          onClick={toggleSideMenu("sideMenu", true)}
        >
          {!state.sideMenu ? (
            <MenuIcon style={{ fontSize: "40px", color: "white" }} />
          ) : (
            <MenuOpenIcon style={{ fontSize: "40px", color: "white" }} />
          )}
        </Button>
        <Drawer
          anchor={"left"}
          open={state["sideMenu"]}
          onClose={toggleSideMenu("sideMenu", false)}
        >
          {list("sideMenu")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
