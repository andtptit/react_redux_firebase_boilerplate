import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    width: '100%',

    backgroundColor: 'var(--bg-color-sec)',
    // boxShadow: 'var(--box-shadow)',

    position: 'relative',

    '&::-webkit-scrollbar': {
      width: '2px',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: 'var(--bg-color-sec)',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--bg-color-accent)',
    },
  },

  titleWrap: {
    width: '100%',
    padding: '1.8rem 2.8rem',
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 2,
  },

  title: {
    color: '#293749',
    textTransform: 'capitalize',
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: '0.75px',
  },

  infoIcon: {
    color: '#fff',
    cursor: 'pointer',
  },

  boxWrap: {
    padding: '1.2rem 2.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.4rem',
  },

  skeleton: {
    height: '5rem',
  },

  box: {
    padding: '0.8rem 1.4rem',
    border: 'solid 1px var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  avt: {
    borderRadius: '50%',
    width: '5rem',
    height: '5rem',
  },

  content: {
    flexGrow: 1,
    margin: '0 1.2rem',
  },

  name: {
    fontSize: '1.4rem',
    fontWeight: 500,
    lineHeight: 1.75,
    color: 'var(--title-color)',
    fontFamily: "'Noto Serif KR', serif",
  },

  meaning: {
    fontSize: '1.4rem',
    fontWeight: 500,
    lineHeight: 1.75,
    color: 'var(--title-color)',
  },

  "@media (max-width: 992px)": {
    name: {
      fontSize: '1.1rem',
    },

    boxWrap: {
      padding: '0.8rem 1rem',
    },

    box: {
      padding: '0.2rem 0.5rem',
    },

    meaning: {
      fontSize: '1.1rem',
    },
  },

  count: {
    fontSize: '1.4rem',
    color: 'var(--label-color)',
    fontWeight: 500,
  },

  medalIcon: {
    width: '4rem',
    height: '4rem',
  },

  nthTop: {
    width: '4rem',
    height: '4rem',
    lineHeight: '4rem',
    textAlign: 'center',
    fontSize: '1.6rem',
    fontWeight: 800,
    color: '#fff',
    clipPath: 'polygon(50% 0, 100% 30%, 100% 70%, 50% 100%, 0 70%, 0 30%)',
  },
}));
