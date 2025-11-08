import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import type { JobPosting } from '../types';

interface JobPostingInputProps {
  onSubmit: (jobPosting: JobPosting) => void;
}

export const JobPostingInput = ({ onSubmit }: JobPostingInputProps) => {
  const [jobPosting, setJobPosting] = useState<JobPosting>({
    description: '',
    title: '',
    company: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(jobPosting);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Job Posting Details
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Job Title"
          value={jobPosting.title}
          onChange={(e) => setJobPosting({ ...jobPosting, title: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Company"
          value={jobPosting.company}
          onChange={(e) => setJobPosting({ ...jobPosting, company: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Job Description"
          value={jobPosting.description}
          onChange={(e) => setJobPosting({ ...jobPosting, description: e.target.value })}
          margin="normal"
          required
          multiline
          rows={6}
          placeholder="Paste the job description here..."
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Analyze Job Posting
        </Button>
      </Box>
    </Paper>
  );
};