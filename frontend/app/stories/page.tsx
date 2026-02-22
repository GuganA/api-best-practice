'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Box,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import { apiFetch } from '@/lib/api';
import { removeToken } from '@/lib/auth';

interface Story {
    _id: string;
    title: string;
    content: string;
    isPublic: boolean;
    writer: string;
}

export default function StoryPage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [selectedTab, setSelectedTab] = useState<'public' | 'private'>('public');
    const router = useRouter();

    useEffect(() => {
        fetchStories();
    }, [selectedTab]);

    const fetchStories = async () => {
        try {
            let endpoint = '/stories';
            if (selectedTab === 'private') {
                endpoint = `/stories?private=true`; // fetch only private stories for this user
            }
            const data = await apiFetch(endpoint);
            setStories(data?.Data || []);
        } catch (error) {
            removeToken();
            router.push('/login');
        }
    };

    const handleLogout = () => {
        removeToken();
        router.push('/login');
    };

    const handleTabChange = (_event: React.MouseEvent<HTMLElement>, newTab: 'public' | 'private') => {
        if (newTab) setSelectedTab(newTab);
    };

    return (
        <Container maxWidth='lg' sx={{ mt: 3, mb: 3 }}>
            {/* Header */}
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mb={4}
            >
                <Typography variant='h4' fontWeight={600}>
                    Stories
                </Typography>

                <Box display='flex' gap={2}>
                    <Button
                        variant='contained'
                        color='success'
                        size='large'
                        onClick={() => router.push('/create')}
                    >
                        Create Story
                    </Button>

                    <Button
                        variant='outlined'
                        color='error'
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>

            {/* Tabs */}
            <Box mb={4} display='flex' justifyContent='center'>
                <ToggleButtonGroup
                    value={selectedTab}
                    exclusive
                    onChange={handleTabChange}
                    sx={{
                        borderRadius: 3,
                        p: 0.5,
                    }}
                >
                    <ToggleButton value='public' sx={{ px: 4 }}>
                        Public
                    </ToggleButton>
                    <ToggleButton value='private' sx={{ px: 4 }}>
                        Private
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Stories */}
            {stories.length === 0 ? (
                <Box textAlign='center' mt={10}>
                    <Typography variant='h6' color='text.secondary'>
                        No stories found
                    </Typography>
                </Box>
            ) : (
                <Box display='flex' flexDirection='column' gap={4}>
                    {stories.map((story) => (
                        <Card
                            key={story._id}
                            sx={{
                                width: '100%',
                                minHeight: 420,
                                borderRadius: 6,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: '0.3s',
                                p: 4,
                                '&:hover': {
                                    boxShadow: 8,
                                    transform: 'translateY(-4px)',
                                },
                            }}
                        >
                            {/* Content grows */}
                            <CardContent sx={{ flexGrow: 1, p: 4 }}>
                                <Typography variant='h5' fontWeight={600} gutterBottom>
                                    {story.title}
                                </Typography>

                                <Typography
                                    variant='body1'
                                    color='text.secondary'
                                    sx={{ mt: 3, whiteSpace: 'pre-line' }}
                                >
                                    {story.content}
                                </Typography>
                            </CardContent>

                            {/* Button stays at bottom */}
                            <Box
                                sx={{
                                    p: 1,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Button
                                    variant='contained'
                                    onClick={() => router.push(`/edit/${story._id}`)}
                                >
                                    Edit
                                </Button>
                            </Box>
                        </Card>
                    ))}
                </Box>
            )}
        </Container>
    );
}