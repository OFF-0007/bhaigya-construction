import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Box, Typography, Button, Card, CardContent, Grid, Chip, Divider,
    Avatar, Stack, Tab, Tabs, Paper, IconButton, Tooltip,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    Select, MenuItem, FormControl, InputLabel
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
    Straighten as AreaIcon,
    Add as AddIcon,
    MeetingRoom as RoomIcon,
    Close as CloseIcon,
    AddPhotoAlternate as AddPhotoIcon,
    DeleteForever as DeleteForeverIcon,
    PlaylistAdd as PlaylistAddIcon,
    Layers as LayersIcon
} from '@mui/icons-material';

function TabPanel({ children, value, index }) {
    return value === index ? <Box sx={{ pt: 4 }}>{children}</Box> : null;
}

const statusColors = {
    ongoing:   { color: '#f59e0b', bg: '#fef3c7' },
    completed: { color: '#10b981', bg: '#d1fae5' },
    upcoming:  { color: '#6366f1', bg: '#ede9fe' },
};

export default function Show({ project, roomTypes }) {
    const [tab, setTab] = useState(0);
    const [openRoomModal, setOpenRoomModal] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const st = statusColors[project.status] ?? statusColors.upcoming;

    // Form for Adding Multiple Rooms
    const addRoomForm = useForm({
        rooms: [
            {
                room_type_id: '',
                description: '',
                details: { size: '' },
                images: [],
                images_data: [],
            }
        ]
    });

    // Form for Editing a Single Room
    const editRoomForm = useForm({
        _method: 'PATCH',
        room_type_id: '',
        description: '',
        details: { size: '' },
        images: [],
        images_data: [],
        deleted_image_ids: [],
    });

    const displayImage = project.images?.find(i => i.is_primary) || project.images?.[0];

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this project? This action can be undone if soft deleted.')) {
            router.delete(route('admin.projects.destroy', project.id));
        }
    };

    const handleToggleActive = () => {
        router.patch(route('admin.projects.toggle-active', project.id), {}, { preserveScroll: true });
    };

    const handleOpenAddRoom = () => {
        setEditingRoom(null);
        addRoomForm.reset();
        setOpenRoomModal(true);
    };

    const handleOpenEditRoom = (room) => {
        setEditingRoom(room);
        editRoomForm.setData({
            _method: 'PATCH',
            room_type_id: room.room_type_id,
            description: room.description || '',
            details: { size: room.details?.size || '' },
            images: [],
            images_data: (room.images || []).map(img => ({
                id: img.id,
                image_name: img.image_name || '',
                image_details: img.image_details || [{ label: '', value: '' }]
            })),
            deleted_image_ids: [],
        });
        setOpenRoomModal(true);
    };

    const handleAddRoomEntry = () => {
        addRoomForm.setData('rooms', [
            ...addRoomForm.data.rooms,
            {
                room_type_id: '',
                description: '',
                details: { size: '' },
                images: [],
                images_data: [],
            }
        ]);
    };

    const handleRemoveRoomEntry = (index) => {
        const newRooms = [...addRoomForm.data.rooms];
        newRooms.splice(index, 1);
        addRoomForm.setData('rooms', newRooms);
    };

    const handleAddRoomSubmit = (e) => {
        e.preventDefault();
        addRoomForm.post(route('admin.projects.rooms.store', project.id), {
            onSuccess: () => {
                setOpenRoomModal(false);
                addRoomForm.reset();
            },
        });
    };

    const handleEditRoomSubmit = (e) => {
        e.preventDefault();
        
        // Build FormData manually for update to handle nested arrays/objects with files
        const fd = new FormData();
        fd.append('_method', 'PATCH');
        fd.append('room_type_id', editRoomForm.data.room_type_id);
        fd.append('description', editRoomForm.data.description);
        fd.append('details', JSON.stringify(editRoomForm.data.details));
        fd.append('deleted_image_ids', JSON.stringify(editRoomForm.data.deleted_image_ids));
        
        // Meta for existing images
        fd.append('existing_images_data', JSON.stringify(editRoomForm.data.images_data));
        
        // New files and their meta
        editRoomForm.data.images.forEach((file, index) => {
            fd.append('images[]', file);
        });
        fd.append('new_images_meta', JSON.stringify(editRoomForm.data.new_images_meta || []));

        router.post(route('admin.project-rooms.update', editingRoom.id), fd, {
            forceFormData: true,
            onSuccess: () => {
                setOpenRoomModal(false);
                editRoomForm.reset();
            },
        });
    };

    const handleEditRoomFileChange = (e) => {
        const files = Array.from(e.target.files);
        const currentNewImages = editRoomForm.data.images || [];
        const currentNewMeta = editRoomForm.data.new_images_meta || [];
        
        const newFiles = [...currentNewImages, ...files];
        const newMeta = [
            ...currentNewMeta,
            ...files.map((_, i) => ({
                image_name: '',
                alt_text: '',
                image_details: [{ label: '', value: '' }],
                is_primary: false,
                sort_order: currentNewImages.length + i
            }))
        ];

        editRoomForm.setData(prev => ({
            ...prev,
            images: newFiles,
            new_images_meta: newMeta
        }));
    };

    const handleRemoveExistingRoomImage = (imgId) => {
        const currentDeleted = editRoomForm.data.deleted_image_ids || [];
        if (!currentDeleted.includes(imgId)) {
            editRoomForm.setData('deleted_image_ids', [...currentDeleted, imgId]);
        }
    };

    const handleRestoreExistingRoomImage = (imgId) => {
        const currentDeleted = editRoomForm.data.deleted_image_ids || [];
        editRoomForm.setData('deleted_image_ids', currentDeleted.filter(id => id !== imgId));
    };

    const handleDeleteRoom = (room) => {
        if (confirm('Are you sure you want to delete this room?')) {
            router.delete(route('admin.project-rooms.destroy', room.id));
        }
    };

    const handleAddRoomFileChange = (roomIndex, e) => {
        const files = Array.from(e.target.files);
        const newRooms = [...addRoomForm.data.rooms];
        const room = newRooms[roomIndex];
        
        const newFiles = [...room.images, ...files];
        const newImagesData = [
            ...room.images_data,
            ...files.map((_, i) => ({
                image_name: '',
                alt_text: '',
                image_details: [{ label: '', value: '' }],
                is_primary: false,
                sort_order: room.images.length + i
            }))
        ];

        room.images = newFiles;
        room.images_data = newImagesData;
        addRoomForm.setData('rooms', newRooms);
    };

    const handleAddImageField = (roomIdx, imgIdx) => {
        const newRooms = [...addRoomForm.data.rooms];
        newRooms[roomIdx].images_data[imgIdx].image_details.push({ label: '', value: '' });
        addRoomForm.setData('rooms', newRooms);
    };

    const handleRemoveImageField = (roomIdx, imgIdx, fieldIdx) => {
        const newRooms = [...addRoomForm.data.rooms];
        newRooms[roomIdx].images_data[imgIdx].image_details.splice(fieldIdx, 1);
        addRoomForm.setData('rooms', newRooms);
    };

    return (
        <AdminLayout>
            <Head title={`Project: ${project.project_name}`} />

            {/* Top Navigation & Actions */}
            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                    <Tooltip title="Back to List">
                        <IconButton component={Link} href={route('admin.projects.index')} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper' }}>
                            <BackIcon />
                        </IconButton>
                    </Tooltip>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-1.5px', color: 'text.primary' }}>{project.project_name}</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Chip label={project.status.toUpperCase()} size="small" sx={{ fontWeight: 900, bgcolor: st.bg, color: st.color, height: 20, fontSize: '0.65rem', borderRadius: 1 }} />
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>/{project.slug}</Typography>
                        </Stack>
                    </Box>
                </Box>
                
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" startIcon={project.is_active ? <VisibilityOffIcon /> : <VisibilityIcon />} onClick={handleToggleActive} color={project.is_active ? 'warning' : 'success'} sx={{ borderRadius: 1, fontWeight: 800 }}>
                        {project.is_active ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button variant="outlined" startIcon={<EditIcon />} component={Link} href={route('admin.projects.edit', project.id)} sx={{ borderRadius: 1, fontWeight: 800 }}>Edit Details</Button>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete} sx={{ borderRadius: 1, fontWeight: 800 }}>Delete</Button>
                </Stack>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                    <Card elevation={0} sx={{ borderRadius: 1, mb: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                        {displayImage ? (
                            <Box component="img" src={`/storage/${displayImage.file_path}`} sx={{ width: '100%', height: 450, objectFit: 'cover' }} />
                        ) : (
                            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover' }}><ConstructionIcon sx={{ fontSize: 80, color: 'text.disabled' }} /></Box>
                        )}
                    </Card>

                    <Card elevation={0} sx={{ borderRadius: 1, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto" sx={{ px: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                            <Tab label="Detailed Overview" icon={<InfoIcon />} iconPosition="start" />
                            <Tab label={`Project Rooms (${project.rooms?.length ?? 0})`} icon={<RoomIcon />} iconPosition="start" />
                            <Tab label={`Media Gallery (${project.images?.length ?? 0})`} icon={<ImageIcon />} iconPosition="start" />
                            <Tab label={`Technical Docs (${project.documents?.length ?? 0})`} icon={<DocIcon />} iconPosition="start" />
                            <Tab label={`Stakeholders (${project.owners?.length ?? 0})`} icon={<PeopleIcon />} iconPosition="start" />
                            <Tab label={`Progress Log (${project.progress?.length ?? 0})`} icon={<TimelineIcon />} iconPosition="start" />
                            <Tab label={`Video Tours (${project.videos?.length ?? 0})`} icon={<VideoIcon />} iconPosition="start" />
                        </Tabs>
                        
                        <CardContent sx={{ p: { xs: 3, md: 6 } }}>
                            <TabPanel value={tab} index={0}>
                                <Box sx={{ mb: 5 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}><DescriptionIcon color="primary" sx={{ mr: 1, verticalAlign: 'middle' }} /> Project Description</Typography>
                                    <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', whiteSpace: 'pre-line' }}>{project.description}</Typography>
                                </Box>
                                <Divider sx={{ my: 5 }} />
                                <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>Specifications & Attributes</Typography>
                                <Grid container spacing={4}>
                                    {[
                                        { label: 'Primary Location', value: project.project_location, icon: <LocationIcon fontSize="small" /> },
                                        { label: 'Project Category', value: project.project_type?.name, icon: <CategoryIcon fontSize="small" /> },
                                        { label: 'Start Date', value: project.project_start_date ? new Date(project.project_start_date).toLocaleDateString() : '—', icon: <EventIcon fontSize="small" /> },
                                        { label: 'Completion', value: project.project_completion_date ? new Date(project.project_completion_date).toLocaleDateString() : '—', icon: <CheckCircleIcon fontSize="small" /> },
                                        { label: 'Room Count', value: project.number_of_rooms || '—', icon: <ImageIcon fontSize="small" /> },
                                        { label: 'Floors', value: project.number_of_floors || '—', icon: <ConstructionIcon fontSize="small" /> },
                                        { label: 'Built Area', value: project.total_area ? `${project.total_area} ${project.area_unit}` : '—', icon: <AreaIcon fontSize="small" /> },
                                        { label: 'Carpet Area', value: project.carpet_area ? `${project.carpet_area} ${project.area_unit}` : '—', icon: <AreaIcon fontSize="small" /> },
                                        { label: 'Service Level', value: project.service_package?.title || 'Standard', icon: <StarIcon fontSize="small" /> },
                                    ].map((item, i) => (
                                        <Grid item xs={12} sm={6} md={4} key={i}>
                                            <Paper elevation={0} sx={{ p: 2, borderRadius: 1, bgcolor: 'action.hover', border: '1px solid transparent' }}>
                                                <Stack direction="row" spacing={1.5} alignItems="center">
                                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>{item.icon}</Avatar>
                                                    <Box><Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>{item.label}</Typography><Typography variant="body2" sx={{ fontWeight: 800 }}>{item.value}</Typography></Box>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </TabPanel>

                            <TabPanel value={tab} index={1}>
                                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>Detailed Room Layouts</Typography>
                                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddRoom} sx={{ borderRadius: 1, fontWeight: 800 }}>Add Rooms</Button>
                                </Box>
                                {project.rooms?.length === 0 ? (
                                    <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'action.hover', borderRadius: 1 }}><RoomIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} /><Typography color="text.secondary" sx={{ fontWeight: 700 }}>No rooms added yet.</Typography></Box>
                                ) : (
                                    <Stack spacing={4}>
                                        {project.rooms.map(room => (
                                            <Card key={room.id} variant="outlined" sx={{ borderRadius: 1 }}>
                                                <Grid container>
                                                    <Grid item xs={12} md={4}>
                                                        <Box sx={{ position: 'relative', height: '100%', minHeight: 200 }}>
                                                            <Box component="img" src={room.images?.[0] ? `/storage/${room.images[0].file_path}` : '/placeholder-room.jpg'} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            <Box sx={{ position: 'absolute', top: 12, left: 12 }}><Chip label={room.room_type?.room_type_name} sx={{ fontWeight: 900, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: 1 }} /></Box>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} md={8}>
                                                        <CardContent sx={{ p: 3 }}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                                                <Typography variant="h6" sx={{ fontWeight: 900 }}>{room.room_type?.room_type_name}</Typography>
                                                                <Stack direction="row" spacing={1}>
                                                                    <IconButton size="small" onClick={() => handleOpenEditRoom(room)} color="primary"><EditIcon fontSize="small" /></IconButton>
                                                                    <IconButton size="small" onClick={() => handleDeleteRoom(room)} color="error"><DeleteIcon fontSize="small" /></IconButton>
                                                                </Stack>
                                                            </Box>
                                                            {room.description && <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{room.description}</Typography>}
                                                            <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
                                                                {room.images?.map(img => (
                                                                    <Tooltip key={img.id} title={img.image_name || 'Room Visual'}>
                                                                        <Box component="img" src={`/storage/${img.file_path}`} sx={{ width: 60, height: 60, borderRadius: 1, objectFit: 'cover', border: '1px solid', borderColor: 'divider' }} />
                                                                    </Tooltip>
                                                                ))}
                                                            </Box>
                                                        </CardContent>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        ))}
                                    </Stack>
                                )}
                            </TabPanel>

                            <TabPanel value={tab} index={2}>
                                {project.images?.length === 0 ? (
                                    <Box sx={{ textAlign: 'center', py: 8 }}><ImageIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} /><Typography color="text.secondary" sx={{ fontWeight: 700 }}>No project images found.</Typography></Box>
                                ) : (
                                    <Grid container spacing={3}>
                                        {project.images.map(img => (
                                            <Grid item xs={12} sm={6} md={4} key={img.id}>
                                                <Paper variant="outlined" sx={{ borderRadius: 1, overflow: 'hidden' }}>
                                                    <Box component="img" src={`/storage/${img.file_path}`} sx={{ width: '100%', height: 200, objectFit: 'cover' }} />
                                                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography variant="caption" sx={{ fontWeight: 900 }}>{img.image_type?.name || 'GENERIC'}</Typography>
                                                        {img.is_primary && <StarIcon color="warning" fontSize="small" />}
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                            </TabPanel>

                            <TabPanel value={tab} index={3}>
                                {project.documents?.map(doc => (
                                    <Paper key={doc.id} variant="outlined" sx={{ p: 2, borderRadius: 1, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography sx={{ fontWeight: 800 }}>{doc.document_name}</Typography>
                                        <Button size="small" href={`/storage/${doc.file_path}`} target="_blank">View</Button>
                                    </Paper>
                                ))}
                            </TabPanel>

                            <TabPanel value={tab} index={4}>
                                {project.owners?.map(owner => (
                                    <Paper key={owner.id} variant="outlined" sx={{ p: 3, borderRadius: 1, mb: 2 }}>
                                        <Typography sx={{ fontWeight: 900 }}>{owner.name}</Typography>
                                        <Typography variant="body2">{owner.phone}</Typography>
                                    </Paper>
                                ))}
                            </TabPanel>

                            <TabPanel value={tab} index={5}>
                                {project.progress?.map(prog => (
                                    <Paper key={prog.id} variant="outlined" sx={{ p: 3, borderRadius: 1, mb: 2, borderLeft: '6px solid orange' }}>
                                        <Typography sx={{ fontWeight: 900 }}>{prog.title}</Typography>
                                        <Typography variant="body2">{prog.description}</Typography>
                                    </Paper>
                                ))}
                            </TabPanel>

                            <TabPanel value={tab} index={6}>
                                {project.videos?.map(vid => (
                                    <Paper key={vid.id} variant="outlined" sx={{ p: 2, borderRadius: 1, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography sx={{ fontWeight: 800 }}>{vid.title}</Typography>
                                        <Button size="small" href={vid.video_url} target="_blank">Launch</Button>
                                    </Paper>
                                ))}
                            </TabPanel>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Stack spacing={4}>
                        <Card variant="outlined" sx={{ borderRadius: 1 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>Operations Radar</Typography>
                                <Stack spacing={2}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2">Status</Typography><Chip label={project.status.toUpperCase()} size="small" sx={{ borderRadius: 1 }} /></Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2">Live</Typography><Chip label={project.is_active ? 'YES' : 'NO'} size="small" sx={{ borderRadius: 1 }} /></Box>
                                </Stack>
                            </CardContent>
                        </Card>
                        {(project.latitude && project.longitude) && (
                            <Card variant="outlined" sx={{ borderRadius: 1 }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>Location</Typography>
                                    <Typography variant="body2" sx={{ mb: 2 }}>{project.address}</Typography>
                                    <Button variant="contained" fullWidth href={`https://maps.google.com/?q=${project.latitude},${project.longitude}`} target="_blank" sx={{ borderRadius: 1 }}>Open Map</Button>
                                </CardContent>
                            </Card>
                        )}
                    </Stack>
                </Grid>
            </Grid>

            {/* MODAL: ADD/EDIT ROOMS */}
            <Dialog open={openRoomModal} onClose={() => setOpenRoomModal(false)} maxWidth="lg" fullWidth PaperProps={{ sx: { borderRadius: 1 } }}>
                <DialogTitle sx={{ p: 3, fontWeight: 900, bgcolor: 'primary.50', color: 'primary.main', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {editingRoom ? 'Edit Room layout' : 'Add Multiple Room layouts'}
                    <IconButton onClick={() => setOpenRoomModal(false)} color="inherit"><CloseIcon /></IconButton>
                </DialogTitle>

                <form onSubmit={editingRoom ? handleEditRoomSubmit : handleAddRoomSubmit}>
                    <DialogContent dividers sx={{ p: 4, bgcolor: '#fbfbfb' }}>
                        {editingRoom ? (
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Select Room Type</InputLabel>
                                        <Select value={editRoomForm.data.room_type_id} label="Select Room Type" onChange={e => editRoomForm.setData('room_type_id', e.target.value)}>
                                            <MenuItem value="" disabled>-- Please Select Room Type --</MenuItem>
                                            {roomTypes?.map(type => <MenuItem key={type.id} value={type.id}>{type.room_type_name}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}><TextField fullWidth label="Room Size" value={editRoomForm.data.details.size} onChange={e => editRoomForm.setData('details', { ...editRoomForm.data.details, size: e.target.value })} /></Grid>
                                <Grid item xs={12}><TextField fullWidth multiline rows={2} label="Description" value={editRoomForm.data.description} onChange={e => editRoomForm.setData('description', e.target.value)} /></Grid>
                                
                                {/* Existing Images Management */}
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 900, mt: 2, mb: 2 }}>Manage Existing Images</Typography>
                                    <Stack spacing={2}>
                                        {editRoomForm.data.images_data?.map((img, iIdx) => {
                                            const isDeleted = editRoomForm.data.deleted_image_ids.includes(img.id);
                                            const originalImg = editingRoom.images.find(i => i.id === img.id);
                                            return (
                                                <Paper key={img.id} variant="outlined" sx={{ p: 2, borderRadius: 0.5, bgcolor: isDeleted ? 'error.50' : '#fafafa', opacity: isDeleted ? 0.6 : 1 }}>
                                                    <Grid container spacing={3} alignItems="center">
                                                        <Grid item xs={12} sm={2}>
                                                            <Box component="img" src={`/storage/${originalImg?.file_path}`} sx={{ width: '100%', height: 100, borderRadius: 0.5, objectFit: 'cover' }} />
                                                        </Grid>
                                                        <Grid item xs={12} sm={8}>
                                                            <TextField fullWidth size="small" label="Image Title" value={img.image_name} disabled={isDeleted} onChange={e => {
                                                                const newData = [...editRoomForm.data.images_data]; newData[iIdx].image_name = e.target.value; editRoomForm.setData('images_data', newData);
                                                            }} sx={{ mb: 2 }} />
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                                <Typography variant="caption" sx={{ fontWeight: 900 }}>Specifications</Typography>
                                                                <Button size="small" disabled={isDeleted} onClick={() => {
                                                                    const newData = [...editRoomForm.data.images_data]; newData[iIdx].image_details.push({ label: '', value: '' }); editRoomForm.setData('images_data', newData);
                                                                }}>Add Field</Button>
                                                            </Box>
                                                            <Grid container spacing={1}>
                                                                {img.image_details?.map((detail, dIdx) => (
                                                                    <Grid item xs={12} key={dIdx}>
                                                                        <Stack direction="row" spacing={1}>
                                                                            <TextField fullWidth size="small" placeholder="Field" disabled={isDeleted} value={detail.label} onChange={e => {
                                                                                const newData = [...editRoomForm.data.images_data]; newData[iIdx].image_details[dIdx].label = e.target.value; editRoomForm.setData('images_data', newData);
                                                                            }} />
                                                                            <TextField fullWidth size="small" placeholder="Value" disabled={isDeleted} value={detail.value} onChange={e => {
                                                                                const newData = [...editRoomForm.data.images_data]; newData[iIdx].image_details[dIdx].value = e.target.value; editRoomForm.setData('images_data', newData);
                                                                            }} />
                                                                            <IconButton size="small" disabled={isDeleted || img.image_details.length === 1} onClick={() => {
                                                                                const newData = [...editRoomForm.data.images_data]; newData[iIdx].image_details.splice(dIdx, 1); editRoomForm.setData('images_data', newData);
                                                                            }}><DeleteIcon fontSize="small" /></IconButton>
                                                                        </Stack>
                                                                    </Grid>
                                                                ))}
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} sm={2} sx={{ textAlign: 'right' }}>
                                                            {isDeleted ? (
                                                                <Button size="small" variant="outlined" color="success" onClick={() => handleRestoreExistingRoomImage(img.id)}>Restore</Button>
                                                            ) : (
                                                                <Button size="small" variant="outlined" color="error" onClick={() => handleRemoveExistingRoomImage(img.id)}>Remove</Button>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            );
                                        })}
                                    </Stack>
                                </Grid>

                                {/* New Images for Update */}
                                <Grid item xs={12}>
                                    <Divider sx={{ my: 4 }}>Add New Photos</Divider>
                                    <Button variant="outlined" component="label" startIcon={<AddPhotoIcon />} fullWidth sx={{ borderStyle: 'dashed', borderRadius: 0.5, py: 1.5 }}>
                                        Select Additional Photos
                                        <input type="file" multiple hidden onChange={handleEditRoomFileChange} accept="image/*" />
                                    </Button>

                                    <Stack spacing={3} sx={{ mt: 3 }}>
                                        {editRoomForm.data.images?.map((file, iIdx) => (
                                            <Paper key={iIdx} variant="outlined" sx={{ p: 2, borderRadius: 0.5, bgcolor: '#fafafa' }}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={3}>
                                                        <Box component="img" src={URL.createObjectURL(file)} sx={{ width: '100%', height: 140, borderRadius: 0.5, objectFit: 'cover' }} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={9}>
                                                        <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                                                            <TextField fullWidth size="small" label="Image Title" value={editRoomForm.data.new_images_meta[iIdx].image_name} onChange={e => {
                                                                const nm = [...editRoomForm.data.new_images_meta]; nm[iIdx].image_name = e.target.value; editRoomForm.setData('new_images_meta', nm);
                                                            }} />
                                                            <IconButton size="small" color="error" onClick={() => {
                                                                const ni = [...editRoomForm.data.images]; const nm = [...editRoomForm.data.new_images_meta];
                                                                ni.splice(iIdx, 1); nm.splice(iIdx, 1);
                                                                editRoomForm.setData({ ...editRoomForm.data, images: ni, new_images_meta: nm });
                                                            }}><CloseIcon /></IconButton>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                                                            <Typography variant="caption" sx={{ fontWeight: 900 }}>Specifications</Typography>
                                                            <Button size="small" onClick={() => {
                                                                const nm = [...editRoomForm.data.new_images_meta]; nm[iIdx].image_details.push({ label: '', value: '' }); editRoomForm.setData('new_images_meta', nm);
                                                            }}>Add Field</Button>
                                                        </Box>
                                                        <Grid container spacing={1.5}>
                                                            {editRoomForm.data.new_images_meta[iIdx].image_details.map((detail, dIdx) => (
                                                                <Grid item xs={12} key={dIdx}>
                                                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                                                        <TextField fullWidth size="small" placeholder="Field" value={detail.label} onChange={e => {
                                                                            const nm = [...editRoomForm.data.new_images_meta]; nm[iIdx].image_details[dIdx].label = e.target.value; editRoomForm.setData('new_images_meta', nm);
                                                                        }} />
                                                                        <TextField fullWidth size="small" placeholder="Value" value={detail.value} onChange={e => {
                                                                            const nm = [...editRoomForm.data.new_images_meta]; nm[iIdx].image_details[dIdx].value = e.target.value; editRoomForm.setData('new_images_meta', nm);
                                                                        }} />
                                                                        <IconButton size="small" onClick={() => {
                                                                            const nm = [...editRoomForm.data.new_images_meta]; nm[iIdx].image_details.splice(dIdx, 1); editRoomForm.setData('new_images_meta', nm);
                                                                        }} disabled={editRoomForm.data.new_images_meta[iIdx].image_details.length === 1} color="error"><DeleteIcon fontSize="small" /></IconButton>
                                                                    </Stack>
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        ))}
                                    </Stack>
                                </Grid>
                            </Grid>
                        ) : (
                            <Stack spacing={4}>
                                {addRoomForm.data.rooms.map((room, rIdx) => (
                                    <Paper key={rIdx} elevation={0} sx={{ p: 3, borderRadius: 1, border: '1px solid', borderColor: 'divider', position: 'relative', bgcolor: 'white' }}>
                                        {addRoomForm.data.rooms.length > 1 && (
                                            <IconButton onClick={() => handleRemoveRoomEntry(rIdx)} sx={{ position: 'absolute', top: 8, right: 8, color: 'error.main' }} size="small"><DeleteForeverIcon /></IconButton>
                                        )}
                                        <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 3, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <RoomIcon fontSize="small" /> Room Entry #{rIdx + 1}
                                        </Typography>
                                        
                                        <Grid container spacing={3}>
                                            {/* STEP 1: ROOM TYPE */}
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth required>
                                                    <InputLabel>Select Room Type</InputLabel>
                                                    <Select value={room.room_type_id} label="Select Room Type" onChange={e => {
                                                        const nr = [...addRoomForm.data.rooms]; nr[rIdx].room_type_id = e.target.value; addRoomForm.setData('rooms', nr);
                                                    }}>
                                                        <MenuItem value="" disabled>-- Please Select Room Type --</MenuItem>
                                                        {roomTypes?.map(type => <MenuItem key={type.id} value={type.id}>{type.room_type_name}</MenuItem>)}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}><TextField fullWidth label="Overall Dimensions" value={room.details.size} onChange={e => {
                                                const nr = [...addRoomForm.data.rooms]; nr[rIdx].details.size = e.target.value; addRoomForm.setData('rooms', nr);
                                            }} /></Grid>
                                            <Grid item xs={12}><TextField fullWidth multiline label="Room Summary" value={room.description} onChange={e => {
                                                const nr = [...addRoomForm.data.rooms]; nr[rIdx].description = e.target.value; addRoomForm.setData('rooms', nr);
                                            }} /></Grid>
                                            
                                            {/* STEP 2: IMAGES WITH DYNAMIC FIELDS */}
                                            <Grid item xs={12}>
                                                <Divider sx={{ my: 2 }}>Visual Media & Technical Details</Divider>
                                                <Button variant="outlined" component="label" startIcon={<AddPhotoIcon />} fullWidth sx={{ borderStyle: 'dashed', borderRadius: 1, py: 1.5 }}>
                                                    Click to Select Photos for this Room
                                                    <input type="file" multiple hidden onChange={(e) => handleAddRoomFileChange(rIdx, e)} accept="image/*" />
                                                </Button>

                                                <Stack spacing={3} sx={{ mt: 3 }}>
                                                    {room.images.map((file, iIdx) => (
                                                        <Paper key={iIdx} variant="outlined" sx={{ p: 2, borderRadius: 1, bgcolor: '#fafafa', border: '1px solid', borderColor: 'divider' }}>
                                                            <Grid container spacing={3}>
                                                                <Grid item xs={12} sm={3}>
                                                                    <Box component="img" src={URL.createObjectURL(file)} sx={{ width: '100%', height: 160, borderRadius: 1, objectFit: 'cover', border: '1px solid', borderColor: 'divider' }} />
                                                                </Grid>
                                                                <Grid item xs={12} sm={9}>
                                                                    <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                                                                        <TextField fullWidth size="small" label="Image Title (e.g. Master Bedroom East View)" value={room.images_data[iIdx].image_name} onChange={e => {
                                                                            const nr = [...addRoomForm.data.rooms]; nr[rIdx].images_data[iIdx].image_name = e.target.value; addRoomForm.setData('rooms', nr);
                                                                        }} />
                                                                        <IconButton size="small" color="error" onClick={() => {
                                                                            const nr = [...addRoomForm.data.rooms]; nr[rIdx].images.splice(iIdx, 1); nr[rIdx].images_data.splice(iIdx, 1); addRoomForm.setData('rooms', nr);
                                                                        }}><CloseIcon /></IconButton>
                                                                    </Box>
                                                                    
                                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                                                                        <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>Dynamic Field Layout (Specifications)</Typography>
                                                                        <Button size="small" startIcon={<PlaylistAddIcon />} onClick={() => handleAddImageField(rIdx, iIdx)} sx={{ textTransform: 'none', fontWeight: 800 }}>Add Field Row</Button>
                                                                    </Box>

                                                                    <Grid container spacing={1.5}>
                                                                        {room.images_data[iIdx].image_details.map((detail, dIdx) => (
                                                                            <Grid item xs={12} key={dIdx}>
                                                                                <Stack direction="row" spacing={1.5} alignItems="center">
                                                                                    <TextField fullWidth size="small" placeholder="Field Name (e.g. Wall Color)" value={detail.label} onChange={e => {
                                                                                        const nr = [...addRoomForm.data.rooms]; nr[rIdx].images_data[iIdx].image_details[dIdx].label = e.target.value; addRoomForm.setData('rooms', nr);
                                                                                    }} />
                                                                                    <TextField fullWidth size="small" placeholder="Value (e.g. Royal Silk White)" value={detail.value} onChange={e => {
                                                                                        const nr = [...addRoomForm.data.rooms]; nr[rIdx].images_data[iIdx].image_details[dIdx].value = e.target.value; addRoomForm.setData('rooms', nr);
                                                                                    }} />
                                                                                    <IconButton size="small" onClick={() => handleRemoveImageField(rIdx, iIdx, dIdx)} disabled={room.images_data[iIdx].image_details.length === 1} color="error"><DeleteIcon fontSize="small" /></IconButton>
                                                                                </Stack>
                                                                            </Grid>
                                                                        ))}
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Paper>
                                                    ))}
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                ))}
                                <Button variant="dashed" startIcon={<AddIcon />} onClick={handleAddRoomEntry} sx={{ py: 1.5, border: '2px dashed', borderColor: 'divider', borderRadius: 1, fontWeight: 800 }}>Add Another Room Layout</Button>
                            </Stack>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ p: 3, bgcolor: '#fbfbfb' }}>
                        <Button onClick={() => setOpenRoomModal(false)} sx={{ fontWeight: 800 }}>Cancel</Button>
                        <Button type="submit" variant="contained" disabled={addRoomForm.processing || editRoomForm.processing} sx={{ fontWeight: 900, px: 4, borderRadius: 1 }}>Save Records</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </AdminLayout>
    );
}
