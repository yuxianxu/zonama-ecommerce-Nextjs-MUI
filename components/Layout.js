import React, { Children } from 'react';
import Head from 'next/head';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import useStyles from '../utils/styles';

export default function Layout({children}) {
    const classes = useStyles();
  return <div>
      <Head>
        <title>zonama</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
          <Toolbar>
              <Typography>zonama</Typography>
          </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
          <Typography>All rights reserved. Yuxian Xu ecommerce shopping store.</Typography>
      </footer>
  </div>;
}
