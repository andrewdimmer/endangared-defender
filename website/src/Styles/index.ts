import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(2),
    },
    margined: {
      margin: theme.spacing(2),
    },
    marginedTopBottom: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    marginedPadded: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
    },
    marginRight: {
      marginRight: theme.spacing(2),
    },
    pageTitle: {
      padding: theme.spacing(2),
      textAlign: "center",
    },
    successColor: {
      color: "#FFFFFF",
      backgroundColor: theme.palette.success.main,
    },
    infoColor: {
      color: "#FFFFFF",
      backgroundColor: theme.palette.info.main,
    },
  })
);
