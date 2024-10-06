// src/components/CarList.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  CardActions,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [makeFilter, setMakeFilter] = useState('');
  const [makes, setMakes] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [page, setPage] = useState(1);
  const carsPerPage = 9;

  useEffect(() => {
    // Fetch the list of cars
    api.get('/cars')
      .then((response) => {
        setCars(response.data);
        // Extract unique makes for the filter
        const uniqueMakes = [...new Set(response.data.map((car) => car.make))];
        setMakes(uniqueMakes);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }, []);

  // Filtered cars based on search and make filter
  const filteredCars = cars.filter((car) => {
    return (
      (car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (makeFilter ? car.make === makeFilter : true)
    );
  });

  // Sorting the cars
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortOption) {
      case 'price_low_high':
        return a.price - b.price;
      case 'price_high_low':
        return b.price - a.price;
      case 'year_new_old':
        return b.year - a.year;
      case 'year_old_new':
        return a.year - b.year;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedCars.length / carsPerPage);
  const paginatedCars = sortedCars.slice((page - 1) * carsPerPage, page * carsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Cars
      </Typography>

      {/* Search and Filter Section */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            placeholder="Search by make or model"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1); // Reset to first page
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="make-filter-label">Filter by Make</InputLabel>
            <Select
              labelId="make-filter-label"
              value={makeFilter}
              onChange={(e) => {
                setMakeFilter(e.target.value);
                setPage(1); // Reset to first page
              }}
              label="Filter by Make"
            >
              <MenuItem value="">
                <em>All Makes</em>
              </MenuItem>
              {makes.map((make) => (
                <MenuItem key={make} value={make}>
                  {make}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              label="Sort By"
              startAdornment={
                <InputAdornment position="start">
                  <SortIcon />
                </InputAdornment>
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="price_low_high">Price: Low to High</MenuItem>
              <MenuItem value="price_high_low">Price: High to Low</MenuItem>
              <MenuItem value="year_new_old">Year: New to Old</MenuItem>
              <MenuItem value="year_old_new">Year: Old to New</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Car Cards */}
      <Grid container spacing={4}>
        {paginatedCars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Car Image */}
              {car.imageUrl ? (
                <CardMedia
                  component="img"
                  image={`http://localhost:8080/images/${car.imageUrl}`}
                  alt={`${car.make} ${car.model}`}
                  sx={{ height: 200 }}
                />
              ) : (
                <CardMedia
                  component="img"
                  image="https://via.placeholder.com/300x200.png?text=No+Image"
                  alt="No Image Available"
                  sx={{ height: 200 }}
                />
              )}
              {/* Car Details */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5">
                  {car.make} {car.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Year: {car.year} | Mileage: {car.mileage.toLocaleString()} km
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ${car.price.toLocaleString()}
                </Typography>
              </CardContent>
              {/* Action Buttons */}
              <CardActions>
                <Button
                  component={Link}
                  to={`/cars/${car.id}`}
                  variant="contained"
                  size="small"
                  color="primary"
                  fullWidth
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {paginatedCars.length === 0 && (
          <Typography variant="h6" sx={{ mt: 4 }}>
            No cars found matching your criteria.
          </Typography>
        )}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default CarList;
