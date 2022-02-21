const classes = {
  appbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#ffffff',
      marginLeft: 1,
    },
  },

  hidden: {
    display: 'none',
  },

  visible: {
    display: 'initial',
  },

  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textDecoration: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  nav: {
    textAlign: 'center',
    marginTop: 10,
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  transparentBackground: {
    backgroundColor: 'transparent',
    marginTop: 15,
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',
  },
  reviewForm: {
    maxWidth: 800,
    width: '100%',
  },
  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  menuButton: { padding: 0 },

  searchForm: {
    border: '1px solid white',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  visibleSearch: {
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
    zIndex: '2'
  },
  searchFormMobile: {    
    mt: '1rem',
    border: '1px solid #e3e3e3',
    backgroundColor: 'white',
    borderRadius: 3,
    display: 'flex',
    
  },
  searchInput: {
    paddingLeft: 1,
    width: '80%',
    color: '#000000',
    '& ::placeholder': {
      color: '#606060',
    },
  },
  section: {
    marginTop: 1,
    marginBottom: 1,
  },
  searchButton: {
    backgroundColor: '#f8c040',
    padding: '4px 8px',
    borderRadius: '0 12px 12px 0',
    '& span': {
      color: '#000000',
    },
  },
  searchButtonMobile: {
    backgroundColor: '#f8c040',
    padding: '1px 10px',
    borderRadius: '0 12px 12px 0',
    '& span': {
      color: '#000000',
    },
  },
  sort: {
    marginRight: 1,
  },
  mt1: {
    marginTop: '10rem',
  },
  mt2: {
    marginTop: '2rem',
    minWidth: '100%',
    height: '30vw',
  },

  responsive: {
    width:'100%',
    height: '30vw',
  },

  fullHeight: { height: '100vh' },
  fullContainer: { height: '100vh' },
  mapInputBox: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    right: 0,
    margin: '10px auto',
    width: 300,
    height: 40,
    '& input': {
      width: 250,
    },
  },
  heroPrice: {
    fontWeight:700,
  },
};

export default classes;
