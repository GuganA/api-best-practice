'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { setToken } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validateInputs = () => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format';

    if (!password) return 'Password is required';
    if (password.length < 3) return 'Password must be at least 3 characters';

    return null;
  };

  const handleLogin = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(''); // clear previous errors

    try {
      const res = await apiFetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res) {
        setError(res.message || 'Invalid credentials');
        return;
      }

      setToken(res.token);
      router.push('/stories');
    } catch (err) {
      console.log(err)
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <Paper elevation={6} sx={{ padding: 4, width: '100%' }}>
          <Typography variant='h5' mb={3} textAlign='center'>
            Login
          </Typography>

          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label='Email'
            fullWidth
            margin='normal'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error && error.toLowerCase().includes('email')}
            helperText={error && error.toLowerCase().includes('email') ? error : ''}
          />

          <TextField
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error && error.toLowerCase().includes('password')}
            helperText={error && error.toLowerCase().includes('password') ? error : ''}
          />

          <Button
            variant='contained'
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Box textAlign='center' mt={2}>
            <Typography variant='body2'>
              Don&apos;t have an account?{' '}
              <Link href='/signup' style={{ textDecoration: 'none' }}>
                <Typography
                  component='span'
                  color='primary'
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Create one
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage; 