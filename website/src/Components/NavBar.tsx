import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React from "react";
import { PictureMode } from "../@Types/types";

declare interface NavBarProps {
  navbarRef: React.RefObject<HTMLDivElement>;
  title: string;
  mode?: PictureMode;
  back?: () => void;
  toggleMode?: () => void;
}

const navBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const NavBar: React.FunctionComponent<NavBarProps> = ({
  navbarRef,
  title,
  mode,
  back,
  toggleMode,
}) => {
  const classes = navBarStyles();

  return (
    <AppBar position="static" ref={navbarRef}>
      <Toolbar>
        {back && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="back"
            onClick={back}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {mode && (
          <Button
            variant="contained"
            color="inherit"
            className={classes.menuButton}
            startIcon={
              mode === "camera" ? <CloudUploadIcon /> : <CameraAltIcon />
            }
            onClick={toggleMode}
          >
            {mode === "camera" ? "Upload Photo" : "Take Photo"}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
