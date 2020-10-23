import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 400,
  },
  paginationRoot: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));
