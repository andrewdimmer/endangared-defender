import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InfoIcon from "@material-ui/icons/Info";
import React, { Fragment } from "react";
import { AnimalKeysCertian } from "../@Types/types";
import { getAnimalInfo } from "../Scripts/data";

declare interface InfoProps {
  animalKey: AnimalKeysCertian;
  classes: any;
}

const Info: React.FunctionComponent<InfoProps> = ({ animalKey, classes }) => {
  const animalInfo = getAnimalInfo(animalKey);

  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h3">{animalInfo.title}</Typography>
      </Container>
      <Container>
        {animalInfo.ar !== undefined && (
          <a href={animalInfo.ar.usdz}>
            <img
              alt="AR Preview"
              src={animalInfo.ar.img}
              className={classes.fullWidth}
            />
          </a>
        )}
        <Typography variant="body1" className={classes.marginedTopBottom}>
          {animalInfo.info}
        </Typography>
        {animalInfo.resources && (
          <Fragment>
            <Typography variant="h5">Resources</Typography>
            <Typography variant="body1">{`These organizations are working to help and protect ${animalKey}, and you can support their efforts to keep this species from going extinct.`}</Typography>
            <List>
              {animalInfo.resources.map((value, index) => (
                <ListItem key={"resources_" + index}>
                  <ListItemAvatar>
                    <Avatar className={classes.infoColor}>
                      <InfoIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={value.label}
                    secondary={
                      <a href={value.link} target="_blank">
                        Click Here for more info!
                      </a>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Fragment>
        )}
        {animalInfo.animalsToTry && (
          <List>
            {animalInfo.animalsToTry.map((value, index) => (
              <ListItem key={"animalsToTry_" + index}>
                <ListItemAvatar>
                  <Avatar className={classes.successColor}>
                    <CheckCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={value} />
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </Fragment>
  );
};

export default Info;
