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
    Category as CategoryIcon
} from '@mui/icons-material';
import { Link, usePage, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useColorMode } from '@/Contexts/ThemeContext';

const drawerWidth = 260;

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

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, href: route('admin.dashboard') },
        { text: 'Service Packages', icon: <ListAltIcon />, href: route('admin.service-packages.index') },
        { text: 'Projects', icon: <ConstructionIcon />, href: route('admin.projects.index') },
        { text: 'Users', icon: <LogoutIcon />, href: '#' },
    ];

    const masterItems = [
        { text: 'Service Categories', icon: <CategoryIcon />, href: route('admin.service-categories.index') },
        { text: 'Amenities', icon: <ListAltIcon />, href: route('admin.amenities.index') },
        { text: 'Districts', icon: <CategoryIcon />, href: route('admin.districts.index') },
        { text: 'Image Types', icon: <CategoryIcon />, href: route('admin.image-types.index') },
        { text: 'Room Types', icon: <CategoryIcon />, href: route('admin.room-types.index') },
    ];

    const ThemeIcon = () => {
        if (mode === 'dark') return <DarkModeIcon fontSize="small" />;
        if (mode === 'light') return <Brightness7 fontSize="small" />;
        return <SystemModeIcon fontSize="small" />;
    };

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Toolbar sx={{ px: 3, py: 2 }}>
                <Link href={route('admin.dashboard')} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <Box component="img" src="/BGC.jpeg" alt="Bhaigya Logo" sx={{ height: 40, width: 'auto', borderRadius: 1 }} />
                </Link>
            </Toolbar>
            
            <Box sx={{ px: 2, py: 2 }}>
                <Typography variant="overline" sx={{ px: 1.5, fontWeight: 700, color: 'text.secondary', opacity: 0.6 }}>
                    General
                </Typography>
                <List sx={{ mt: 1 }}>
                    {menuItems.map((item) => {
                        let active = false;
                        try {
                            active = usePage().url === (item.href.startsWith('http') ? new URL(item.href).pathname : item.href);
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
                                        borderRadius: 2.5,
                                        py: 1.2,
                                        px: 2,
                                        transition: 'all 0.2s',
                                        '&.Mui-selected': {
                                            backgroundColor: theme.palette.primary.main,
                                            color: 'white',
                                            '& .MuiListItemIcon-root': {
                                                color: 'white',
                                            },
                                            '&:hover': {
                                                backgroundColor: theme.palette.primary.dark,
                                            }
                                        },
                                        '&:hover': {
                                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 38, color: active ? 'inherit' : 'text.secondary' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={item.text} 
                                        primaryTypographyProps={{ 
                                            fontSize: '0.925rem',
                                            fontWeight: active ? 700 : 500 
                                        }} 
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

            <Box sx={{ px: 2, py: 0 }}>
                <Typography variant="overline" sx={{ px: 1.5, fontWeight: 700, color: 'text.secondary', opacity: 0.6 }}>
                    Master
                </Typography>
                <List sx={{ mt: 1 }}>
                    {masterItems.map((item) => {
                        let active = false;
                        try {
                            active = usePage().url.startsWith(item.href.startsWith('http') ? new URL(item.href).pathname : item.href);
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
                                        borderRadius: 2.5,
                                        py: 1.2,
                                        px: 2,
                                        transition: 'all 0.2s',
                                        '&.Mui-selected': {
                                            backgroundColor: theme.palette.primary.main,
                                            color: 'white',
                                            '& .MuiListItemIcon-root': {
                                                color: 'white',
                                            },
                                            '&:hover': {
                                                backgroundColor: theme.palette.primary.dark,
                                            }
                                        },
                                        '&:hover': {
                                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 38, color: active ? 'inherit' : 'text.secondary' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={item.text} 
                                        primaryTypographyProps={{ 
                                            fontSize: '0.925rem',
                                            fontWeight: active ? 700 : 500 
                                        }} 
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

            <Box sx={{ mt: 'auto', p: 3 }}>
                <Box sx={{ 
                    p: 2, 
                    borderRadius: 3, 
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    borderOpacity: 0.1
                }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Support</Typography>
                    <Typography variant="caption" color="text.secondary">Need help? Contact our tech team.</Typography>
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
                            {[...menuItems, ...masterItems].find(i => {
                                try {
                                    const url = i.href.startsWith('http') ? new URL(i.href).pathname : i.href;
                                    return usePage().url === url;
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
