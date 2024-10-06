// src/components/Footer.js

import React from 'react';
import { Container, Typography, Box, Grid, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => (
  <Box sx={{ backgroundColor: 'primary.main', color: 'text.primary', py: 6, mt: 4 }}>
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom color="white">
            Car Auction App
          </Typography>
          <Typography variant="body2" color="grey.300">
            Buy and sell cars with ease. Our platform provides a seamless experience for car enthusiasts.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <IconButton color="inherit" href="https://facebook.com">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" href="https://twitter.com">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" href="https://instagram.com">
              <InstagramIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom color="white">
            Quick Links
          </Typography>
          <Link href="/" color="inherit" underline="none">
            Home
          </Link>
          <br />
          <Link href="/cars" color="inherit" underline="none">
            Cars
          </Link>
          <br />
          <Link href="/contact" color="inherit" underline="none">
            Contact Us
          </Link>
          <br />
          <Link href="/about" color="inherit" underline="none">
            About Us
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom color="white">
            Contact Us
          </Typography>
          <Typography variant="body2" color="grey.300">
            Email: support@carauctionapp.com
          </Typography>
          <Typography variant="body2" color="grey.300">
            Phone: +1 (234) 567-890
          </Typography>
          <Typography variant="body2" color="grey.300" sx={{ mt: 2 }}>
            Address: 123 Car Street, Motor City, USA
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2" color="grey.500">
          © {new Date().getFullYear()} Car Auction App. All rights reserved.
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Footer;
