import React, { useState } from 'react';
import { 
    Box, 
    Drawer, 
    AppBar, 
    Toolbar, 
    List, 
    Typography, 
    Divider, 
    IconButton, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Container,
    CssBaseline,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
    Tooltip,
    Avatar,
    alpha
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Logout as LogoutIcon,
    Construction as ConstructionIcon,
    Brightness4 as DarkModeIcon,
    Brightness7 as LightModeIcon,
    SettingsBrightness as SystemModeIcon,
    ChevronLeft as ChevronLeftIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    ListAlt as ListAltIcon,
    Category as CategoryIcon,
    Collections as GalleryIcon,
    People as PeopleIcon,
    Map as MapIcon,
    Home as HomeIcon,
    Assignment as AssignmentIcon,
    Build as BuildIcon,
    Weekend as WeekendIcon,
    CollectionsBookmark as CollectionsBookmarkIcon,
    Business as BusinessIcon
} from '@mui/icons-material';
import { Link, usePage, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useColorMode } from '@/Contexts/ThemeContext';

const drawerWidth = 260;

const BRAND_COLOR = '#00695c';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { mode, toggleColorMode } = useColorMode();
    
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        router.post(route('admin.logout'));
    };

    const menuGroups = [
        {
            title: 'Workspace',
            items: [
                { text: 'Dashboard', icon: <DashboardIcon />, href: route('admin.dashboard') },
                { text: 'Projects', icon: <ConstructionIcon />, href: route('admin.projects.index') },
                { text: 'Users', icon: <PeopleIcon />, href: '#' },
            ]
        },
        {
            title: 'Packages & Services',
            items: [
                { text: 'Service Packages', icon: <ListAltIcon />, href: route('admin.service-packages.index') },
                { text: 'Service Categories', icon: <CategoryIcon />, href: route('admin.service-categories.index') },
            ]
        },
        {
            title: 'Media Management',
            items: [
                { text: 'Image Gallery', icon: <GalleryIcon />, href: route('admin.gallery.index') },
                { text: 'Image Types', icon: <CollectionsBookmarkIcon />, href: route('admin.image-types.index') },
            ]
        },
        {
            title: 'System Configurations',
            items: [
                { text: 'Office Branches', icon: <BusinessIcon />, href: route('admin.office-branches.index') },
                { text: 'Amenities', icon: <WeekendIcon />, href: route('admin.amenities.index') },
                { text: 'Districts', icon: <MapIcon />, href: route('admin.districts.index') },
                { text: 'Room Types', icon: <HomeIcon />, href: route('admin.room-types.index') },
                { text: 'Package Agreements', icon: <AssignmentIcon />, href: route('admin.agreements.index') },
                { text: 'Package Materials', icon: <BuildIcon />, href: route('admin.package-materials.index') },
            ]
        }
    ];

    const ThemeIcon = () => {
        if (mode === 'dark') return <DarkModeIcon fontSize="small" />;
        if (mode === 'light') return <Brightness7 fontSize="small" />;
        return <SystemModeIcon fontSize="small" />;
    };

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
            <Toolbar sx={{ px: 3, py: 3, justifyContent: 'center' }}>
                <Link href={route('admin.dashboard')} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <Box component="img" src="/BGC.jpeg" alt="Bhaigya Logo" sx={{ height: 45, width: 'auto', borderRadius: 0.5, filter: theme.palette.mode === 'dark' ? 'brightness(0.9)' : 'none' }} />
                </Link>
            </Toolbar>
            
            <Divider sx={{ mx: 2, mb: 2, opacity: 0.5 }} />

            <Box sx={{ px: 2, flexGrow: 1, overflowY: 'auto' }}>
                {menuGroups.map((group, groupIndex) => (
                    <Box key={groupIndex} sx={{ mb: 3 }}>
                        <Typography variant="overline" sx={{ px: 1.5, fontWeight: 800, color: 'text.secondary', fontSize: '0.7rem', letterSpacing: 1.2 }}>
                            {group.title}
                        </Typography>
                        <List sx={{ mt: 0.5, py: 0 }}>
                            {group.items.map((item) => {
                                let active = false;
                                try {
                                    active = usePage().url === (item.href.startsWith('http') ? new URL(item.href).pathname : item.href);
                                    if(!active && item.href !== '#' && usePage().url.startsWith(item.href.startsWith('http') ? new URL(item.href).pathname : item.href)) {
                                        active = true; // Fallback for nested routes
                                    }
                                } catch (e) {
                                    active = false;
                                }

                                return (
                                    <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                                        <ListItemButton
                                            component={Link}
                                            href={item.href}
                                            selected={active}
                                            onClick={() => isMobile && setMobileOpen(false)}
                                            sx={{
                                                borderRadius: 1,
                                                py: 1,
                                                px: 2,
                                                mx: 0.5,
                                                transition: 'all 0.2s',
                                                '&.Mui-selected': {
                                                    backgroundColor: BRAND_COLOR,
                                                    color: 'white',
                                                    '& .MuiListItemIcon-root': {
                                                        color: 'white',
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: alpha(BRAND_COLOR, 0.9),
                                                    }
                                                },
                                                '&:hover': {
                                                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                                }
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 35, color: active ? 'inherit' : 'text.secondary' }}>
                                                {React.cloneElement(item.icon, { fontSize: 'small' })}
                                            </ListItemIcon>
                                            <ListItemText 
                                                primary={item.text} 
                                                primaryTypographyProps={{ 
                                                    fontSize: '0.875rem',
                                                    fontWeight: active ? 700 : 500 
                                                }} 
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                ))}
            </Box>

            <Box sx={{ p: 2 }}>
                <Box sx={{ 
                    p: 2, 
                    borderRadius: 1.5, 
                    bgcolor: theme.palette.mode === 'dark' ? alpha(BRAND_COLOR, 0.1) : alpha(BRAND_COLOR, 0.05),
                    border: '1px solid',
                    borderColor: alpha(BRAND_COLOR, 0.2),
                }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: BRAND_COLOR }}>Tech Support</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>v1.0.4 • Bhaigya Admin</Typography>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <CssBaseline />
            
            {/* Header */}
            <AppBar 
                position="fixed" 
                sx={{ 
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    boxShadow: 'none',
                    backgroundColor: 'background.default',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    color: 'text.primary',
                    backdropFilter: 'blur(8px)',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
                            {menuGroups.flatMap(g => g.items).find(i => {
                                try {
                                    const url = i.href.startsWith('http') ? new URL(i.href).pathname : i.href;
                                    return usePage().url === url || (i.href !== '#' && usePage().url.startsWith(url));
                                } catch (e) {
                                    return false;
                                }
                            })?.text || 'Dashboard'}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
                        <Tooltip title="Toggle Theme">
                            <IconButton 
                                onClick={toggleColorMode} 
                                sx={{ 
                                    border: '1px solid', 
                                    borderColor: 'divider',
                                    borderRadius: 2
                                }}
                            >
                                <ThemeIcon />
                            </IconButton>
                        </Tooltip>

                        <Box 
                            onClick={handleMenu}
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 1.5, 
                                cursor: 'pointer',
                                p: 0.5,
                                pr: 1.5,
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                '&:hover': { bgcolor: 'action.hover' }
                            }}
                        >
                            <Avatar 
                                sx={{ 
                                    width: 32, 
                                    height: 32, 
                                    fontSize: '0.875rem', 
                                    fontWeight: 700,
                                    bgcolor: 'primary.main' 
                                }}
                            >
                                {auth.user.name.charAt(0)}
                            </Avatar>
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Typography variant="subtitle2" sx={{ lineHeight: 1, fontWeight: 700 }}>
                                    {auth.user.name}
                                </Typography>
                            </Box>
                            <KeyboardArrowDownIcon fontSize="small" sx={{ opacity: 0.5 }} />
                        </Box>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            PaperProps={{
                                sx: { 
                                    mt: 1.5, 
                                    width: 200, 
                                    borderRadius: 3,
                                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                }
                            }}
                        >
                            <Box sx={{ px: 2, py: 1.5 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{auth.user.name}</Typography>
                                <Typography variant="caption" color="text.secondary">{auth.user.email}</Typography>
                            </Box>
                            <Divider />
                            <MenuItem onClick={handleLogout} sx={{ m: 1, borderRadius: 2, color: 'error.main' }}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" color="error" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            
            {/* Sidebar Navigation */}
            <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid', borderColor: 'divider' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main Content Area */}
            <Box 
                component="main" 
                sx={{ 
                    flexGrow: 1, 
                    p: { xs: 2, sm: 3, md: 5 }, 
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    minHeight: '100vh',
                }}
            >
                <Toolbar />
                <Container maxWidth="xl" sx={{ p: 0 }}>
                    {children}
                </Container>
            </Box>
        </Box>
    );
}

// Fixed import for Brightness7
import { Brightness7 } from '@mui/icons-material';
