'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { apiFetch } from '@/lib/api';

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    await apiFetch('/stories', {
      method: 'POST',
      body: JSON.stringify({ title, content, isPublic }),
    });

    router.push('/stories');
  };

  return (
    <Container maxWidth='sm' sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 4 }}>
        <Typography variant='h5' mb={3}>
          Create Story
        </Typography>

        <TextField
          label='Title'
          fullWidth
          margin='normal'
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label='Content'
          fullWidth
          multiline
          rows={4}
          margin='normal'
          onChange={(e) => setContent(e.target.value)}
        />

        <FormControlLabel
          control={
            <Switch
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              color='primary'
            />
          }
          label={isPublic ? 'Public' : 'Private'}
        />

        <div style={{
          display: 'flex',
          gap: '10px'
        }}>
          <Button
            variant='contained'
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => {
              router.push('/stories')
            }}
          >
            Cancel
          </Button>

          <Button
            variant='contained'
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Publish
          </Button>
        </div>
      </Paper>
    </Container>
  );
}