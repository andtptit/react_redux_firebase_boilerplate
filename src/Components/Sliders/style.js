import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({

  root: {
    backgroundColor: 'var(--bg-color-sec)',
    padding: '2.6rem 2.6rem',
    borderRadius: 'var(--border-radius)',
    textAlign: 'center',
    boxShadow: 'var(--box-shadow)',
    height: '100%',
    border: '1px solid #333'
  },



  name: {
    fontSize: '1.8rem',
    lineHeight: 1.5,
    letterSpacing: '0.75px',
  },

  username: {
    fontSize: '1.4rem',
    fontWeight: 400,
    color: 'var(--label-color)',
    letterSpacing: '0.75px',
  },

  info: {
    margin: '2.4rem 0',

    '& p': {
      lineHeight: 2,
      fontSize: '1.6rem',
      letterSpacing: '0.75px',
      color: 'var(--text-color)',
    },
  },

  coin: {
    color: 'var(--label-color)',
    fontWeight: 'bold',
    fontSize: '2rem',
  },

  editBtn: {
    fontSize: '1.6rem',
  },

}));
