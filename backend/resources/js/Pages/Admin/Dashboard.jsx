import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Grid, 
    Typography, 
    Box,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Avatar,
    Divider,
    useTheme,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Chip,
    Tooltip,
    Stack
} from '@mui/material';
import { 
    People as PeopleIcon, 
    Refresh as RefreshIcon,
    Construction as ConstructionIcon,
    Engineering as EngineeringIcon,
    TrendingUp as TrendingUpIcon,
    MoreVert as MoreVertIcon,
    CheckCircle as CheckCircleIcon,
    Schedule as ScheduleIcon,
    ListAlt as ListAltIcon,
    Category as CategoryIcon,
    Build as BuildIcon,
    Assignment as ProjectIcon
} from '@mui/icons-material';

export default function Dashboard({ stats, recentActivities }) {
    const theme = useTheme();

    const statCards = [
        { 
            title: 'Total Packages', 
            value: stats.packages, 
            icon: <ListAltIcon />, 
            color: '#6366f1' 
        },
        { 
            title: 'Service Categories', 
            value: stats.categories, 
            icon: <CategoryIcon />, 
            color: '#f59e0b' 
        },
        { 
            title: 'Total Projects', 
            value: stats.projects, 
            icon: <ProjectIcon />, 
            color: '#10b981' 
        },
        { 
            title: 'Active Sites', 
            value: stats.activeProjects, 
            icon: <BuildIcon />, 
            color: '#ec4899' 
        },
    ];

    const statusMap = {
        ongoing: { color: 'warning', label: 'Ongoing' },
        upcoming: { color: 'info', label: 'Upcoming' },
        completed: { color: 'success', label: 'Completed' },
    };

    return (
        <AdminLayout>
            <Head title="Dashboard" />
            
            {/* Header Section */}
            <Box sx={{ 
                mb: 5, 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2
            }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -1 }}>
                        Overview
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Welcome back! Here's what's happening today.
                    </Typography>
                </Box>
                <Button 
                    variant="contained" 
                    startIcon={<RefreshIcon />}
                    sx={{ borderRadius: 1, px: 3, py: 1 }}
                >
                    Update Report
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Stats Cards */}
                {statCards.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ borderRadius: 1, position: 'relative', overflow: 'hidden' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Avatar sx={{ 
                                        bgcolor: stat.color + '15', 
                                        color: stat.color,
                                        width: 48, 
                                        height: 48,
                                        borderRadius: 0.75
                                    }}>
                                        {stat.icon}
                                    </Avatar>
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                                    {stat.value}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, opacity: 0.8 }}>
                                    {stat.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {/* Main Content Grid */}
                <Grid item xs={12} lg={8}>
                    <Card sx={{ borderRadius: 1 }}>
                        <CardHeader 
                            title="Recent Projects" 
                            titleTypographyProps={{ fontWeight: 800, fontSize: '1.125rem' }}
                            action={
                                <Button component={Link} href={route('admin.projects.index')} size="small" sx={{ fontWeight: 700 }}>View All</Button>
                            }
                            sx={{ px: 3, pt: 3 }}
                        />
                        <CardContent sx={{ px: 0 }}>
                            <List sx={{ py: 0 }}>
                                {recentActivities.map((activity, index) => (
                                    <React.Fragment key={activity.id}>
                                        <ListItem sx={{ px: 3, py: 2 }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 0.75 }}>
                                                    <ConstructionIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText 
                                                primary={
                                                    <Typography component="div" variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                        {activity.title} 
                                                        <Chip 
                                                            label={activity.status} 
                                                            size="small" 
                                                            color={statusMap[activity.status]?.color || 'default'}
                                                            sx={{ ml: 1, height: 20, fontSize: '0.65rem', fontWeight: 800, borderRadius: 0.5 }}
                                                        />
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{activity.type || 'Standard'}</Typography>
                                                        <Divider orientation="vertical" flexItem sx={{ height: 12, my: 'auto' }} />
                                                        <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
                                                    </Box>
                                                }
                                                secondaryTypographyProps={{ component: 'div' }}
                                            />
                                            <Button 
                                                component={Link} 
                                                href={route('admin.projects.show', activity.id)}
                                                size="small" 
                                                sx={{ fontWeight: 700, borderRadius: 0.75 }}
                                            >
                                                Manage
                                            </Button>
                                        </ListItem>
                                        {index < recentActivities.length - 1 && <Divider component="li" sx={{ mx: 3 }} />}
                                    </React.Fragment>
                                ))}
                                {recentActivities.length === 0 && (
                                    <Box sx={{ p: 4, textAlign: 'center' }}>
                                        <Typography color="text.secondary">No recent activity found.</Typography>
                                    </Box>
                                )}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Card sx={{ 
                        borderRadius: 1, 
                        bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.main',
                        color: 'white',
                        p: 1,
                        mb: 3
                    }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Quick Actions</Typography>
                            <Stack spacing={1.5} sx={{ mt: 2 }}>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    component={Link}
                                    href={route('admin.projects.create')}
                                    sx={{ 
                                        bgcolor: 'white', 
                                        color: 'primary.main',
                                        borderRadius: 0.75,
                                        fontWeight: 800,
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                                    }}
                                >
                                    Add New Project
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    fullWidth 
                                    component={Link}
                                    href={route('admin.service-packages.index')}
                                    sx={{ 
                                        borderColor: 'rgba(255,255,255,0.5)',
                                        color: 'white',
                                        borderRadius: 0.75,
                                        fontWeight: 800,
                                        '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                                    }}
                                >
                                    Manage Packages
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card sx={{ borderRadius: 1 }}>
                        <CardHeader 
                            title="Project Distribution" 
                            titleTypographyProps={{ fontWeight: 800, fontSize: '1.125rem' }}
                            sx={{ px: 3, pt: 3 }}
                        />
                        <CardContent sx={{ px: 3, pb: 3 }}>
                            {[
                                { label: 'Ongoing', count: stats.ongoingProjects, color: '#f59e0b', total: stats.projects },
                                { label: 'Upcoming', count: stats.upcomingProjects, color: '#6366f1', total: stats.projects },
                                { label: 'Completed', count: stats.completedProjects, color: '#10b981', total: stats.projects },
                            ].map((item, i) => (
                                <Box key={i} sx={{ mb: 2.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>{item.label}</Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 800 }}>{item.count}</Typography>
                                    </Box>
                                    <Box sx={{ height: 8, width: '100%', bgcolor: 'action.hover', borderRadius: 1, overflow: 'hidden' }}>
                                        <Box 
                                            sx={{ 
                                                height: '100%', 
                                                width: item.total > 0 ? `${(item.count / item.total) * 100}%` : '0%', 
                                                bgcolor: item.color, 
                                                borderRadius: 1 
                                            }} 
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </AdminLayout>
    );
}
