import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Chip,
    Divider,
    Avatar,
    Stack,
    IconButton,
    Tooltip,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    ArrowBack as BackIcon,
    CheckCircle as CheckIcon,
    Star as StarIcon,
    Description as DescriptionIcon,
    AttachMoney as MoneyIcon,
    Category as CategoryIcon,
    TrendingUp as TrendingIcon,
    Info as InfoIcon,
    Done as DoneIcon
} from '@mui/icons-material';

export default function Show({ package: pkg }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this package?')) {
            router.delete(route('admin.service-packages.destroy', pkg.id));
        }
    };

    return (
        <AdminLayout>
            <Head title={`Package: ${pkg.title}`} />

            {/* Page Header */}
            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                    <Tooltip title="Back to List">
                        <IconButton 
                            component={Link} 
                            href={route('admin.service-packages.index')} 
                            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 0.5, bgcolor: 'background.paper' }}
                        >
                            <BackIcon />
                        </IconButton>
                    </Tooltip>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-1.5px', color: 'text.primary' }}>
                            {pkg.title}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Chip 
                                label={pkg.is_active ? 'ACTIVE' : 'INACTIVE'} 
                                size="small" 
                                color={pkg.is_active ? 'success' : 'error'}
                                sx={{ fontWeight: 900, height: 20, fontSize: '0.65rem', borderRadius: 0.5 }} 
                            />
                            {pkg.is_featured && (
                                <Chip 
                                    label="FEATURED" 
                                    size="small" 
                                    color="warning"
                                    icon={<StarIcon sx={{ fontSize: '0.8rem !important' }} />}
                                    sx={{ fontWeight: 900, height: 20, fontSize: '0.65rem', borderRadius: 0.5 }} 
                                />
                            )}
                        </Stack>
                    </Box>
                </Box>
                
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="outlined" 
                        startIcon={<EditIcon />} 
                        component={Link} 
                        href={route('admin.service-packages.index')} // We'll trigger the edit modal via query param or just keep it on index
                        onClick={(e) => {
                            // If we want to open the edit modal directly, we might need to adjust the index page logic
                            // For now, let's just go back to index where they can edit
                        }}
                        sx={{ borderRadius: 0.5, fontWeight: 800 }}
                    >
                        Edit
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        startIcon={<DeleteIcon />} 
                        onClick={handleDelete} 
                        sx={{ borderRadius: 0.5, fontWeight: 800 }}
                    >
                        Delete
                    </Button>
                </Stack>
            </Box>

            <Grid container spacing={4}>
                {/* Left Column: Image and Details */}
                <Grid item xs={12} lg={4}>
                    <Card elevation={0} sx={{ borderRadius: 0.5, border: '1px solid', borderColor: 'divider', overflow: 'hidden', mb: 4 }}>
                        {pkg.image ? (
                            <Box 
                                component="img" 
                                src={`/storage/${pkg.image}`} 
                                sx={{ width: '100%', height: 300, objectFit: 'cover' }} 
                            />
                        ) : (
                            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover' }}>
                                <DescriptionIcon sx={{ fontSize: 80, color: 'text.disabled' }} />
                            </Box>
                        )}
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>Package Specs</Typography>
                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>CATEGORY</Typography>
                                    <Chip 
                                        label={pkg.category?.category_name || 'Uncategorized'} 
                                        size="small" 
                                        sx={{ fontWeight: 800, borderRadius: 0.5 }} 
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>PRICE</Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 900, color: 'primary.main' }}>
                                        {pkg.price ? `₹${pkg.price}` : 'TBA'}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>POPULARITY</Typography>
                                    <Chip 
                                        label={pkg.popularity.toUpperCase()} 
                                        size="small" 
                                        color={pkg.popularity === 'premium' ? 'secondary' : pkg.popularity === 'popular' ? 'primary' : 'default'}
                                        sx={{ fontWeight: 800, borderRadius: 0.5 }} 
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>SLUG</Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{pkg.slug}</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Paper elevation={0} sx={{ p: 3, borderRadius: 0.5, border: '1px solid', borderColor: 'divider', bgcolor: 'primary.50' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 900, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <InfoIcon fontSize="small" /> System Information
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Created: {new Date(pkg.created_at).toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                            Last Updated: {new Date(pkg.updated_at).toLocaleString()}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Right Column: Narrative and Benefits */}
                <Grid item xs={12} lg={8}>
                    <Card elevation={0} sx={{ borderRadius: 0.5, border: '1px solid', borderColor: 'divider', mb: 4 }}>
                        <CardContent sx={{ p: { xs: 3, md: 6 } }}>
                            <Box sx={{ mb: 6 }}>
                                <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <DescriptionIcon color="primary" /> Narrative Description
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', whiteSpace: 'pre-line' }}>
                                    {pkg.description || 'No description provided for this package.'}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 6 }} />

                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 900, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <CheckIcon color="success" /> Key Benefits & Features
                                </Typography>
                                {pkg.benefits && pkg.benefits.length > 0 ? (
                                    <Grid container spacing={2}>
                                        {pkg.benefits.map((benefit, i) => (
                                            <Grid item xs={12} sm={6} key={i}>
                                                <Paper 
                                                    elevation={0} 
                                                    sx={{ 
                                                        p: 2, 
                                                        borderRadius: 0.5, 
                                                        bgcolor: 'success.50', 
                                                        border: '1px solid', 
                                                        borderColor: 'success.100',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 2
                                                    }}
                                                >
                                                    <Avatar sx={{ width: 24, height: 24, bgcolor: 'success.main', color: 'white' }}>
                                                        <DoneIcon sx={{ fontSize: 16 }} />
                                                    </Avatar>
                                                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.900' }}>
                                                        {benefit}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">No specific benefits listed.</Typography>
                                )}
                            </Box>
                        </CardContent>
                    </Card>

                    <Box sx={{ p: 4, borderRadius: 0.5, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, mb: 2 }}>
                            Need to include this package in a project?
                        </Typography>
                        <Button 
                            variant="contained" 
                            component={Link} 
                            href={route('admin.projects.create')} 
                            sx={{ borderRadius: 0.5, fontWeight: 800 }}
                        >
                            Create Project with this Package
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </AdminLayout>
    );
}
