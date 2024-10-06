// src/components/Notifications.js

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import api from '../services/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the backend
    api.get('/users/notifications')
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <List>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={notification.title}
                secondary={notification.message}
              />
            </ListItem>
            {index < notifications.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
        {notifications.length === 0 && (
          <Typography variant="body1">No notifications.</Typography>
        )}
      </List>
    </Container>
  );
};

export default Notifications;
