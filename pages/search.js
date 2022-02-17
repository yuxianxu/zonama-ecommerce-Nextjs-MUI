import {
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import Cancel from '@mui/icons-material/Cancel';

const PAGE_SIZE = 3;

export default function Search(props) {
  const classes = useStyles();
  const router = useRouter();
  const {
    query = 'all',
    category = 'all',
    brand = 'all',
    price = 'all',
    rating = 'all',
    sort = 'featured',
  } = router.query;
  const { products, countProducts, categories, brands, pages } = props;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };

  const { state, dispatch } = useContext(Store);

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
    <Layout title="Search">
      <Grid className={classes.mt1} container spacing={1}>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Categories</Typography>
                <Select fullWidth value={category} onChange={categoryHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {categories &&
                    categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid item md={9}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            {products.length === 0 ? 'No' : countProducts} Results
            {query !== 'all' && query !== '' && ' : ' + query}
            {category !== 'all' && ' : ' + category}
            {brand !== 'all' && ' : ' + brand}
            {price !== 'all' && ' : Price ' + price}
            {(rating !== 'all') & (' : Rating' + rating + ' & up ')}
            {(query !== 'all' && query !== '') ||
            category !== 'all' ||
            brand !== 'all' ||
            rating !== 'all' ||
            price !== 'all' ? (
              <Button onClick={() => router.push('/search')}>
                <Cancel />
              </Button>
            ) : null}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <ProductItem
                product={product}
                addToCartHandler={addToCartHandler}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const brand = query.brand || '';
  const price = query.price || '';
  const rating = query.rating || '';
  const sort = query.sort || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const brandFilter = brand && brand !== 'all' ? { brand } : {};
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};

  const order =
    sort === 'featured'
      ? { featured: -1 }
      : sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : sort === 'toprated'
      ? { rating: -1 }
      : sort === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct('category');
  const brands = await Product.find().distinct('brand');
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    '-reviews'
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });

  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  };
}
