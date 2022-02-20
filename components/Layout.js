/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import CancelIcon from '@mui/icons-material/Cancel';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import classes from '../utils/classes';
import styled from '@emotion/styled';
// import { isMatch } from 'lodash';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link,
  CssBaseline,
  Switch,
  Badge,
  Button,
  MenuItem,
  Menu,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemText,
  Box,
  InputBase,
  useMediaQuery,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { getError } from '../utils/error';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Form from './Form';

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };

  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      console.log(data);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const [query, setQuery] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect !== 'backdropClick') {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
  };

  const isDesktop = useMediaQuery('(min-width:800px)');

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff'
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#f8c040' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  return (
    <>
      <Head>
        <title>{title ? `${title} - zonama` : 'zonama'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed" sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sidebarOpenHandler}
                sx={classes.menuButton}
              >
                <MenuIcon sx={classes.navbarButton} />
              </IconButton>
              <NextLink href="/" passHref>
                <Link style={{ textDecoration: 'none' }}>
                  <Typography sx={classes.brand}>zonama</Typography>
                </Link>
              </NextLink>
            </Box>
            <Drawer
              anchor="left"
              open={sidebarVisible}
              onClose={sidebarCloseHandler}
            >
              <List>
                <ListItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography>Shopping by Category</Typography>
                    <IconButton
                      aria-label="close"
                      onClick={sidebarCloseHandler}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider light />
                <NextLink href={'/search'} passHref>
                  <ListItem button component="a" onClick={sidebarCloseHandler}>
                    All
                  </ListItem>
                </NextLink>

                {categories.map((category) => (
                  <NextLink
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                      onClick={sidebarCloseHandler}
                    >
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </NextLink>
                ))}
              </List>
            </Drawer>

            <Box sx={isDesktop ? classes.visible : classes.hidden}>
              <Form onSubmit={submitHandler}>
                <Box sx={classes.searchForm}>
                  <InputBase
                    name="query"
                    sx={classes.searchInput}
                    placeholder="Search products"
                    onChange={queryChangeHandler}
                  />
                  <IconButton
                    type="submit"
                    sx={classes.searchButton}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Box>
              </Form>
            </Box>

            <Box>
              <MaterialUISwitch
                checked={darkMode}
                onChange={darkModeChangeHandler}
                sx={{ m: 1 }}
              />
              <Box sx={isDesktop ? classes.visible : classes.hidden}>
                <NextLink href="/cart" passHref>
                  <Link style={{ textDecoration: 'none' }}>
                    <Typography component="span">
                      {cart.cartItems.length > 0 ? (
                        <Badge
                          color="secondary"
                          badgeContent={cart.cartItems.length}
                        >
                          {'Cart'}
                          {'🛒'}
                        </Badge>
                      ) : (
                        '🛒  Cart'
                      )}
                    </Typography>
                  </Link>
                </NextLink>
              </Box>
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    sx={classes.navbarButton}
                  >
                    &nbsp; &nbsp;&nbsp; &nbsp; {' Hi,'} {userInfo.name} &nbsp;
                    {'👤'}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/order-history')
                      }
                    >
                      Order History
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, '/admin/dashboard')
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link style={{ textDecoration: 'none' }}>
                    <Typography component="span">
                      &nbsp;&nbsp;&nbsp;{'👤'}&nbsp;&nbsp;Login
                    </Typography>
                  </Link>
                </NextLink>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box>
          <Box>
            <Form
              onSubmit={submitHandler}
              sx={isDesktop ? classes.hidden : classes.visibleSearch}
            >
              <Box fullWidth sx={classes.searchFormMobile}>
                <InputBase
                  name="query"
                  sx={classes.searchInput}
                  placeholder="Search products"
                  onChange={queryChangeHandler}
                />
                <IconButton
                  type="submit"
                  sx={classes.searchButtonMobile}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Form>
          </Box>
        </Box>

        <Container component="main" sx={classes.main}>
          {children}
        </Container>

        <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} bgcolor="#1e2d3d">
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ fontWeight: 700, color: '#cfcfcf' }}>Help</Box>
                <Box>
                  <Link href="https://yuxianxu.com" color="#c4c4c4">
                    Contact
                  </Link>
                </Box>
                <Box sx={{ color: '#c4c4c4' }}>
                  <Link href="https://yuxianxu.com" color="#c4c4c4">
                    Support
                  </Link>
                </Box>
                <Box>
                  <Link href="/" color="#c4c4c4">
                    Privacy Notice
                  </Link>
                </Box>
                <Box>
                  <Link href="/" color="#c4c4c4">
                    Conditions of Use
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ fontWeight: 700, color: '#c4c4c4' }}>
                  User Account
                </Box>
                <Box>
                  <Link href="/profile" color="#c4c4c4">
                    Personal profile
                  </Link>
                </Box>
                <Box>
                  <Box>
                    <Link href="/register?redirect=/" color="#c4c4c4">
                      Register / Sign up
                    </Link>
                  </Box>
                  <Link href="/login" color="#c4c4c4">
                    Login
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ fontWeight: 700, color: '#c4c4c4' }}>
                  Admin Dashboard
                </Box>
                <Box>
                  <Link href="/admin/products" color="#c4c4c4">
                    Products page
                  </Link>
                </Box>
                <Box>
                  <Link href="/admin/orders" color="#c4c4c4">
                    Orders list
                  </Link>
                </Box>
                <Box>
                  <Link href="/admin/users" color="#c4c4c4">
                    Users page
                  </Link>
                </Box>
              </Grid>
            </Grid>
            <Box
              textAlign="center"
              sx={{
                textDecoration: 'none',
              }}
              pt={{ xs: 5, sm: 10 }}
              pb={{ xs: 5, sm: 0 }}
            >
              <Divider
                sx={{ backgroundColor: '#505559', marginBottom: '1rem' }}
              />
              <Grid
                item
                container
                spacing={2}
                sx={{ justifyContent: 'center' }}
              >
                <Grid
                  item
                  component={'a'}
                  target="_blank"
                  rel="noreferrer noopener"
                  href="/"
                >
                  <HomeIcon
                    // className={classes.snsIcon}
                    color={darkMode ? 'primary' : 'secondary'}
                  />
                </Grid>
                <Grid
                  item
                  component={'a'}
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.facebook.com/"
                >
                  <FacebookIcon color={darkMode ? 'primary' : 'secondary'} />
                </Grid>
                <Grid
                  item
                  component={'a'}
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.instagram.com/"
                >
                  <InstagramIcon color={darkMode ? 'primary' : 'secondary'} />
                </Grid>
                <Grid
                  item
                  component={'a'}
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://github.com/yuxianxu"
                >
                  <GitHubIcon
                    className={classes.snsIcon}
                    color={darkMode ? 'primary' : 'secondary'}
                  />
                </Grid>
                {/* add social media*/}
              </Grid>
              <Box
                item
                width="100%"
                container
                href="https://yuxianxu.com"
                justify="center"
                sx={{
                  textDecoration: 'none',
                  color: '#fff',
                  fontSize: '1rem',
                  paddingTop: '1rem',
                  '&:hover': {
                    color: theme.palette.info.main,
                  },
                }}
              >
                <Box component={'span'} color="white">
                  <Typography>
                    &copy;{new Date().getFullYear()} zonama e-commerce
                  </Typography>
                  <Typography
                    component={'a'}
                    href="https://yuxianxu.com"
                    sx={{
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      color: '#c4c4c4',
                    }}
                  >
                    Designed by Yuxian Xu 📩
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction label="Home" href="/" icon={<HomeIcon />} />
            <BottomNavigationAction
              label={
                cart.cartItems.length > 0 ? (
                  <Badge color="secondary" badgeContent={cart.cartItems.length}>
                    {'Cart'}
                    {''}
                  </Badge>
                ) : (
                  'Cart'
                )
              }
              href="/cart"
              icon={<ShoppingCartCheckoutIcon />}
            ></BottomNavigationAction>
            <BottomNavigationAction
              label="My Account"
              href="/profile"
              icon={<AccountBoxIcon />}
            />
          </BottomNavigation>
        </Paper>
      </ThemeProvider>
    </>
  );
}
