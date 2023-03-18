import { makeStyles } from '@material-ui/core/styles';

const imgSize = '4rem',
  iconSize = '1rem';

export default makeStyles((theme) => ({
  navWrapper: {
    paddingBottom: 'var(--nav-height)',
  },

  nav: {
    backgroundColor: 'var(--bg-color-sec)',
    // height: 'var(--nav-height)',
    boxShadow: 'var(--box-shadow)',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
  },

  navCus: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'normal',
  },

  logo: {
    marginRight: '0.8rem',
    width: 'auto !important',
  },

  imgSize: {
    height: imgSize,
    width: imgSize,
  },

  menuSize: {
    height: '3rem',
    width: '3rem',
    marginLeft: 'auto',
    marginRight: '15px',
    padding: "1px"
  },

  iconSize: {
    fontSize: `${iconSize} !important`,
    color: 'var(--label-color)',
  },

  control: {
    marginLeft: 'auto',
  },

  avt: {
    transition: theme.transitions.easing.easeIn,
    '&:hover, &:active': {
      opacity: 0.85,
    },
  },

  searchIcon: {
    fontSize: iconSize,
    color: 'var(--label-color)',
  },

  loginBtn: {
    height: '3.2rem',
    minWidth: '10rem',
  },

  loginLabel: {
    fontSize: '1.2rem',
  },

  title: {
    color: '#03009F',
    fontWeight: 600,
    fontSize: '1.6rem',
    letterSpacing: '0.5px',
    paddingRight: '10px',
  },

  navDropdown: {
    backgroundColor: '#f9f9f9',
    padding: '3px',
  },

  navDropdownTitle: {
    fontSize: '15px',
    fontWeight: '500',
  }
}));
