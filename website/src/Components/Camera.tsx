import { Button, Container, Typography } from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import React, { Fragment } from "react";
import Webcam from "react-webcam";
import { AnimalKeys } from "../@Types/types";
import { isSafari } from "../Scripts/browserIdentification";
import { findAnimals } from "../Scripts/tensorflow";

declare interface CameraProps {
  navbarRef: React.RefObject<HTMLDivElement>;
  setAnimalKey: (animalKey: AnimalKeys) => void;
  setLoadingMessage: (loadingMessage: string) => void;
  classes: any;
}

const Camera: React.FunctionComponent<CameraProps> = ({
  navbarRef,
  setAnimalKey,
  setLoadingMessage,
  classes,
}) => {
  const [maxWidth, setMaxWidth] = React.useState<number>(0);
  const [maxHeight, setMaxHeight] = React.useState<number>(0);
  const screenWidth = React.useRef<HTMLDivElement>(null);
  const screenHeight = React.useRef<HTMLDivElement>(null);
  const webcamRef = React.useRef<any>(null);
  const takePictureRef = React.useRef<HTMLDivElement>(null);
  const [webcamError, setWebcamError] = React.useState<string>("");
  const [useVideoConstraints, setUseVideoContraints] = React.useState<boolean>(
    true
  );

  const capture = () => {
    setLoadingMessage("Analyzing Image...");
    const imageSrc = webcamRef.current?.getScreenshot();
    (document.getElementById("automlImage") as HTMLImageElement).src = imageSrc;
    setTimeout(
      () =>
        findAnimals()
          .then((prediction) => setAnimalKey(prediction))
          .catch((err) => console.log(err))
          .finally(() => setLoadingMessage("")),
      10
    );
  };

  const computeWidthAndHeight = () => {
    if (
      screenWidth.current &&
      screenHeight.current &&
      navbarRef.current &&
      takePictureRef.current &&
      (screenWidth.current.clientWidth !== maxWidth ||
        screenHeight.current.clientHeight !== maxHeight)
    ) {
      setMaxHeight(
        screenHeight.current.clientHeight -
          navbarRef.current.clientHeight -
          takePictureRef.current.clientHeight -
          4
      );
      setMaxWidth(screenWidth.current.clientWidth);
    }
  };

  const initializeSize = () => {
    computeWidthAndHeight();
    window.addEventListener("resize", () => {
      setTimeout(computeWidthAndHeight, 1);
    });
  };

  const getAspectRatio = () => {
    if (maxHeight === 0 && maxWidth === 0) {
      return undefined;
    } else {
      const orientation = window.screen.orientation;
      if (orientation.type.indexOf("portrait") >= 0) {
        return maxHeight / (maxWidth - 1);
      } else {
        return maxWidth / (maxHeight - 1);
      }
    }
  };

  return (
    <Fragment>
      <div
        ref={screenWidth}
        style={{
          width: "100%",
          height: 0,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <div
        ref={screenHeight}
        style={{
          width: 0,
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      {webcamError === "" ? (
        <Fragment>
          <Webcam
            audio={false}
            width={maxWidth}
            height={maxHeight}
            onUserMediaError={(err) => {
              const errString = err.toString();
              if (errString.indexOf("Malformed constraints object") >= 0) {
                setUseVideoContraints(false);
              } else if (
                errString.indexOf("Could not start video source") < 0
              ) {
                setWebcamError(errString);
              }
            }}
            ref={webcamRef}
            videoConstraints={
              !isSafari
                ? useVideoConstraints
                  ? {
                      aspectRatio: getAspectRatio(),
                      facingMode: "environment",
                    }
                  : {
                      aspectRatio: getAspectRatio(),
                    }
                : {
                    facingMode: "environment",
                  }
            }
          />
          <Container className={classes.pageTitle} ref={takePictureRef}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<CameraAltIcon />}
              onClick={capture}
            >
              Take Picture
            </Button>
          </Container>
        </Fragment>
      ) : (
        <Container className={classes.pageTitle}>
          <Typography variant="h3">Error: Unable to access camera.</Typography>
          <Typography variant="body1">{webcamError}</Typography>
        </Container>
      )}
      {setTimeout(initializeSize, 1) && <Fragment />}
    </Fragment>
  );
};

export default Camera;
