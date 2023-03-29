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

  carouselItem: {
    width: 300,
    // textAlign: 'center',
    boxSizing: 'border-box'
  },



  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    padding: '0rem 1rem',
    marginRight: '1rem',
    cursor: 'pointer',
    border: '1px solid #efefef',
    background: "url('https://i.pinimg.com/originals/9a/3d/5c/9a3d5c4a8d3283b4e2b9fa1f53db544d.jpg') no-repeat center center",
    backgroundSize: 'cover',
    '&:hover': {
      transform: "translateY(-2px)",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    },
    
  },

  title: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginTop: '1rem',
    color: 'var(--accent-color)'
  },

  cardTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginTop: '1rem',
    color: 'var(--title-color)'
  },

  cardContent: {
    fontSize: "1.1rem",
    marginBottom: '1.2rem',
    color: 'var(--second-color)'
  },

  button: {
    backgroundColor: "#0077ff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: '1rem 1.5rem',
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    '&:hover': {
      backgroundColor: "#005dff",
      transform: "translateY(-2px)",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    },
  },

  "@media (max-width: 992px)": {
    carouselItem: {
      width: 200,
    },
    
    cardTitle: {
      fontSize: "1.3rem",
    },

    title: {
      fontSize: "1.1rem",
    },
},

}));
