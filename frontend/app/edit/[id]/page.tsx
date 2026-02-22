'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
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

export default function EditPage() {
  const { id } = useParams(); // story ID from URL
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch the existing story
  useEffect(() => {
    const fetchStory = async () => {
      const { Data } = await apiFetch(`/stories/${id}`);
      console.log(Data)
      setTitle(Data.title);
      setContent(Data.content);
      setIsPublic(Data.isPublic || false);
      setLoading(false);
    };
    fetchStory();
  }, [id]);

  const handleUpdate = async () => {
    await apiFetch(`/stories/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content, isPublic: isPublic }),
    });
    router.push('/stories');
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth='sm' sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 4 }}>
        <Typography variant='h5' mb={3}>
          Edit Story
        </Typography>

        <TextField
          label='Title'
          fullWidth
          margin='normal'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label='Content'
          fullWidth
          multiline
          rows={4}
          margin='normal'
          value={content}
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
          label='Public'
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
            onClick={handleUpdate}
          >
            Update
          </Button></div>
      </Paper>
    </Container>
  );
}