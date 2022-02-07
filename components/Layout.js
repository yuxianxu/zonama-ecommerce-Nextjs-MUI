import React, { Children } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { AppBar, Container, Toolbar, Typography, Link } from '@mui/material';
import useStyles from '../utils/styles';

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>zonama</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/" passHref>
              <Link>
            <Typography className={classes.brand}>zonama</Typography>
              </Link>
          </NextLink>
          <div className={classes.grow}></div>
          <div>
              <NextLink href="/cart" passHref>
                  <Link>Cart</Link>
              </NextLink>
              <NextLink href="/login" passHref>
                  <Link>Login</Link>
              </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>
          All rights reserved. Yuxian Xu ecommerce shopping store.
        </Typography>
      </footer>
    </div>
  );
}
