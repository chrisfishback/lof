import React, { useState } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { useNavigate } from 'react-router';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 3, textAlign: 'center', color: 'white' }}>
          Admin Login
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
          sx={{ 
            mb: 2,
            '& .MuiInputBase-input': { color: 'white' },
            '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
              '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            }
          }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
          sx={{ 
            mb: 3,
            '& .MuiInputBase-input': { color: 'white' },
            '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
              '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            }
          }}
        />
        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          sx={{ mt: 2, bgcolor: '#e35c22', '&:hover': { bgcolor: '#d14c12' } }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};