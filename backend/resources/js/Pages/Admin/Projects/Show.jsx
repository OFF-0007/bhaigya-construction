import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Box, Typography, Button, Card, CardContent, Grid, Chip, Divider,
    Avatar, Stack, Tab, Tabs, Paper, IconButton, Tooltip
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    ArrowBack as BackIcon,
    LocationOn as LocationIcon,
    Star as StarIcon,
    CheckCircle as CheckCircleIcon,
    Construction as ConstructionIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    OpenInNew as OpenInNewIcon,
    Description as DescriptionIcon,
    Image as ImageIcon,
    People as PeopleIcon,
    VideoLibrary as VideoIcon,
    Timeline as TimelineIcon,
    Article as DocIcon,
    Info as InfoIcon,
    Category as CategoryIcon,
    Event as EventIcon,
    Straighten as AreaIcon
} from '@mui/icons-material';

function TabPanel({ children, value, index }) {
    return value === index ? <Box sx={{ pt: 4 }}>{children}</Box> : null;
}

const statusColors = {
    ongoing:   { color: '#f59e0b', bg: '#fef3c7' },
    completed: { color: '#10b981', bg: '#d1fae5' },
    upcoming:  { color: '#6366f1', bg: '#ede9fe' },
};

export default function Show({ project }) {
    const [tab, setTab] = useState(0);
    const st = statusColors[project.status] ?? statusColors.upcoming;

    // Determine the main display image (primary or first available)
    const displayImage = project.images?.find(i => i.is_primary) || project.images?.[0];

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this project? This action can be undone if soft deleted.')) {
            router.delete(route('admin.projects.destroy', project.id));
        }
    };

    const handleToggleActive = () => {
        router.patch(route('admin.projects.toggle-active', project.id), {}, { preserveScroll: true });
    };

    return (
        <AdminLayout>
            <Head title={`Project: ${project.project_name}`} />

            {/* Top Navigation & Actions */}
            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                    <Tooltip title="Back to List">
                        <IconButton component={Link} href={route('admin.projects.index')} sx={{ 
                            border: '1px solid', 
                            borderColor: 'divider', 
                            borderRadius: 1,
                            bgcolor: 'background.paper',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}>
                            <BackIcon />
                        </IconButton>
                    </Tooltip>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-1.5px', color: 'text.primary' }}>
                            {project.project_name}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Chip label={project.status.toUpperCase()} size="small" sx={{ fontWeight: 900, bgcolor: st.bg, color: st.color, height: 20, fontSize: '0.65rem' }} />
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>/{project.slug}</Typography>
                        </Stack>
                    </Box>
                </Box>
                
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        startIcon={project.is_active ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        onClick={handleToggleActive}
                        color={project.is_active ? 'warning' : 'success'}
                        sx={{ borderRadius: 1, fontWeight: 800, textTransform: 'none', px: 3 }}
                    >
                        {project.is_active ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button 
                        variant="outlined" 
                        startIcon={<EditIcon />} 
                        component={Link} 
                        href={route('admin.projects.edit', project.id)} 
                        sx={{ borderRadius: 1, fontWeight: 800, textTransform: 'none', px: 3, bgcolor: 'background.paper' }}
                    >
                        Edit Details
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        startIcon={<DeleteIcon />} 
                        onClick={handleDelete} 
                        sx={{ borderRadius: 1, fontWeight: 800, textTransform: 'none', px: 3, bgcolor: 'background.paper' }}
                    >
                        Delete
                    </Button>
                </Stack>
            </Box>

            <Grid container spacing={4}>
                {/* Main Content Area */}
                <Grid item xs={12} lg={8}>
                    
                    {/* Hero Display Image */}
                    <Card elevation={0} sx={{ borderRadius: 6, mb: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                        {displayImage ? (
                            <Box component="img"
                                src={`/storage/${displayImage.file_path}`}
                                alt={project.project_name}
                                sx={{ width: '100%', height: 450, objectFit: 'cover', display: 'block' }}
                            />
                        ) : (
                            <Box sx={{ height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover', gap: 2 }}>
                                <ConstructionIcon sx={{ fontSize: 80, color: 'text.disabled' }} />
                                <Typography variant="h6" color="text.disabled" sx={{ fontWeight: 700 }}>No Visual Media Available</Typography>
                            </Box>
                        )}
                    </Card>

                    {/* Detailed Information Tabs */}
                    <Card elevation={0} sx={{ borderRadius: 6, border: '1px solid', borderColor: 'divider', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                        <Tabs 
                            value={tab} 
                            onChange={(_, v) => setTab(v)} 
                            variant="scrollable" 
                            scrollButtons="auto" 
                            sx={{ 
                                px: 2, 
                                borderBottom: '1px solid', 
                                borderColor: 'divider',
                                bgcolor: 'background.paper',
                                '& .MuiTab-root': { minHeight: 64, fontWeight: 800, textTransform: 'none', fontSize: '0.9rem' }
                            }}
                        >
                            <Tab label="Detailed Overview" icon={<InfoIcon />} iconPosition="start" />
                            <Tab label={`Media Gallery (${project.images?.length ?? 0})`} icon={<ImageIcon />} iconPosition="start" />
                            <Tab label={`Technical Docs (${project.documents?.length ?? 0})`} icon={<DocIcon />} iconPosition="start" />
                            <Tab label={`Stakeholders (${project.owners?.length ?? 0})`} icon={<PeopleIcon />} iconPosition="start" />
                            <Tab label={`Progress Log (${project.progress?.length ?? 0})`} icon={<TimelineIcon />} iconPosition="start" />
                            <Tab label={`Video Tours (${project.videos?.length ?? 0})`} icon={<VideoIcon />} iconPosition="start" />
                        </Tabs>
                        
                        <CardContent sx={{ p: { xs: 3, md: 6 } }}>

                            {/* Tab 0: Overview */}
                            <TabPanel value={tab} index={0}>
                                <Box sx={{ mb: 5 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <DescriptionIcon color="primary" /> Project Description
                                    </Typography>
                                    <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', whiteSpace: 'pre-line' }}>
                                        {project.description}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 5 }} />

                                <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>Specifications & Attributes</Typography>
                                <Grid container spacing={4}>
                                    {[
                                        { label: 'Primary Location', value: project.project_location, icon: <LocationIcon fontSize="small" /> },
                                        { label: 'Project Category', value: project.project_type?.name || project.projectType?.name, icon: <CategoryIcon fontSize="small" /> },
                                        { label: 'Start Date', value: project.project_start_date ? new Date(project.project_start_date).toLocaleDateString() : '—', icon: <EventIcon fontSize="small" /> },
                                        { label: 'Completion', value: project.project_completion_date ? new Date(project.project_completion_date).toLocaleDateString() : '—', icon: <CheckCircleIcon fontSize="small" /> },
                                        { label: 'Room Count', value: project.number_of_rooms || '—', icon: <ImageIcon fontSize="small" /> },
                                        { label: 'Floors', value: project.number_of_floors || '—', icon: <ConstructionIcon fontSize="small" /> },
                                        { label: 'Built Area', value: project.total_area ? `${project.total_area} ${project.area_unit}` : '—', icon: <AreaIcon fontSize="small" /> },
                                        { label: 'Carpet Area', value: project.carpet_area ? `${project.carpet_area} ${project.area_unit}` : '—', icon: <AreaIcon fontSize="small" /> },
                                        { label: 'Service Level', value: project.service_package?.title || 'Standard', icon: <StarIcon fontSize="small" /> },
                                    ].map((item, i) => (
                                        <Grid item xs={12} sm={6} md={4} key={i}>
                                            <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: 'action.hover', border: '1px solid transparent', transition: 'all 0.2s', '&:hover': { borderColor: 'primary.light', bgcolor: 'primary.50' } }}>
                                                <Stack direction="row" spacing={1.5} alignItems="center">
                                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', color: 'white' }}>
                                                        {item.icon}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>{item.label}</Typography>
                                                        <Typography variant="body2" sx={{ fontWeight: 800 }}>{item.value}</Typography>
                                                    </Box>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>

                                {/* Amenities Section */}
                                {project.amenities?.length > 0 && (
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>Featured Amenities</Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                            {project.amenities.map(a => (
                                                <Chip 
                                                    key={a.id} 
                                                    label={a.name} 
                                                    icon={<CheckCircleIcon sx={{ fontSize: '1rem !important' }} />} 
                                                    sx={{ borderRadius: 2, fontWeight: 800, py: 2.5, px: 1, bgcolor: 'primary.50', color: 'primary.main', border: '1px solid', borderColor: 'primary.100' }} 
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                            </TabPanel>

                            {/* Tab 1: Images Gallery */}
                            <TabPanel value={tab} index={1}>
                                {project.images?.length === 0 ? (
                                    <Box sx={{ textAlign: 'center', py: 8 }}>
                                        <ImageIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                                        <Typography color="text.secondary" sx={{ fontWeight: 700 }}>No project images found.</Typography>
                                    </Box>
                                ) : (
                                    <Grid container spacing={3}>
                                        {project.images.map(img => (
                                            <Grid item xs={12} sm={6} md={4} key={img.id}>
                                                <Paper elevation={0} variant="outlined" sx={{ 
                                                    borderRadius: 4, 
                                                    overflow: 'hidden', 
                                                    position: 'relative',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }
                                                }}>
                                                    <Box component="img" src={`/storage/${img.file_path}`} sx={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
                                                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Box>
                                                            <Typography variant="caption" sx={{ fontWeight: 900, color: 'primary.main', display: 'block' }}>
                                                                {img.image_type?.name || 'GENERIC VISUAL'}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>{img.alt_text || project.project_name}</Typography>
                                                        </Box>
                                                        {img.is_primary && (
                                                            <Tooltip title="Cover Image">
                                                                <StarIcon color="warning" />
                                                            </Tooltip>
                                                        )}
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                            </TabPanel>

                            {/* Tab 2: Documents Repo */}
                            <TabPanel value={tab} index={2}>
                                {project.documents?.length === 0 ? (
                                    <Box sx={{ textAlign: 'center', py: 8 }}>
                                        <DocIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                                        <Typography color="text.secondary" sx={{ fontWeight: 700 }}>No documents have been uploaded.</Typography>
                                    </Box>
                                ) : (
                                    <Stack spacing={2.5}>
                                        {project.documents.map(doc => (
                                            <Paper key={doc.id} elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'background.default' }}>
                                                <Stack direction="row" spacing={2.5} alignItems="center">
                                                    <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main', borderRadius: 3, width: 56, height: 56 }}>
                                                        <DocIcon sx={{ fontSize: 32 }} />
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>{doc.document_name}</Typography>
                                                        <Chip label={doc.document_type.toUpperCase()} size="small" sx={{ borderRadius: 1, mt: 0.5, height: 20, fontSize: '0.65rem', fontWeight: 900 }} />
                                                    </Box>
                                                </Stack>
                                                <Button 
                                                    variant="contained" 
                                                    size="small" 
                                                    startIcon={<OpenInNewIcon />} 
                                                    href={`/storage/${doc.file_path}`} 
                                                    target="_blank" 
                                                    sx={{ borderRadius: 2, fontWeight: 800, textTransform: 'none' }}
                                                >
                                                    View / Download
                                                </Button>
                                            </Paper>
                                        ))}
                                    </Stack>
                                )}
                            </TabPanel>

                            {/* Tab 3: Stakeholders */}
                            <TabPanel value={tab} index={3}>
                                {project.owners?.length === 0 ? (
                                    <Box sx={{ textAlign: 'center', py: 8 }}>
                                        <PeopleIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                                        <Typography color="text.secondary" sx={{ fontWeight: 700 }}>No contact persons assigned.</Typography>
                                    </Box>
                                ) : (
                                    <Grid container spacing={3}>
                                        {project.owners.map(owner => (
                                            <Grid item xs={12} sm={6} key={owner.id}>
                                                <Paper elevation={0} variant="outlined" sx={{ p: 4, borderRadius: 5, borderLeft: '6px solid', borderLeftColor: 'primary.main', bgcolor: 'background.paper' }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, color: 'text.primary' }}>{owner.name}</Typography>
                                                    <Stack spacing={1.5}>
                                                        {owner.phone && (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                                <Avatar sx={{ width: 24, height: 24, bgcolor: 'success.50', color: 'success.main' }}><PeopleIcon sx={{ fontSize: 14 }} /></Avatar>
                                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{owner.phone}</Typography>
                                                            </Box>
                                                        )}
                                                        {owner.email && (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                                <Avatar sx={{ width: 24, height: 24, bgcolor: 'info.50', color: 'info.main' }}><VideoIcon sx={{ fontSize: 14 }} /></Avatar>
                                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{owner.email}</Typography>
                                                            </Box>
                                                        )}
                                                        {owner.address && (
                                                            <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
                                                                <LocationIcon color="action" fontSize="small" />
                                                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{owner.address}</Typography>
                                                            </Box>
                                                        )}
                                                    </Stack>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                            </TabPanel>

                            {/* Tab 4: Progress Tracker */}
                            <TabPanel value={tab} index={4}>
                                {project.progress?.length === 0 ? (
                                    <Box sx={{ textAlign: 'center', py: 8 }}>
                                        <TimelineIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                                        <Typography color="text.secondary" sx={{ fontWeight: 700 }}>Project timeline is currently empty.</Typography>
                                    </Box>
                                ) : (
                                    <Stack spacing={3}>
                                        {project.progress.map(prog => (
                                            <Paper key={prog.id} elevation={0} sx={{ p: 4, borderRadius: 5, border: '1px solid', borderColor: 'divider', borderLeft: '8px solid', borderLeftColor: prog.status === 'completed' ? 'success.main' : 'warning.main', bgcolor: 'background.paper' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                    <Box>
                                                        <Typography variant="h6" sx={{ fontWeight: 900 }}>{prog.title}</Typography>
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                                            <EventIcon sx={{ fontSize: 14 }} /> LOGGED ON: {new Date(prog.progress_date).toLocaleDateString()}
                                                        </Typography>
                                                    </Box>
                                                    <Chip label={prog.status?.toUpperCase() || 'UPDATE'} size="small" color={prog.status === 'completed' ? 'success' : 'warning'} sx={{ fontWeight: 900, borderRadius: 1.5 }} />
                                                </Box>
                                                {prog.description && (
                                                    <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'text.secondary', fontWeight: 500, p: 2, bgcolor: 'action.hover', borderRadius: 3 }}>
                                                        {prog.description}
                                                    </Typography>
                                                )}
                                            </Paper>
                                        ))}
                                    </Stack>
                                )}
                            </TabPanel>

                            {/* Tab 5: Videos */}
                            <TabPanel value={tab} index={5}>
                                {project.videos?.length === 0 ? (
                                    <Box sx={{ textAlign: 'center', py: 8 }}>
                                        <VideoIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                                        <Typography color="text.secondary" sx={{ fontWeight: 700 }}>No video tours linked yet.</Typography>
                                    </Box>
                                ) : (
                                    <Stack spacing={3}>
                                        {project.videos.map(vid => (
                                            <Paper key={vid.id} elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'background.default' }}>
                                                <Stack direction="row" spacing={3} alignItems="center">
                                                    <Avatar sx={{ bgcolor: 'error.50', color: 'error.main', borderRadius: 4, width: 64, height: 64 }}>
                                                        <VideoIcon sx={{ fontSize: 32 }} />
                                                    </Avatar>
                                                    <Box sx={{ minWidth: 0 }}>
                                                        <Typography variant="h6" sx={{ fontWeight: 900 }} noWrap>{vid.title || 'Untitled Walkthrough'}</Typography>
                                                        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                                                            <Chip label={vid.platform.toUpperCase()} size="small" sx={{ fontWeight: 900, height: 18, fontSize: '0.6rem' }} />
                                                            <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 200 }}>{vid.video_url}</Typography>
                                                        </Stack>
                                                    </Box>
                                                </Stack>
                                                <Button 
                                                    variant="outlined" 
                                                    startIcon={<OpenInNewIcon />} 
                                                    href={vid.video_url} 
                                                    target="_blank" 
                                                    sx={{ borderRadius: 3, fontWeight: 800, textTransform: 'none', border: '2px solid' }}
                                                >
                                                    Launch Tour
                                                </Button>
                                            </Paper>
                                        ))}
                                    </Stack>
                                )}
                            </TabPanel>

                        </CardContent>
                    </Card>
                </Grid>

                {/* Sidebar Quick Info Area */}
                <Grid item xs={12} lg={4}>
                    <Stack spacing={4}>
                        
                        {/* Status Summary Widget */}
                        <Card elevation={0} sx={{ borderRadius: 6, border: '1px solid', borderColor: 'divider', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 900, mb: 3, color: 'text.primary' }}>Operations Radar</Typography>
                                <Stack spacing={2.5}>
                                    {[
                                        { label: 'Current Phase', value: project.status, color: st.color, bg: st.bg, type: 'status' },
                                        { label: 'Website Status', value: project.is_active ? 'Live' : 'Draft', type: 'flag', active: project.is_active, color: 'success' },
                                        { label: 'Market Spotlight', value: project.is_featured ? 'Featured' : 'Standard', type: 'flag', active: project.is_featured, color: 'warning' },
                                        { label: 'Site Activity', value: project.is_working ? 'Active' : 'Idle', type: 'flag', active: project.is_working, color: 'info' },
                                        { label: 'Delivery State', value: project.is_completed ? 'Handed Over' : 'Pending', type: 'flag', active: project.is_completed, color: 'success' },
                                    ].map((row, idx) => (
                                        <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>{row.label}</Typography>
                                            {row.type === 'status' ? (
                                                <Chip label={row.value.toUpperCase()} size="small" sx={{ fontWeight: 900, color: row.color, bgcolor: row.bg, borderRadius: 1.5 }} />
                                            ) : (
                                                <Chip 
                                                    label={row.value.toUpperCase()} 
                                                    size="small" 
                                                    color={row.active ? row.color : 'default'} 
                                                    variant={row.active ? 'filled' : 'outlined'} 
                                                    sx={{ fontWeight: 900, borderRadius: 1.5, fontSize: '0.65rem' }} 
                                                />
                                            )}
                                        </Box>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Location Intelligence Widget */}
                        {(project.latitude && project.longitude) && (
                            <Card elevation={0} sx={{ borderRadius: 6, border: '1px solid', borderColor: 'divider', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, color: 'text.primary' }}>Geo Positioning</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontWeight: 500, lineHeight: 1.6 }}>{project.address}</Typography>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        startIcon={<LocationIcon />}
                                        href={`https://maps.google.com/?q=${project.latitude},${project.longitude}`}
                                        target="_blank"
                                        sx={{ borderRadius: 3, fontWeight: 800, textTransform: 'none', py: 1.5, boxShadow: '0 8px 16px -4px rgba(99,102,241,0.3)' }}
                                    >
                                        Open Location Intelligence
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Metadata Tracker Widget */}
                        <Card elevation={0} sx={{ borderRadius: 6, border: '1px solid', borderColor: 'divider', bgcolor: 'action.hover' }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: 1, display: 'block', mb: 2 }}>System Audit Logs</Typography>
                                <Stack spacing={1.5}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Avatar sx={{ width: 20, height: 24, bgcolor: 'transparent', color: 'text.disabled' }}><EventIcon sx={{ fontSize: 16 }} /></Avatar>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                            Record Created: {new Date(project.created_at).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Avatar sx={{ width: 24, height: 24, bgcolor: 'transparent', color: 'text.disabled' }}><EditIcon sx={{ fontSize: 16 }} /></Avatar>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                            Last Modification: {new Date(project.updated_at).toLocaleString()}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </AdminLayout>
    );
}
