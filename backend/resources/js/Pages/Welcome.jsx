import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Ziggy } from '@/ziggy';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Container, 
    Box, 
    Grid, 
    Card, 
    CardContent, 
    CardMedia,
    Stack,
    IconButton
} from '@mui/material';
import { 
    Construction as ConstructionIcon,
    Login as LoginIcon,
    Home as HomeIcon,
    Business as BusinessIcon,
    Engineering as EngineeringIcon
} from '@mui/icons-material';

export default function Welcome() {
    const routeHelper = (name, params, absolute) => route(name, params, absolute, Ziggy);
    const services = [
        {
            title: 'Residential Projects',
            description: 'We build high-quality homes with modern designs and sustainable materials.',
            icon: <HomeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Commercial Construction',
            description: 'Expertise in building state-of-the-art office buildings and shopping complexes.',
            icon: <BusinessIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Civil Engineering',
            description: 'Specialized infrastructure projects including bridges, roads, and urban planning.',
            icon: <EngineeringIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
        }
    ];

    return (
        <Box sx={{ flexGrow: 1, bgcolor: '#fafafa', minHeight: '100vh' }}>
            <Head title="Welcome to Bhaigya Construction" />
            
            {/* Navigation */}
            <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <ConstructionIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a1a1a', letterSpacing: -0.5 }}>
                                BHAIGYA CONSTRUCTION
                            </Typography>
                        </Stack>
                        
                        <Link href="/admin/login">
                            <Button 
                                variant="outlined" 
                                startIcon={<LoginIcon />}
                                sx={{ 
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600
                                }}
                            >
                                Admin Login
                            </Button>
                        </Link>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Hero Section */}
            <Box 
                sx={{ 
                    position: 'relative', 
                    height: '70vh', 
                    display: 'flex', 
                    alignItems: 'center',
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=1920&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    mb: 8
                }}
            >
                <Container maxWidth="md">
                    <Stack spacing={4} alignItems="center" sx={{ textAlign: 'center' }}>
                        <Typography variant="h2" component="h1" sx={{ fontWeight: 800, letterSpacing: -1 }}>
                            Building Dreams into Reality
                        </Typography>
                        <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 400, maxWidth: 600 }}>
                            Leading construction company dedicated to excellence, innovation, and sustainable building solutions.
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" size="large" sx={{ py: 1.5, px: 4, borderRadius: 2, fontWeight: 600 }}>
                                View Our Projects
                            </Button>
                            <Button variant="outlined" size="large" sx={{ py: 1.5, px: 4, borderRadius: 2, fontWeight: 600, color: 'white', borderColor: 'white', '&:hover': { borderColor: '#f0f0f0', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                Contact Us
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* Services Section */}
            <Container maxWidth="lg" sx={{ mb: 12 }}>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 2 }}>
                        OUR SERVICES
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
                        Specialized Solutions for Every Need
                    </Typography>
                </Box>
                
                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card 
                                elevation={0} 
                                sx={{ 
                                    height: '100%', 
                                    borderRadius: 4, 
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                    border: '1px solid #eee',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={service.image}
                                    alt={service.title}
                                />
                                <CardContent sx={{ p: 4 }}>
                                    <Box sx={{ mb: 2 }}>
                                        {service.icon}
                                    </Box>
                                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Footer */}
            <Box sx={{ py: 8, bgcolor: '#1a1a1a', color: '#888' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={8}>
                        <Grid item xs={12} md={4}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3, color: 'white' }}>
                                <ConstructionIcon sx={{ fontSize: 28 }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                    BHAIGYA
                                </Typography>
                            </Stack>
                            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                                Building the future with passion and precision. We are committed to delivering the highest standards in every project we undertake.
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
                                Company
                            </Typography>
                            <Stack spacing={1.5}>
                                <Typography variant="body2">About Us</Typography>
                                <Typography variant="body2">Our Team</Typography>
                                <Typography variant="body2">Projects</Typography>
                                <Typography variant="body2">Blog</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
                                Support
                            </Typography>
                            <Stack spacing={1.5}>
                                <Typography variant="body2">Help Center</Typography>
                                <Typography variant="body2">Contact Us</Typography>
                                <Typography variant="body2">FAQ</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
                                Newsletter
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                Subscribe to get our latest updates and news.
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <Box sx={{ flexGrow: 1, bgcolor: '#333', borderRadius: 1, p: 1, px: 2 }}>
                                    <Typography variant="body2">Email address</Typography>
                                </Box>
                                <Button variant="contained">Join</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid #333', textAlign: 'center' }}>
                        <Typography variant="body2">
                            © {new Date().getFullYear()} Bhaigya Construction. All rights reserved.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
