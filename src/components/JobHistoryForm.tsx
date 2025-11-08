import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import type { JobHistory } from '../types';

interface JobHistoryFormProps {
  onSubmit: (jobHistory: JobHistory[]) => void;
}

export const JobHistoryForm = ({ onSubmit }: JobHistoryFormProps) => {
  const [jobs, setJobs] = useState<JobHistory[]>([]);
  const [currentJob, setCurrentJob] = useState<JobHistory>({
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    achievements: [],
  });
  const [currentAchievement, setCurrentAchievement] = useState('');

  const handleAddAchievement = () => {
    if (currentAchievement.trim()) {
      setCurrentJob({
        ...currentJob,
        achievements: [...currentJob.achievements, currentAchievement.trim()],
      });
      setCurrentAchievement('');
    }
  };

  const handleAddJob = () => {
    setJobs([...jobs, currentJob]);
    setCurrentJob({
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: [],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentJob.companyName) {
      handleAddJob();
    }
    onSubmit(jobs);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Work Experience
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Company Name"
          value={currentJob.companyName}
          onChange={(e) => setCurrentJob({ ...currentJob, companyName: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Position"
          value={currentJob.position}
          onChange={(e) => setCurrentJob({ ...currentJob, position: e.target.value })}
          margin="normal"
          required
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Start Date"
            type="date"
            value={currentJob.startDate}
            onChange={(e) => setCurrentJob({ ...currentJob, startDate: e.target.value })}
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            type="date"
            value={currentJob.endDate}
            onChange={(e) => setCurrentJob({ ...currentJob, endDate: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <TextField
          fullWidth
          label="Job Description"
          value={currentJob.description}
          onChange={(e) => setCurrentJob({ ...currentJob, description: e.target.value })}
          margin="normal"
          required
          multiline
          rows={4}
        />
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            label="Achievement"
            value={currentAchievement}
            onChange={(e) => setCurrentAchievement(e.target.value)}
            margin="normal"
          />
          <Button
            onClick={handleAddAchievement}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Add Achievement
          </Button>
        </Box>

        {currentJob.achievements.map((achievement, index) => (
          <Typography key={index} variant="body2" sx={{ ml: 2 }}>
            • {achievement}
          </Typography>
        ))}

        <Button
          onClick={handleAddJob}
          variant="contained"
          color="secondary"
          sx={{ mt: 2, mr: 2 }}
          disabled={!currentJob.companyName || !currentJob.position}
        >
          Add Job
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={jobs.length === 0 && !currentJob.companyName}
        >
          Save Work Experience
        </Button>
      </Box>

      {jobs.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Added Jobs:
          </Typography>
          {jobs.map((job, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1">{job.position} at {job.companyName}</Typography>
              <Typography variant="body2">{job.startDate} - {job.endDate}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Paper>
  );
};