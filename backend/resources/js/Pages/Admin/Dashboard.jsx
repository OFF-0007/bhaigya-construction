import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
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
    Chip
} from '@mui/material';
import { 
    People as PeopleIcon, 
    Refresh as RefreshIcon,
    Construction as ConstructionIcon,
    Engineering as EngineeringIcon,
    TrendingUp as TrendingUpIcon,
    MoreVert as MoreVertIcon,
    CheckCircle as CheckCircleIcon,
    Schedule as ScheduleIcon
} from '@mui/icons-material';

export default function Dashboard({ stats }) {
    const theme = useTheme();

    const statCards = [
        { 
            title: 'Total Users', 
            value: stats.users, 
            trend: '+12%',
            icon: <PeopleIcon />, 
            color: '#6366f1' 
        },
        { 
            title: 'Active Projects', 
            value: '24', 
            trend: '+5%',
            icon: <ConstructionIcon />, 
            color: '#10b981' 
        },
        { 
            title: 'Revenue', 
            value: '$12.5k', 
            trend: '+18%',
            icon: <TrendingUpIcon />, 
            color: '#f59e0b' 
        },
    ];

    const recentActivities = [
        { id: 1, user: 'John Doe', action: 'added a new project', time: '2 hours ago', icon: <ConstructionIcon />, color: 'primary' },
        { id: 2, user: 'Sarah Smith', action: 'updated service details', time: '4 hours ago', icon: <EngineeringIcon />, color: 'secondary' },
        { id: 3, user: 'System', action: 'completed database backup', time: '1 day ago', icon: <CheckCircleIcon />, color: 'success' },
    ];

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
                    sx={{ borderRadius: 3, px: 3, py: 1 }}
                >
                    Update Report
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Stats Cards */}
                {statCards.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Avatar sx={{ 
                                        bgcolor: stat.color + '15', 
                                        color: stat.color,
                                        width: 48, 
                                        height: 48,
                                        borderRadius: 2.5
                                    }}>
                                        {stat.icon}
                                    </Avatar>
                                    <Chip 
                                        label={stat.trend} 
                                        size="small" 
                                        sx={{ 
                                            bgcolor: '#10b98115', 
                                            color: '#10b981', 
                                            fontWeight: 700,
                                            borderRadius: 1.5
                                        }} 
                                    />
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                                    {stat.value}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, opacity: 0.8 }}>
                                    {stat.title}
                                </Typography>
                            </CardContent>
                            {/* Subtle background decoration */}
                            <Box sx={{ 
                                position: 'absolute', 
                                right: -20, 
                                bottom: -20, 
                                opacity: 0.05,
                                transform: 'rotate(-15deg)'
                            }}>
                                {React.cloneElement(stat.icon, { sx: { fontSize: 100 } })}
                            </Box>
                        </Card>
                    </Grid>
                ))}

                {/* Main Content Grid */}
                <Grid item xs={12} lg={8}>
                    <Card sx={{ borderRadius: 4 }}>
                        <CardHeader 
                            title="Recent Activity" 
                            titleTypographyProps={{ fontWeight: 800, fontSize: '1.125rem' }}
                            action={
                                <IconButton><MoreVertIcon /></IconButton>
                            }
                            sx={{ px: 3, pt: 3 }}
                        />
                        <CardContent sx={{ px: 0 }}>
                            <List sx={{ py: 0 }}>
                                {recentActivities.map((activity, index) => (
                                    <React.Fragment key={activity.id}>
                                        <ListItem sx={{ px: 3, py: 2 }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: `${activity.color}.main`, color: 'white' }}>
                                                    {activity.icon}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText 
                                                primary={
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                        {activity.user} <Box component="span" sx={{ fontWeight: 500, color: 'text.secondary' }}>{activity.action}</Box>
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                                        <ScheduleIcon sx={{ fontSize: 14, opacity: 0.5 }} />
                                                        <Typography variant="caption">{activity.time}</Typography>
                                                    </Box>
                                                }
                                            />
                                            <Button size="small" sx={{ fontWeight: 700, borderRadius: 2 }}>View</Button>
                                        </ListItem>
                                        {index < recentActivities.length - 1 && <Divider component="li" sx={{ mx: 3 }} />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Card sx={{ 
                        borderRadius: 4, 
                        bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.main',
                        color: 'white',
                        p: 1
                    }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Upgrade to Pro</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                                Get advanced analytics and priority support for your construction business.
                            </Typography>
                            <Button 
                                variant="contained" 
                                fullWidth 
                                sx={{ 
                                    bgcolor: 'white', 
                                    color: 'primary.main',
                                    borderRadius: 3,
                                    py: 1.2,
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                                }}
                            >
                                Learn More
                            </Button>
                        </CardContent>
                    </Card>

                    <Card sx={{ borderRadius: 4, mt: 3 }}>
                        <CardHeader 
                            title="System Status" 
                            titleTypographyProps={{ fontWeight: 800, fontSize: '1.125rem' }}
                            sx={{ px: 3, pt: 3 }}
                        />
                        <CardContent sx={{ px: 3, pb: 3 }}>
                            {[
                                { label: 'Database', status: 'Optimal', color: '#10b981' },
                                { label: 'API Gateway', status: 'Healthy', color: '#10b981' },
                                { label: 'Filesystem', status: 'Active', color: '#6366f1' },
                            ].map((item, i) => (
                                <Box key={i} sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>{item.label}</Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: item.color }}>{item.status}</Typography>
                                    </Box>
                                    <Box sx={{ height: 6, width: '100%', bgcolor: 'action.hover', borderRadius: 3, overflow: 'hidden' }}>
                                        <Box sx={{ height: '100%', width: '85%', bgcolor: item.color, borderRadius: 3 }} />
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
