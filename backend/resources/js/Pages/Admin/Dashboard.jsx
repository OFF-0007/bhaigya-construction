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
    Stack,
    alpha
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

const BRAND_COLOR = '#00695c';

export default function Dashboard({ stats, recentActivities }) {
    const theme = useTheme();

    const statCards = [
        { 
            title: 'Total Packages', 
            value: stats.packages, 
            icon: <ListAltIcon />, 
            color: BRAND_COLOR 
        },
        { 
            title: 'Service Categories', 
            value: stats.categories, 
            icon: <CategoryIcon />, 
            color: '#7c9a92' 
        },
        { 
            title: 'Total Projects', 
            value: stats.projects, 
            icon: <ProjectIcon />, 
            color: '#4a6741' 
        },
        { 
            title: 'Active Sites', 
            value: stats.activeProjects, 
            icon: <BuildIcon />, 
            color: '#8b9467' 
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
                mb: 4, 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2
            }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a1a', letterSpacing: -0.5 }}>
                        Dashboard Overview
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        System summary and recent construction activity.
                    </Typography>
                </Box>
                <Button 
                    variant="contained" 
                    startIcon={<RefreshIcon />}
                    sx={{ 
                        borderRadius: 1, 
                        px: 3, 
                        py: 1, 
                        bgcolor: BRAND_COLOR,
                        textTransform: 'none',
                        fontWeight: 700,
                        '&:hover': { bgcolor: alpha(BRAND_COLOR, 0.9) }
                    }}
                >
                    Refresh Data
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Stats Cards */}
                {statCards.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card elevation={0} sx={{ borderRadius: 1, border: '1px solid #eee', position: 'relative', overflow: 'hidden' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                    <Avatar sx={{ 
                                        bgcolor: alpha(stat.color, 0.1), 
                                        color: stat.color,
                                        width: 42, 
                                        height: 42,
                                        borderRadius: 1
                                    }}>
                                        {React.cloneElement(stat.icon, { fontSize: 'small' })}
                                    </Avatar>
                                    <TrendingUpIcon sx={{ color: 'success.main', fontSize: 18, opacity: 0.5 }} />
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 900, mb: 0.5 }}>
                                    {stat.value}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    {stat.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {/* Main Content Grid */}
                <Grid item xs={12} lg={8}>
                    <Card elevation={0} sx={{ borderRadius: 1, border: '1px solid #eee' }}>
                        <CardHeader 
                            title="Recent Activity" 
                            titleTypographyProps={{ fontWeight: 800, fontSize: '1rem' }}
                            action={
                                <Button component={Link} href={route('admin.projects.index')} size="small" sx={{ fontWeight: 700, color: BRAND_COLOR, textTransform: 'none' }}>View Detailed Report</Button>
                            }
                            sx={{ px: 3, pt: 3, pb: 0 }}
                        />
                        <CardContent sx={{ px: 0 }}>
                            <List sx={{ py: 0 }}>
                                {recentActivities.map((activity, index) => (
                                    <React.Fragment key={activity.id}>
                                        <ListItem sx={{ px: 3, py: 2 }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: alpha(BRAND_COLOR, 0.1), color: BRAND_COLOR, borderRadius: 1 }}>
                                                    <ConstructionIcon fontSize="small" />
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
                                                            sx={{ ml: 1, height: 18, fontSize: '0.6rem', fontWeight: 800, borderRadius: 0.5 }}
                                                        />
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{activity.type || 'Standard'}</Typography>
                                                        <Divider orientation="vertical" flexItem sx={{ height: 10, my: 'auto' }} />
                                                        <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
                                                    </Box>
                                                }
                                                secondaryTypographyProps={{ component: 'div' }}
                                            />
                                            <Button 
                                                component={Link} 
                                                href={route('admin.projects.show', activity.id)}
                                                size="small" 
                                                variant="outlined"
                                                sx={{ 
                                                    fontWeight: 700, 
                                                    borderRadius: 1, 
                                                    textTransform: 'none',
                                                    px: 2,
                                                    borderColor: '#eee',
                                                    color: 'text.primary',
                                                    '&:hover': { borderColor: BRAND_COLOR, color: BRAND_COLOR }
                                                }}
                                            >
                                                Manage
                                            </Button>
                                        </ListItem>
                                        {index < recentActivities.length - 1 && <Divider component="li" sx={{ mx: 3, opacity: 0.6 }} />}
                                    </React.Fragment>
                                ))}
                                {recentActivities.length === 0 && (
                                    <Box sx={{ p: 6, textAlign: 'center' }}>
                                        <Typography variant="body2" color="text.secondary">No recent activity detected.</Typography>
                                    </Box>
                                )}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Card elevation={0} sx={{ 
                        borderRadius: 1, 
                        bgcolor: BRAND_COLOR,
                        color: 'white',
                        p: 1,
                        mb: 3,
                        boxShadow: `0 4px 12px ${alpha(BRAND_COLOR, 0.2)}`
                    }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>Quick Actions</Typography>
                            <Typography variant="caption" sx={{ display: 'block', mb: 2.5, opacity: 0.8 }}>Efficiently manage your construction workflow.</Typography>
                            <Stack spacing={1.5}>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    component={Link}
                                    href={route('admin.projects.create')}
                                    sx={{ 
                                        bgcolor: 'white', 
                                        color: BRAND_COLOR,
                                        borderRadius: 1,
                                        fontWeight: 800,
                                        textTransform: 'none',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                                    }}
                                >
                                    Launch New Project
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    fullWidth 
                                    component={Link}
                                    href={route('admin.service-packages.index')}
                                    sx={{ 
                                        borderColor: 'rgba(255,255,255,0.4)',
                                        color: 'white',
                                        borderRadius: 1,
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                                    }}
                                >
                                    Service Configurations
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    fullWidth 
                                    component={Link}
                                    href={route('admin.agreements.index')}
                                    sx={{ 
                                        borderColor: 'rgba(255,255,255,0.4)',
                                        color: 'white',
                                        borderRadius: 1,
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                                    }}
                                >
                                    Package Agreements
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    fullWidth 
                                    component={Link}
                                    href={route('admin.package-materials.index')}
                                    sx={{ 
                                        borderColor: 'rgba(255,255,255,0.4)',
                                        color: 'white',
                                        borderRadius: 1,
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                                    }}
                                >
                                    Package Materials
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card elevation={0} sx={{ borderRadius: 1, border: '1px solid #eee' }}>
                        <CardHeader 
                            title="Site Distribution" 
                            titleTypographyProps={{ fontWeight: 800, fontSize: '1rem' }}
                            sx={{ px: 3, pt: 3 }}
                        />
                        <CardContent sx={{ px: 3, pb: 3 }}>
                            {[
                                { label: 'Ongoing Sites', count: stats.ongoingProjects, color: BRAND_COLOR, total: stats.projects },
                                { label: 'Upcoming Leads', count: stats.upcomingProjects, color: '#8b9467', total: stats.projects },
                                { label: 'Completed', count: stats.completedProjects, color: '#4a6741', total: stats.projects },
                            ].map((item, i) => (
                                <Box key={i} sx={{ mb: 2.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>{item.label}</Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 800 }}>{item.count}</Typography>
                                    </Box>
                                    <Box sx={{ height: 6, width: '100%', bgcolor: '#f0f0f0', borderRadius: 1, overflow: 'hidden' }}>
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
