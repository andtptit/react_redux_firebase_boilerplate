
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
      padding: '2.5rem 3.5rem',
      boxShadow: 'var(--box-shadow)',
      borderRadius: 'var(--border-radius)',
      width: '35rem',
      backgroundColor: 'var(--bg-color-sec)',
  
      '& > *': {
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
      },
    },

    rootSignup: {
        padding: '3rem 4rem',
        boxShadow: 'var(--box-shadow)',
        borderRadius: 'var(--border-radius)',
        width: '100%',
        backgroundColor: 'var(--bg-color-sec)',
    
        '& > *': {
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
        },
      },
  
    title: {
      fontSize: '2.5rem',
      color: 'var(--text-color)',
    },

    button: {
        fontSize: '1.5rem',
        width: '100%',
        marginTop: '1.7rem',
        marginBottom: '1.7rem'
      },
    
      buttonSign: {
        fontSize: '1.5rem',
        marginTop: '1.7rem',
        marginBottom: '1.7rem',
      },
      
    form: {
        width: '100%',
        paddingBottom: '1rem'
    },

    label: {
        fontSize: '1.3rem',
    },
    
  
    labelIcon: {
      fontSize: '3.5rem',
      color: 'var(--text-color)',
    },
  
    forgotPw: {
      color: 'var(--title-color)',
      opacity: 0.65,
      fontWeight: 500,
      fontSize: '1.4rem',
      textAlign: 'right',
  
      '&:hover': {
        opacity: 1,
      },
    },
  
    icon: {
      fontSize: '1.5rem',
      color: 'var(--grey)',
      cursor: 'pointer',
    },
  
    visiblePw: {
      color: 'var(--primary-color)',
    },

    avtWrap: {
        width: '8rem',
        height: '8rem',
        position: 'relative',
      },
    
      avt: {
        borderRadius: '50%',
      },

    radio: {
        position: 'inherit',
        marginRight: '1rem'
    },

    "@media (max-width: 992px)": {
      form: {
        paddingBottom: '0.2rem'
      },

      button: {
        fontSize: '1.3rem',
        width: '100%',
        marginTop: '1rem',
        marginBottom: '1rem'
      },
    
      buttonSign: {
        fontSize: '1.3rem',
        marginTop: '1rem',
        marginBottom: '1rem',
        minWidth: '50%'
      },
    }

}));