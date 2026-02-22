'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';
import { Container, Typography, Button, Box } from '@mui/material';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (token) {
      router.replace('/stories'); // replace avoids back button issue
    }
  }, [router]);

  return (
    <Container maxWidth='md'>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='80vh'
        textAlign='center'
      >
        <Typography variant='h3' gutterBottom>
          Welcome to Story App
        </Typography>

        <Typography variant='body1' color='text.secondary' mb={4}>
          Please login or create an account.
        </Typography>

        <Box>
          <Button
            variant='contained'
            sx={{ mr: 2 }}
            onClick={() => router.push('/login')}
          >
            Login
          </Button>

          <Button
            variant='outlined'
            onClick={() => router.push('/signup')}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}