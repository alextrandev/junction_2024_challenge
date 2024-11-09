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

import { Company } from "../../../db.json";

const JobseekerMatchPage = () => {
  const company = Company[0];

  const matchScoreSections = [
    {
      title: "Skills & Experience",
      score: "90%",
      details: [
        `Required Skills: ${company.jobPosition.selectionCriteria.skills.join(
          ", "
        )}`,
        `Required Experience: ${company.jobPosition.selectionCriteria.experience}`,
      ],
    },
    {
      title: "Work Environment",
      score: "85%",
      details: `Work Options: ${company.workingConditions.flexibility.join(
        ", "
      )}`,
    },
    {
      title: "Work Style",
      score: "90%",
      details: company.workStyles,
    },
    {
      title: "Values & Culture",
      score: "85%",
      details: [
        company.workingConditions.culture,
        `Values: ${company.values.join(", ")}`,
      ],
    },
  ];

  const detailedSections = [
    {
      title: "Skills & Experience",
      details: [
        `Position: ${company.jobPosition.title}`,
        `Required Skills: ${company.jobPosition.selectionCriteria.skills.join(
          ", "
        )}`,
        `Required Experience: ${company.jobPosition.selectionCriteria.experience}`,
        `Rating: ${company.jobPosition.selectionCriteria.rating}`,
      ],
    },
    {
      title: "Work Environment & Conditions",
      details: [
        `Location: ${company.jobPosition.selectionCriteria.location.postcode} (${company.jobPosition.selectionCriteria.location.radius} radius)`,
        `Work Options: ${company.workingConditions.location.join(", ")}`,
        `Salary Range: ${company.jobPosition.salary.min}-${company.jobPosition.salary.max} ${company.jobPosition.salary.currency}`,
      ],
    },
    {
      title: "Perks & Benefits",
      details: company.jobPosition.benefits.map((benefit) => `• ${benefit}`),
    },
    {
      title: "Work Style & Values",
      details: [
        `Work Style: ${company.workStyles.join(", ")}`,
        `Values: ${company.values.join(", ")}`,
        `Culture: ${company.workingConditions.culture}`,
      ],
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <DetailCard elevation={2}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar src="/img.png" alt="match" sx={{ width: 64, height: 64 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">Matching company</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" color="primary">
              85% Match
            </Typography>
            <Typography variant="subtitle2">Overall Score</Typography>
          </Grid>
        </Grid>
      </DetailCard>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          {/* Match Score Breakdown */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2}>
              {matchScoreSections.map((section) => (
                <Grid item xs={12} sm={6} key={section.title}>
                  <MatchScoreCard elevation={2}>
                    <Typography variant="h6" gutterBottom>
                      {section.title}
                    </Typography>
                    <Typography className="matchScore" gutterBottom>
                      {section.score}
                    </Typography>
                    {Array.isArray(section.details) ? (
                      section.details.map((detail) => (
                        <Typography key={detail} variant="body2">
                          • {detail}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2">
                        • {section.details}
                      </Typography>
                    )}
                  </MatchScoreCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Detailed Breakdown */}
          {detailedSections.map((section) => (
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
                  Apply Now
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<BookmarkBorderIcon />}
                >
                  Save Job
                </Button>
              </Grid>
            </Grid>
          </DetailCard>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <SidebarCard elevation={2}>
            <Typography variant="h6" gutterBottom>
              Quick Navigation
            </Typography>
            <List>
              {[
                "Skills & Experience",
                "Work Environment & Conditions",
                "Mental Well-being & Support",
                "Workplace Culture & Values",
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
              Contact HR
            </Button>
          </SidebarCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobseekerMatchPage;
