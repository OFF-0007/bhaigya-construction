import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Box, 
    Typography, 
    Button, 
    Container, 
    Paper, 
    Stack, 
    Grid,
    Divider,
    Avatar
} from '@mui/material';
import { 
    Construction as ConstructionIcon,
    Login as LoginIcon,
    SupportAgent as SupportIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Dashboard as DashboardIcon,
    Assignment as ProjectIcon,
    Category as ServiceIcon
} from '@mui/icons-material';

export default function Welcome() {
    return (
        <Box 
            sx={{ 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column',
                bgcolor: '#f4f6f8',
                backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
                backgroundSize: '40px 40px',
            }}
        >
            <Head title="Admin Portal | Bhaigya Construction" />

            <Container maxWidth="sm" sx={{ mt: 'auto', mb: 'auto', py: 4 }}>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: { xs: 4, md: 6 }, 
                        borderRadius: 4, 
                        textAlign: 'center',
                        bgcolor: 'white',
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.04)'
                    }}
                >
                    <Stack spacing={4} alignItems="center">
                        {/* Brand Logo */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mb: 1 }}>
                                <ConstructionIcon sx={{ fontSize: 35 }} />
                            </Avatar>
                            <Typography variant="h4" sx={{ fontWeight: 900, color: '#1a1a1a', letterSpacing: -1 }}>
                                BHAIGYA <Box component="span" sx={{ color: 'primary.main' }}>ADMIN</Box>
                            </Typography>
                        </Box>

                        {/* Overview */}
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#2d3748' }}>
                                Construction Management Portal
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 350, mx: 'auto' }}>
                                Secure administrative interface for managing projects, service packages, and site configurations.
                            </Typography>
                        </Box>

                        <Divider sx={{ width: '100%' }} />

                        {/* Quick Overview of features */}
                        <Grid container spacing={2} sx={{ mb: 1 }}>
                            {[
                                { icon: <DashboardIcon fontSize="small" color="primary" />, label: 'Analytics' },
                                { icon: <ProjectIcon fontSize="small" color="primary" />, label: 'Projects' },
                                { icon: <ServiceIcon fontSize="small" color="primary" />, label: 'Services' },
                                { icon: <SupportIcon fontSize="small" color="primary" />, label: 'Inquiries' },
                            ].map((item, index) => (
                                <Grid item xs={6} key={index}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                        {item.icon}
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.label}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Login Button */}
                        <Link href="/admin/login" style={{ textDecoration: 'none', width: '100%' }}>
                            <Button 
                                variant="contained" 
                                size="large" 
                                fullWidth
                                startIcon={<LoginIcon />}
                                sx={{ 
                                    py: 2, 
                                    borderRadius: 3, 
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                                    '&:hover': {
                                        boxShadow: '0 6px 16px rgba(25, 118, 210, 0.3)',
                                    }
                                }}
                            >
                                Login to Dashboard
                            </Button>
                        </Link>
                    </Stack>
                </Paper>

                {/* Support Section */}
                <Box sx={{ mt: 6, textAlign: 'center' }}>
                    <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: 1.5 }}>
                        Technical Support
                    </Typography>
                    <Stack 
                        direction={{ xs: 'column', sm: 'row' }} 
                        spacing={4} 
                        justifyContent="center"
                        alignItems="center"
                        sx={{ mt: 2 }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneIcon fontSize="small" color="primary" />
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                +91 98765 43210
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmailIcon fontSize="small" color="primary" />
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                support@bhaigya.com
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Container>

            {/* Footer */}
            <Box sx={{ py: 3, mt: 'auto', textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 500 }}>
                    © {new Date().getFullYear()} Bhaigya Construction. Authorized Personnel Access Only.
                </Typography>
            </Box>
        </Box>
    );
}
