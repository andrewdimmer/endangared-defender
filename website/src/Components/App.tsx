import React, { Fragment } from "react";
import { PictureMode, AnimalKeys } from "../@Types/types";
import { styles } from "../Styles";
import Camera from "./Camera";
import Info from "./Info";
import LoadingScreen from "./LoadingScreen";
import NavBar from "./NavBar";
import Upload from "./Upload";

const App: React.FunctionComponent = () => {
  const [animalKey, setAnimalKey] = React.useState<AnimalKeys>(undefined);
  const [mode, setMode] = React.useState<PictureMode>("upload");
  const [loadingMessage, setLoadingMessage] = React.useState<string>("");
  const navbarRef = React.useRef<HTMLDivElement>(null);

  const back = () => {
    setAnimalKey(undefined);
  };

  const toggleMode = () => {
    mode === "camera" ? setMode("upload") : setMode("camera");
  };

  const classes = styles();

  return (
    <Fragment>
      <NavBar
        navbarRef={navbarRef}
        title={animalKey ? animalKey : "EndangARed Defender"}
        mode={animalKey ? undefined : mode}
        back={animalKey ? back : undefined}
        toggleMode={animalKey ? undefined : toggleMode}
      />
      {animalKey ? (
        <Info animalKey={animalKey} classes={classes} />
      ) : mode === "camera" ? (
        <Camera
          navbarRef={navbarRef}
          setAnimalKey={setAnimalKey}
          setLoadingMessage={setLoadingMessage}
          classes={classes}
        />
      ) : (
        <Upload
          setAnimalKey={setAnimalKey}
          setLoadingMessage={setLoadingMessage}
          classes={classes}
        />
      )}
      <LoadingScreen loadingMessage={loadingMessage} />
    </Fragment>
  );
};

export default App;
