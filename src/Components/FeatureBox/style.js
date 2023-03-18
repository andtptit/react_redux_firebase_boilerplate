import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '1.6rem 1.2rem',
    boxShadow: 'var(--box-shadow-2)',
    borderRadius: 'var(--sm-border-radius)',
    cursor: 'pointer',
    backgroundColor: 'var(--bg-color-accent)',
    transition: 'all 0.25s',
    // border: "10px solid white",
    minHeight: '7rem',
    height: '100%',

    '&:hover, &:active': {
      backgroundColor: 'var(--hover-color)',
    },

    [theme.breakpoints.up('sm')]: {
      padding: '2.4rem 1.8rem',
    },

    [theme.breakpoints.up('md')]: {
      minHeight: '15rem',
    },
  },

  icon: {
    width: '3.2rem',
    height: '3.2rem',
    marginRight: '1.2rem',
  },

  title: {
    color: 'var(--title-color)',
    fontWeight: 600,
    fontSize: '1.6rem',
    letterSpacing: '0.5px',
  },

  subTitle: {
    display: 'none',
    marginTop: '0.6rem',
    color: 'var(--label-color)',
    fontSize: '1.2rem',
    fontWeight: 500,
    letterSpacing: '0.5px',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));
