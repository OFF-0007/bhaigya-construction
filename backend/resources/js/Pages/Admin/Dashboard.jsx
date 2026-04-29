import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Typography, Box, Card, CardContent, CardHeader, Avatar, 
    Divider, useTheme, Button, List, ListItem, ListItemAvatar, 
    ListItemText, Chip, IconButton, Tooltip, alpha, useMediaQuery
} from '@mui/material';
import { 
    Refresh as RefreshIcon, Construction as ConstructionIcon,
    TrendingUp as TrendingUpIcon, ListAlt as ListAltIcon,
    Category as CategoryIcon, Build as BuildIcon,
    Assignment as ProjectIcon, AccountBalanceWallet as WalletIcon,
    People as PeopleIcon, Map as MapIcon, Image as ImageIcon,
    Home as HomeIcon, ChevronRight as ChevronRightIcon,
    DesignServices as DesignServicesIcon, Weekend as WeekendIcon,
    Business as BusinessIcon
} from '@mui/icons-material';

const BRAND_COLOR = '#00695c';

export default function Dashboard({ stats, recentActivities }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const statCards = [
        { title: 'Total Projects', value: stats.projects, icon: <ProjectIcon />, gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)', shadow: 'rgba(102, 126, 234, 0.4)' },
        { title: 'Active Sites', value: stats.activeProjects, icon: <BuildIcon />, gradient: 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)', shadow: 'rgba(246, 211, 101, 0.4)' },
        { title: 'Total Packages', value: stats.packages, icon: <ListAltIcon />, gradient: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)', shadow: 'rgba(0, 201, 255, 0.4)' },
        { title: 'Total Users', value: stats.users || 0, icon: <PeopleIcon />, gradient: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)', shadow: 'rgba(255, 154, 158, 0.4)' },
    ];

    const featureModules = [
        { title: 'Service Categories', desc: 'Manage master categories', icon: <DesignServicesIcon />, color: '#e91e63', link: route('admin.service-categories.index') },
        { title: 'Amenities', desc: 'Manage project amenities', icon: <WeekendIcon />, color: '#9c27b0', link: route('admin.amenities.index') },
        { title: 'Districts', desc: 'Service area districts', icon: <MapIcon />, color: '#3f51b5', link: route('admin.districts.index') },
        { title: 'Image Types', desc: 'Gallery classifications', icon: <ImageIcon />, color: '#00bcd4', link: route('admin.image-types.index') },
        { title: 'Room Types', desc: 'Property room definitions', icon: <HomeIcon />, color: '#ff9800', link: route('admin.room-types.index') },
        { title: 'Agreements', desc: 'Package agreement terms', icon: <WalletIcon />, color: '#795548', link: route('admin.agreements.index') },
        { title: 'Package Materials', desc: 'Material specifications', icon: <CategoryIcon />, color: '#607d8b', link: route('admin.package-materials.index') },
        { title: 'Gallery', desc: 'Manage project images', icon: <ImageIcon />, color: '#4caf50', link: route('admin.gallery.index') },
        { title: 'Office Branches', desc: 'Company locations & contacts', icon: <BusinessIcon />, color: '#673ab7', link: route('admin.office-branches.index') },
    ];

    const secondaryStats = [
        { label: 'Ongoing', value: stats.ongoingProjects, color: '#f59e0b' },
        { label: 'Upcoming', value: stats.upcomingProjects, color: '#3b82f6' },
        { label: 'Completed', value: stats.completedProjects, color: '#10b981' },
        { label: 'Categories', value: stats.categories, color: BRAND_COLOR },
    ];

    const statusMap = {
        ongoing: { color: 'warning', label: 'Ongoing', bg: '#fff4e5', text: '#663c00' },
        upcoming: { color: 'info', label: 'Upcoming', bg: '#e8f4fd', text: '#0d3c61' },
        completed: { color: 'success', label: 'Completed', bg: '#edf7ed', text: '#1e4620' },
    };

    return (
        <AdminLayout>
            <Head title="Dashboard" />
            
            {/* Header Section */}
            <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-end' }, gap: 2, animation: 'fadeIn 0.5s ease-out' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 900, background: isDark ? 'linear-gradient(to right, #fff, #aaa)' : 'linear-gradient(to right, #1a1a1a, #4a4a4a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: -0.5, mb: 0.5 }}>
                        Workspace Overview
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Manage your entire construction business from one place.
                    </Typography>
                </Box>
                <Button 
                    variant="contained" 
                    startIcon={<RefreshIcon />}
                    onClick={() => window.location.reload()}
                    sx={{ 
                        borderRadius: 3, px: 3, py: 1.2, 
                        background: `linear-gradient(45deg, ${BRAND_COLOR}, #009688)`,
                        boxShadow: `0 8px 16px ${alpha(BRAND_COLOR, 0.3)}`,
                        textTransform: 'none', fontWeight: 700,
                        '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 12px 20px ${alpha(BRAND_COLOR, 0.4)}` }
                    }}
                >
                    Refresh
                </Button>
            </Box>

            {/* 1. TOP ROW: 4 Main Stats Cards */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
                {statCards.map((stat, index) => (
                    <Card 
                        key={index}
                        elevation={0} 
                        sx={{ 
                            borderRadius: 4, height: '100%',
                            background: isDark ? alpha('#ffffff', 0.03) : '#ffffff',
                            border: '1px solid', borderColor: isDark ? alpha('#fff', 0.05) : 'rgba(0,0,0,0.04)',
                            overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 12px 24px ${isDark ? alpha(stat.shadow, 0.2) : alpha(stat.shadow, 0.4)}`, '& .stat-icon': { transform: 'scale(1.1) rotate(5deg)' } },
                            animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
                        }}
                    >
                        <Box sx={{ position: 'absolute', top: 0, right: 0, width: '180px', height: '180px', background: stat.gradient, opacity: 0.1, borderRadius: '50%', transform: 'translate(25%, -25%)' }} />
                        <CardContent sx={{ p: 3.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                                <Avatar className="stat-icon" sx={{ background: stat.gradient, color: '#fff', width: 56, height: 56, borderRadius: 2.5, boxShadow: `0 8px 16px ${alpha(stat.shadow, 0.4)}`, transition: 'transform 0.3s ease' }}>
                                    {React.cloneElement(stat.icon, { fontSize: 'medium' })}
                                </Avatar>
                                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: alpha('#4caf50', 0.1), px: 1.5, py: 0.5, borderRadius: 1.5 }}>
                                    <TrendingUpIcon sx={{ color: '#4caf50', fontSize: 16, mr: 0.5 }} />
                                </Box>
                            </Box>
                            <Typography variant="h3" sx={{ fontWeight: 900, mb: 0.5, mt: 'auto', letterSpacing: -1 }}>{stat.value}</Typography>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.8rem' }}>{stat.title}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* 2. MIDDLE ROW: System Modules */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>System Modules</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
                    {featureModules.map((module, i) => (
                        <Card 
                            key={i}
                            component={Link} 
                            href={module.link}
                            elevation={0} 
                            sx={{ 
                                textDecoration: 'none', height: '100%', borderRadius: 3, 
                                background: isDark ? alpha('#ffffff', 0.03) : '#ffffff',
                                border: '1px solid', borderColor: isDark ? alpha('#fff', 0.05) : 'rgba(0,0,0,0.04)',
                                display: 'flex', flexDirection: 'row', alignItems: 'center', p: 2.5,
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    borderColor: module.color,
                                    boxShadow: `0 8px 24px ${alpha(module.color, 0.15)}`,
                                    transform: 'translateY(-3px)',
                                    bgcolor: isDark ? alpha(module.color, 0.05) : '#ffffff',
                                    '& .module-icon': { transform: 'scale(1.1)', bgcolor: module.color, color: '#fff' }
                                }
                            }}
                        >
                            <Avatar className="module-icon" sx={{ bgcolor: alpha(module.color, 0.15), color: module.color, width: 46, height: 46, borderRadius: 2.5, mr: 2, transition: 'all 0.3s' }}>
                                {module.icon}
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.2, fontSize: '0.9rem' }}>{module.title}</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>{module.desc}</Typography>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Box>

            {/* 3. BOTTOM ROW: Project Distribution & Recent Activity */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
                
                {/* Left: Project Distribution Analytics */}
                <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: isDark ? alpha('#fff', 0.05) : 'rgba(0,0,0,0.04)', background: isDark ? alpha('#ffffff', 0.03) : '#ffffff', boxShadow: isDark ? 'none' : '0 10px 40px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Project Distribution Analytics</Typography>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, flexGrow: 1, alignItems: 'center' }}>
                            {/* Progress Bars */}
                            <Box sx={{ flex: 1, width: '100%' }}>
                                {[
                                    { label: 'Ongoing Sites', count: stats.ongoingProjects, color: BRAND_COLOR, total: stats.projects },
                                    { label: 'Upcoming Leads', count: stats.upcomingProjects, color: '#f59e0b', total: stats.projects },
                                    { label: 'Completed Projects', count: stats.completedProjects, color: '#10b981', total: stats.projects },
                                ].map((item, i) => (
                                    <Box key={i} sx={{ mb: 3.5, '&:last-child': { mb: 0 } }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary' }}>{item.label}</Typography>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>{item.count}</Typography>
                                        </Box>
                                        <Box sx={{ height: 12, width: '100%', bgcolor: isDark ? alpha('#fff', 0.05) : '#f1f5f9', borderRadius: 6, overflow: 'hidden' }}>
                                            <Box sx={{ height: '100%', width: item.total > 0 ? `${(item.count / item.total) * 100}%` : '0%', bgcolor: item.color, borderRadius: 6, transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: `inset 0 2px 4px rgba(0,0,0,0.1)` }} />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                            {/* 2x2 Mini Stats */}
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: { xs: '100%', md: 'auto' }, minWidth: { md: '250px' } }}>
                                {secondaryStats.map((stat, i) => (
                                    <Box key={i} sx={{ p: 2.5, borderRadius: 3, bgcolor: isDark ? alpha(stat.color, 0.05) : alpha(stat.color, 0.03), border: '1px solid', borderColor: alpha(stat.color, 0.1), textAlign: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
                                        <Typography variant="h4" sx={{ fontWeight: 900, color: stat.color, mb: 0.5 }}>{stat.value}</Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>{stat.label}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                {/* Right: Recent Activity */}
                <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: isDark ? alpha('#fff', 0.05) : 'rgba(0,0,0,0.04)', background: isDark ? alpha('#ffffff', 0.03) : '#ffffff', display: 'flex', flexDirection: 'column' }}>
                    <CardHeader 
                        title="Recent Activity" 
                        titleTypographyProps={{ fontWeight: 800, fontSize: '1.1rem' }}
                        action={<Button component={Link} href={route('admin.projects.index')} sx={{ fontWeight: 700, color: BRAND_COLOR, textTransform: 'none' }}>View All</Button>}
                        sx={{ px: 3, pt: 3, pb: 1 }}
                    />
                    <CardContent sx={{ p: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <List sx={{ py: 0, flexGrow: 1 }}>
                            {recentActivities.map((activity, index) => {
                                const statusStyle = statusMap[activity.status] || { color: 'default', label: activity.status, bg: '#f5f5f5', text: '#333' };
                                return (
                                    <React.Fragment key={activity.id}>
                                        <ListItem sx={{ px: 3, py: 2.5, '&:hover': { bgcolor: isDark ? alpha('#fff', 0.02) : alpha('#000', 0.01) } }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: isDark ? alpha(BRAND_COLOR, 0.2) : alpha(BRAND_COLOR, 0.1), color: BRAND_COLOR, borderRadius: 2, width: 44, height: 44 }}>
                                                    <ConstructionIcon fontSize="small" />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText 
                                                primary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, flexWrap: 'wrap', gap: 1 }}>
                                                        <Typography component="div" variant="subtitle2" sx={{ fontWeight: 800 }}>{activity.title}</Typography>
                                                        <Chip label={statusStyle.label} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800, borderRadius: 1, bgcolor: isDark ? alpha(statusStyle.bg, 0.2) : statusStyle.bg, color: isDark ? (statusStyle.color === 'success' ? '#81c784' : statusStyle.color === 'warning' ? '#ffb74d' : '#64b5f6') : statusStyle.text }} />
                                                    </Box>
                                                }
                                                secondary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{activity.type || 'Phase Update'}</Typography>
                                                        <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.disabled' }} />
                                                        <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
                                                    </Box>
                                                }
                                                secondaryTypographyProps={{ component: 'div' }}
                                            />
                                        </ListItem>
                                        {index < recentActivities.length - 1 && <Divider component="li" sx={{ mx: 3, opacity: 0.4 }} />}
                                    </React.Fragment>
                                );
                            })}
                            {recentActivities.length === 0 && (
                                <Box sx={{ p: 6, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Avatar sx={{ mb: 2, width: 56, height: 56, bgcolor: alpha(BRAND_COLOR, 0.05), color: alpha(BRAND_COLOR, 0.5) }}>
                                        <BuildIcon />
                                    </Avatar>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>No Recent Activity</Typography>
                                    <Typography variant="caption" color="text.secondary">When projects are updated, they will appear here.</Typography>
                                </Box>
                            )}
                        </List>
                    </CardContent>
                </Card>
            </Box>

            <style>
                {`
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                `}
            </style>
        </AdminLayout>
    );
}
