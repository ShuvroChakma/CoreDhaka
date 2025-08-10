import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, MenuItem, Grid } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import { useMediaQuery } from '@mui/material';
import ContactAppBar from '../components/ContactAppBar';
import LoadingScreen from '../components/LoadingScreen';
import EmailIcon from '@mui/icons-material/Email';

const projectTypes = [
  'Event & Content Marketing',
  'Creative Digital Marketing',
  'Marketing Analytics',
  'Brand Strategy & Development',
  'Other',
];

const formContainerStyles = {
  margin: 'auto',
  transition: 'width 1s ease-in-out',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '25px',
  padding: '25px',
  zIndex: 1,
};

const smformContainerStyles = {
  margin: 'auto',
  marginTop: '2rem',
  transition: 'width 1s ease-in-out',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '25px',
  padding: '25px',
};

const FORMSPARK_ACTION_URL = "https://submit-form.com/Be9GcuJKb";

const ContactPage = () => {
  const [loading, setLoading] = useState(true);
  const [formWidth, setFormWidth] = useState('0%');
  const isMdScreen = useMediaQuery('(min-width:960px)');

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setFormWidth('80%'), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const containerStyles = isMdScreen ? formContainerStyles : smformContainerStyles;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !message) {
      alert("Please fill all the fields.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(FORMSPARK_ACTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, projectType, message }),
      });

      if (res.ok) {
        alert("Message Sent!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setProjectType("");
        setMessage("");
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("Error sending message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Box sx={{ height: '100vh', backgroundColor: '#090808' }}>
          <ContactAppBar />
          <Box
            id="contactUs"
            sx={{
              position: 'relative',
              backgroundColor: '#090808',
              color: 'white',
              marginTop: '4%',
            }}
          >
            <Container>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ marginLeft: '2rem', fontSize: { xs: '50px', md: '100px' }, color: '#00c062' }}>
                  <EmailIcon sx={{ fontSize: '2rem' }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: { xs: '50px', md: '70px' },
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    color: '#00c062',
                  }}
                >
                  CONTACT US
                </Typography>
              </Box>
              <br />
              <Fade left triggerOnce>
                <Box sx={{ ...containerStyles, width: formWidth }}>
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          name="firstName"
                          fullWidth
                          required
                          margin="normal"
                          label="First Name"
                          variant="standard"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          name="lastName"
                          fullWidth
                          required
                          margin="normal"
                          label="Last Name"
                          variant="standard"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          name="email"
                          fullWidth
                          required
                          margin="normal"
                          label="Email Address"
                          variant="standard"
                          type="email"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                          name="projectType"
                          fullWidth
                          margin="normal"
                          select
                          required
                          label="Project Type"
                          variant="standard"
                        >
                          {projectTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                              {type}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          name="message"
                          fullWidth
                          required
                          margin="normal"
                          multiline
                          rows={4}
                          label="Message"
                          variant="standard"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                          <Button
                            type="submit"
                            disabled={submitting}
                            sx={{
                              fontFamily: 'Inter',
                              border: '1px solid black',
                              color: 'black',
                              backgroundColor: '#00c062',
                              width: '150px',
                              borderRadius: '20px',
                              '&:hover': { backgroundColor: '#00c062', borderColor: 'white' },
                            }}
                          >
                            {submitting ? "Sending..." : "Submit"}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Fade>
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ContactPage;
