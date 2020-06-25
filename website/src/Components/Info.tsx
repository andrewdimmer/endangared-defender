import { Container, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { AnimalKeysCertian } from "../@Types/types";

declare interface InfoProps {
  animalKey: AnimalKeysCertian;
  classes: any;
}

const Info: React.FunctionComponent<InfoProps> = ({ animalKey, classes }) => {
  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h3">{animalKey}</Typography>
      </Container>
    </Fragment>
  );
};

export default Info;
