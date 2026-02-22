'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { setToken } from '@/lib/auth';
import { apiFetch } from '@/lib/api';

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError('All fields are required')
    }

    try {
      setLoading(true);

      const res = await apiFetch(
        '/users/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (!res) {
        // throw new Error('Signup failed');
        setError(res.message || 'Signup failed');
      }

      // If backend returns token immediately
      if (res.token) {
        setToken(res.token);
        router.push('/stories');
      } else {
        // If no token returned → redirect to login
        router.push('/login');
      }
    } catch (error: any) {
      // alert('Signup failed. Try again.');
      setError(error?.message || 'Signup failed. Try again.');
    } finally {
      setLoading(false);
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
        <Paper elevation={6} sx={{ p: 4, width: '100%' }}>
          <Typography variant='h5' mb={3} textAlign='center'>
            Create Account
          </Typography>

          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label='Name'
            fullWidth
            margin='normal'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label='Email'
            fullWidth
            margin='normal'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant='contained'
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>

          <Typography mt={2} textAlign='center'>
            Already have an account?
            <Button onClick={() => router.push('/login')}>
              Login
            </Button>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}