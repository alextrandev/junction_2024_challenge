import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  styled,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EmailIcon from "@mui/icons-material/Email";

const MatchScoreCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
  "& .matchScore": {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
}));

const DetailCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const SidebarCard = styled(Card)(({ theme }) => ({
  position: "sticky",
  top: theme.spacing(2),
  padding: theme.spacing(2),
}));

const CompanyMatchPage = () => {
  return (
    <Container maxWidth="lg">
      {/* Header */}
      <DetailCard elevation={2}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              src="/profile.png"
              alt="candidate"
              sx={{ width: 64, height: 64 }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">Matching candidate</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" color="primary">
              85% Match
            </Typography>
            <Typography variant="subtitle2">Candidate Match Score</Typography>
          </Grid>
        </Grid>
      </DetailCard>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          {/* Match Score Breakdown */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2}>
              {[
                {
                  title: "Technical Skills",
                  score: "90%",
                  details: ["React Expert", "4 years experience"],
                },
                {
                  title: "Work Preferences",
                  score: "80%",
                  details: ["Prefers Remote", "Flexible hours"],
                },
                {
                  title: "Career Goals",
                  score: "85%",
                  details: ["Growth focused", "Leadership track"],
                },
                {
                  title: "Cultural Alignment",
                  score: "90%",
                  details: ["Team player", "Innovation driven"],
                },
              ].map((section) => (
                <Grid item xs={12} sm={6} key={section.title}>
                  <MatchScoreCard elevation={2}>
                    <Typography variant="h6" gutterBottom>
                      {section.title}
                    </Typography>
                    <Typography className="matchScore" gutterBottom>
                      {section.score}
                    </Typography>
                    {section.details.map((detail) => (
                      <Typography key={detail} variant="body2">
                        • {detail}
                      </Typography>
                    ))}
                  </MatchScoreCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Detailed Breakdown */}
          {[
            {
              title: "Technical Skills & Experience",
              details: [
                "Primary Skills: React, JavaScript, CSS",
                "Years of Experience: 4 years",
                "Recent Projects: E-commerce platforms, SaaS applications",
              ],
            },
            {
              title: "Work Style & Preferences",
              details: [
                "Preferred Work Model: Remote",
                "Working Hours: Flexible schedule",
                "Team Size: 5-10 members",
              ],
            },
            {
              title: "Career Aspirations",
              details: [
                "Short-term: Technical Lead",
                "Long-term: Engineering Manager",
                "Learning Goals: System Architecture, Team Leadership",
              ],
            },
            {
              title: "Cultural Values & Interests",
              details: [
                "Values: Collaboration, Innovation",
                "Interests: Open Source, Mentoring",
                "Communication Style: Direct and transparent",
              ],
            },
          ].map((section) => (
            <DetailCard key={section.title} elevation={2}>
              <Typography variant="h6" gutterBottom>
                {section.title}
              </Typography>
              {section.details.map((detail) => (
                <Typography key={detail} variant="body1" paragraph>
                  • {detail}
                </Typography>
              ))}
            </DetailCard>
          ))}

          {/* Call-to-Action */}
          <DetailCard elevation={2}>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" size="large">
                  Schedule Interview
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<BookmarkBorderIcon />}
                >
                  Save Profile
                </Button>
              </Grid>
            </Grid>
          </DetailCard>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <SidebarCard elevation={2}>
            <Typography variant="h6" gutterBottom>
              Candidate Overview
            </Typography>
            <List>
              {[
                "Technical Skills",
                "Work Experience",
                "Career Goals",
                "Cultural Fit",
              ].map((item) => (
                <ListItem
                  key={item}
                  button
                  component="a"
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Button
              fullWidth
              variant="outlined"
              startIcon={<EmailIcon />}
              sx={{ mt: 2 }}
            >
              Contact Candidate
            </Button>
          </SidebarCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyMatchPage;
