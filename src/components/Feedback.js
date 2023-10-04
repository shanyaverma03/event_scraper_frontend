import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import axios from "axios";
import { useState } from "react";
import { base_url } from "../config";

function Feedback({ loading, error, eventsLength }) {
  const [loadingEvents, setLoadingEvents] = useState(false);

  const addEventsHandler = async () => {
    try {
      setLoadingEvents(true);
      const response = await axios.post(`${base_url}/api/events`);
      console.log(response);
      setLoadingEvents(false);
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{ flex: 1, display: "flex", justifyContent: "center", padding: 5 }}
      >
        <CircularProgress />;
      </Box>
    );
  }

  if (error) {
    return (
      <Typography align="center" padding={5}>
        Some error occurred! Please try again later.
      </Typography>
    );
  }

  if (eventsLength === 0) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 3,
        }}
      >
        <Typography align="center">
          No events found! Please adjust the filters or try again later.
        </Typography>
        {loadingEvents ? (
          <CircularProgress />
        ) : (
          <Button onClick={addEventsHandler}>Add events</Button>
        )}
      </Box>
    );
  }

  return null;
}

export default Feedback;
