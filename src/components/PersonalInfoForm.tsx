import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import type { Resume } from '../types';
import { useResumeStore } from '../store/resumeStore';

type PersonalInfoInputs = Resume['personalInfo'];

export const PersonalInfoForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfoInputs>({
    defaultValues: useResumeStore((state) => state.resume.personalInfo)
  });
  const updatePersonalInfo = useResumeStore((state) => state.updatePersonalInfo);

  const onSubmit = (data: PersonalInfoInputs) => {
    updatePersonalInfo(data);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          required
          {...register('name', { required: 'Name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          required
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth
          label="Phone"
          margin="normal"
          required
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^\+?[\d\s-]+$/,
              message: 'Invalid phone number'
            }
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
        <TextField
          fullWidth
          label="Location"
          margin="normal"
          required
          {...register('location', { required: 'Location is required' })}
          error={!!errors.location}
          helperText={errors.location?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Save Personal Info
        </Button>
      </Box>
    </Paper>
  );
};