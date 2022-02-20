/* eslint-disable @next/next/no-img-element */
import { CardMedia, Grid, Link, Typography } from '@mui/material';
import axios from 'axios';
import NextLink from 'next/link';
// import { useRouter } from 'next/router';
import { useContext } from 'react';
import Carousel from 'react-material-ui-carousel';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import classes from '../utils/classes';
import { Box } from '@mui/system';

export default function Home(props) {
  // const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { featuredProducts, topRatedProducts } = props;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry, Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    // router.push('/cart');
  };

  return (
    <Layout>
      <Carousel
        sx={classes.mt2}
        animation="fade"
        stopAutoPlayOnHover
        duration="1000"
        swipe
        indicators
        navButtonsAlwaysVisible
        layout="cover"
      >
        {featuredProducts.map((product) => (
          <NextLink
            key={product._id}
            href={`/product/${product.slug}`}
            passHref
          >
            <Link>
              <CardMedia
                // component="img"
                image={product.featuredImage}
                alt={product.name}
                sx={classes.responsive}
                passHref
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'end',
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'right',
                      flexDirection: 'column',
                      alignItems: 'center',
                      fontSize: '1rem',
                      color: '#ffffff',
                      backgroundColor: 'primary.main',
                      opacity: 0.65,
                      padding: '0.5rem',
                    }}
                  >
                    <Typography sx={classes.heroPrice}>
                      {'$'}
                      {product.price}
                    </Typography>
                    <Typography sx={classes.heroText}>
                      {product.name}
                    </Typography>
                  </Box>
                </Box>
              </CardMedia>
            </Link>
          </NextLink>
        ))}
      </Carousel>
      <Typography variant="h2">Popular Products</Typography>
      <Grid container spacing={3}>
        {topRatedProducts.map((product) => (
          <Grid item md={4} key={product.name}>
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    '-reviews'
  )
    .lean()
    .limit(5);
  const topRatedProductsDocs = await Product.find({}, '-reviews')
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}
