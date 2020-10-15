import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  paginationRoot: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));
