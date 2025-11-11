import { Paper, Typography, Box, Divider } from '@mui/material';
import type { Resume } from '../types';

interface ResumePreviewProps {
  resume: Resume;
}

export const ResumePreview = ({ resume }: ResumePreviewProps) => {
  return (
    <Paper sx={{ p: 4, mb: 3, backgroundColor: '#fff' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {resume.personalInfo.name}
        </Typography>
        <Typography>
          {resume.personalInfo.email} | {resume.personalInfo.phone}
        </Typography>
        <Typography>
          {resume.personalInfo.location}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Professional Summary
        </Typography>
        <Typography>
          {resume.summary}
        </Typography>
      </Box>

      {/* Skills */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Skills
        </Typography>
        <Typography>
          {resume.skills.join(' • ')}
        </Typography>
      </Box>

      {/* Work Experience */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Work Experience
        </Typography>
        {resume.workExperience.map((job, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {job.position} | {job.companyName}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {job.startDate} - {job.endDate}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              {job.description}
            </Typography>
            <Box sx={{ mt: 1 }}>
              {job.achievements.map((achievement, i) => (
                <Typography key={i} sx={{ ml: 2 }}>
                  • {achievement}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Education */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Education
        </Typography>
        {resume.education.map((edu, index) => (
          <Box key={index}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {edu.degree}
            </Typography>
            <Typography>
              {edu.school} | Graduated: {edu.graduationDate}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};