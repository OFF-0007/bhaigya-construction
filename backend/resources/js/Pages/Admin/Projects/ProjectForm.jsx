import React, { useState, useRef } from 'react';
import {
    Box, Typography, Button, TextField, MenuItem,
    FormControlLabel, Switch, Grid, Divider, Chip, IconButton, Avatar,
    Tab, Tabs, Stack, Tooltip, Alert, InputAdornment, Paper
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Upload as UploadIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    Close as CloseIcon,
    LocationOn as LocationIcon,
    Home as HomeIcon,
    Construction as ConstructionIcon,
    Description as DescriptionIcon,
    Image as ImageIcon,
    People as PeopleIcon,
    VideoLibrary as VideoIcon,
    Timeline as ProgressIcon,
    Article as DocIcon,
    Straighten as AreaIcon,
    Info as InfoIcon,
    MeetingRoom as RoomIcon,
    Layers as FloorIcon,
    Bathtub as WashroomIcon,
    CheckCircle as CheckIcon
} from '@mui/icons-material';

// ─── Tab Panel ───────────────────────────────────────────────────────────────
function TabPanel({ children, value, index }) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box sx={{ pt: 4 }}>{children}</Box>}
        </div>
    );
}

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionHeader({ icon, title, subtitle }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Avatar sx={{
                bgcolor: 'primary.main',
                width: 44,
                height: 44,
                borderRadius: 2,
                boxShadow: '0 4px 12px 0 rgba(99, 102, 241, 0.2)',
            }}>
                {React.cloneElement(icon, { sx: { fontSize: 22 } })}
            </Avatar>
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px' }}>
                    {title}
                </Typography>
                {subtitle && <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{subtitle}</Typography>}
            </Box>
        </Box>
    );
}

// ─── Styled Form Label ───────────────────────────────────────────────────────
const FormLabel = ({ children, required }) => (
    <Typography variant="caption" sx={{
        fontWeight: 700,
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        color: 'text.secondary',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    }}>
        {children}
        {required && <Box component="span" sx={{ color: 'error.main', fontSize: '1.2rem', lineHeight: 0 }}>*</Box>}
    </Typography>
);

export default function ProjectForm({
    data, setData, errors, processing,
    projectTypes = [], districts = [], amenities = [], imageTypes = [], serviceCategories = [], servicePackages = [],
    onSubmit, isEdit = false,
    initialTab = 0,
    existingImages = [], existingDocuments = [], existingOwners = [],
    existingProgress = [], existingVideos = [],
}) {
    const [tab, setTab] = useState(initialTab);
    const imageInputRef = useRef(null);
    const docInputRef = useRef(null);

    // ── Image previews ────────────────────────────────────────────────────────
    const [imagePreviews, setImagePreviews] = useState([]);
    const [deletedImageIds, setDeletedImageIds] = useState([]);
    const [primaryImageId, setPrimaryImageId] = useState(
        existingImages.find(i => i.is_primary)?.id ?? null
    );

    // Tracking meta changes for existing images
    const [existingImageMeta, setExistingImageMeta] = useState(
        existingImages.reduce((acc, img) => {
            acc[img.id] = { imageTypeId: img.image_type_id ?? '', altText: img.alt_text ?? '' };
            return acc;
        }, {})
    );

    const updateExistingMeta = (id, field, value) => {
        const updated = { ...existingImageMeta, [id]: { ...existingImageMeta[id], [field]: value } };
        setExistingImageMeta(updated);
        setData('existing_image_meta', JSON.stringify(updated));
    };

    // ── Document list ─────────────────────────────────────────────────────────
    const [newDocs, setNewDocs] = useState([]);
    const [deletedDocIds, setDeletedDocIds] = useState([]);

    // ─── Handle image file selection ─────────────────────────────────────────
    const handleImageFiles = (files) => {
        const arr = Array.from(files);
        const previews = arr.map(f => ({
            file: f,
            url: URL.createObjectURL(f),
            imageTypeId: '',
            altText: '',
        }));
        setImagePreviews(prev => [...prev, ...previews]);
        setData('images', [...(data.images ?? []), ...arr]);
        setData('image_types', [...(data.image_types ?? []), ...arr.map(() => '')]);
        setData('image_alt_texts', [...(data.image_alt_texts ?? []), ...arr.map(() => '')]);
    };

    const updatePreviewField = (index, field, value) => {
        setImagePreviews(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
        if (field === 'imageTypeId') {
            const types = [...(data.image_types ?? [])];
            types[index] = value;
            setData('image_types', types);
        }
        if (field === 'altText') {
            const alts = [...(data.image_alt_texts ?? [])];
            alts[index] = value;
            setData('image_alt_texts', alts);
        }
    };

    const removeNewImage = (index) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        const currentImages = (data.images ?? []).filter((_, i) => i !== index);
        const currentTypes = (data.image_types ?? []).filter((_, i) => i !== index);
        const currentAlts = (data.image_alt_texts ?? []).filter((_, i) => i !== index);
        setData('images', currentImages);
        setData('image_types', currentTypes);
        setData('image_alt_texts', currentAlts);
    };

    const removeExistingImage = (imgId) => {
        const ids = [...deletedImageIds, imgId];
        setDeletedImageIds(ids);
        setData('deleted_image_ids', JSON.stringify(ids));
    };

    const setExistingPrimary = (imgId) => {
        setPrimaryImageId(imgId);
        setData('primary_image_id', imgId);
    };

    // ─── Owners ──────────────────────────────────────────────────────────────
    const [owners, setOwners] = useState(
        existingOwners.length > 0
            ? existingOwners.map(o => ({ name: o.name, phone: o.phone ?? '', email: o.email ?? '', address: o.address ?? '' }))
            : [{ name: '', phone: '', email: '', address: '' }]
    );

    const updateOwner = (index, field, value) => {
        const updated = [...owners];
        updated[index][field] = value;
        setOwners(updated);
        setData('owners', JSON.stringify(updated));
    };
    const addOwner = () => { const updated = [...owners, { name: '', phone: '', email: '', address: '' }]; setOwners(updated); setData('owners', JSON.stringify(updated)); };
    const removeOwner = (index) => { const updated = owners.filter((_, i) => i !== index); setOwners(updated); setData('owners', JSON.stringify(updated)); };

    // ─── Progress ─────────────────────────────────────────────────────────────
    const [progressList, setProgressList] = useState(
        existingProgress.length > 0
            ? existingProgress
            : []
    );
    const addProgress = () => {
        const updated = [...progressList, { title: '', description: '', progress_date: '', status: 'in_progress' }];
        setProgressList(updated); setData('progress', JSON.stringify(updated));
    };
    const updateProgress = (index, field, value) => {
        const updated = [...progressList]; updated[index][field] = value;
        setProgressList(updated); setData('progress', JSON.stringify(updated));
    };
    const removeProgress = (index) => {
        const updated = progressList.filter((_, i) => i !== index);
        setProgressList(updated); setData('progress', JSON.stringify(updated));
    };

    // ─── Videos ───────────────────────────────────────────────────────────────
    const [videos, setVideos] = useState(existingVideos.map(v => ({ video_url: v.video_url, title: v.title ?? '', platform: v.platform })));
    const addVideo = () => { const updated = [...videos, { video_url: '', title: '', platform: 'youtube' }]; setVideos(updated); setData('videos', JSON.stringify(updated)); };
    const updateVideo = (index, field, value) => {
        const updated = [...videos]; updated[index][field] = value;
        setVideos(updated); setData('videos', JSON.stringify(updated));
    };
    const removeVideo = (index) => {
        const updated = videos.filter((_, i) => i !== index);
        setVideos(updated); setData('videos', JSON.stringify(updated));
    };

    // ─── Amenity toggle ───────────────────────────────────────────────────────
    const toggleAmenity = (id) => {
        const current = data.amenity_ids ?? [];
        const ids = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
        setData('amenity_ids', ids);
    };

    const tabMeta = [
        { label: 'Project Details', icon: <HomeIcon /> },
        { label: 'Media & Documents', icon: <ImageIcon /> },
        { label: 'Contacts', icon: <PeopleIcon /> },
        { label: 'Amenities', icon: <ConstructionIcon /> },
        { label: 'Progress', icon: <ProgressIcon /> },
        { label: 'Videos', icon: <VideoIcon /> },
    ];

    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
            {/* Main Tabs Navigation */}
            <Paper elevation={0} sx={{ borderRadius: 2, mb: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                <Tabs
                    value={tab}
                    onChange={(_, v) => setTab(v)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        px: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' },
                        '& .MuiTab-root': {
                            minHeight: 64,
                            fontWeight: 700,
                            textTransform: 'none',
                            fontSize: '0.9rem',
                            color: 'text.secondary',
                            gap: 1.5,
                            transition: 'all 0.2s',
                            '&.Mui-selected': { color: 'primary.main' },
                            '&:hover': { bgcolor: 'action.hover' }
                        }
                    }}
                >
                    {tabMeta.map((t, i) => (
                        <Tab key={i} label={t.label} icon={t.icon} iconPosition="start" />
                    ))}
                </Tabs>

                <Box sx={{ p: { xs: 3, md: 5 } }}>

                    {/* ─── Tab 0: Project Details (Basic + Location + Physical) ─── */}
                    <TabPanel value={tab} index={0}>
                        <SectionHeader icon={<HomeIcon />} title="Project Essentials" subtitle="Identify the project and its core purpose" />
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={8}>
                                <FormLabel required>Project Name</FormLabel>
                                <TextField fullWidth placeholder="e.g. Royal Orchid Residencies"
                                    value={data.project_name} onChange={e => setData('project_name', e.target.value)}
                                    error={!!errors.project_name} helperText={errors.project_name} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormLabel required>Project Category / Type</FormLabel>
                                <TextField select fullWidth
                                    value={data.project_type_id} onChange={e => setData('project_type_id', e.target.value)}
                                    error={!!errors.project_type_id} helperText={errors.project_type_id}>
                                    <MenuItem value="">Select Project Type</MenuItem>
                                    {projectTypes.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel required>Narrative Description</FormLabel>
                                <TextField fullWidth multiline rows={5}
                                    placeholder="Write a compelling story about the project..."
                                    value={data.description} onChange={e => setData('description', e.target.value)}
                                    error={!!errors.description} helperText={errors.description} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormLabel>Service Category</FormLabel>
                                <TextField select fullWidth
                                    value={data.service_category_id ?? ''} onChange={e => setData('service_category_id', e.target.value)}
                                    error={!!errors.service_category_id} helperText={errors.service_category_id}>
                                    <MenuItem value="">Standard Project</MenuItem>
                                    {serviceCategories.map(c => <MenuItem key={c.id} value={c.id}>{c.category_name}</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormLabel>Assigned Service Package</FormLabel>
                                <TextField select fullWidth
                                    value={data.service_package_id ?? ''} onChange={e => setData('service_package_id', e.target.value)}
                                    error={!!errors.service_package_id} helperText={errors.service_package_id}>
                                    <MenuItem value="">Custom / No Package</MenuItem>
                                    {servicePackages.map(p => <MenuItem key={p.id} value={p.id}>{p.title}</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormLabel required>Construction Status</FormLabel>
                                <TextField select fullWidth
                                    value={data.status} onChange={e => setData('status', e.target.value)}
                                    error={!!errors.status} helperText={errors.status}>
                                    <MenuItem value="upcoming">Upcoming</MenuItem>
                                    <MenuItem value="ongoing">Ongoing</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormLabel>Project Commencement Date</FormLabel>
                                <TextField fullWidth type="date" InputLabelProps={{ shrink: true }}
                                    value={data.project_start_date ?? ''} onChange={e => setData('project_start_date', e.target.value)}
                                    error={!!errors.project_start_date} helperText={errors.project_start_date} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormLabel>Expected Completion Date</FormLabel>
                                <TextField fullWidth type="date" InputLabelProps={{ shrink: true }}
                                    value={data.project_completion_date ?? ''} onChange={e => setData('project_completion_date', e.target.value)}
                                    error={!!errors.project_completion_date} helperText={errors.project_completion_date} />
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 4 }} />
                        <SectionHeader icon={<LocationIcon />} title="Location & Access" subtitle="Provide precise geographical details" />
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <FormLabel required>Locality / Neighborhood</FormLabel>
                                <TextField fullWidth placeholder="e.g. Bani Park"
                                    value={data.project_location} onChange={e => setData('project_location', e.target.value)}
                                    error={!!errors.project_location} helperText={errors.project_location} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormLabel required>District / City</FormLabel>
                                <TextField select fullWidth
                                    value={data.district_id} onChange={e => setData('district_id', e.target.value)}
                                    error={!!errors.district_id} helperText={errors.district_id}>
                                    <MenuItem value="">Select District</MenuItem>
                                    {districts.map(d => <MenuItem key={d.id} value={d.id}>{d.name}, {d.state}</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel required>Descriptive Site Address</FormLabel>
                                <TextField fullWidth multiline rows={3} placeholder="Full street address and landmarks..."
                                    value={data.address} onChange={e => setData('address', e.target.value)}
                                    error={!!errors.address} helperText={errors.address} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormLabel>GPS Latitude</FormLabel>
                                <TextField fullWidth type="number" placeholder="e.g. 26.91243"
                                    InputProps={{ inputProps: { step: 'any' } }}
                                    value={data.latitude ?? ''} onChange={e => setData('latitude', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormLabel>GPS Longitude</FormLabel>
                                <TextField fullWidth type="number" placeholder="e.g. 75.78727"
                                    InputProps={{ inputProps: { step: 'any' } }}
                                    value={data.longitude ?? ''} onChange={e => setData('longitude', e.target.value)} />
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 4 }} />
                        <SectionHeader icon={<AreaIcon />} title="Project Scale" subtitle="Dimensions, room counts, and floor plans" />
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={4}>
                                <FormLabel>Number of Rooms</FormLabel>
                                <TextField fullWidth type="number"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><RoomIcon color="action" /></InputAdornment>,
                                        inputProps: { min: 0 }
                                    }}
                                    value={data.number_of_rooms ?? ''} onChange={e => setData('number_of_rooms', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel>Number of Floors</FormLabel>
                                <TextField fullWidth type="number"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><FloorIcon color="action" /></InputAdornment>,
                                        inputProps: { min: 0 }
                                    }}
                                    value={data.number_of_floors ?? ''} onChange={e => setData('number_of_floors', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormLabel>Washrooms / Ensuites</FormLabel>
                                <TextField fullWidth type="number"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><WashroomIcon color="action" /></InputAdornment>,
                                        inputProps: { min: 0 }
                                    }}
                                    value={data.number_of_washrooms ?? ''} onChange={e => setData('number_of_washrooms', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <FormLabel>Gross Built-up Area</FormLabel>
                                <TextField fullWidth type="number"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">{data.area_unit}</InputAdornment>,
                                        inputProps: { min: 0, step: 'any' }
                                    }}
                                    value={data.total_area ?? ''} onChange={e => setData('total_area', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <FormLabel>Net Carpet Area</FormLabel>
                                <TextField fullWidth type="number"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">{data.area_unit}</InputAdornment>,
                                        inputProps: { min: 0, step: 'any' }
                                    }}
                                    value={data.carpet_area ?? ''} onChange={e => setData('carpet_area', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <FormLabel>Measurement Unit</FormLabel>
                                <TextField select fullWidth
                                    value={data.area_unit ?? 'sqft'} onChange={e => setData('area_unit', e.target.value)}>
                                    <MenuItem value="sqft">Square Feet (sqft)</MenuItem>
                                    <MenuItem value="sqm">Square Meters (sqm)</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 6 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <InfoIcon color="primary" fontSize="small" /> Operational Visibility & Badging
                        </Typography>
                        <Grid container spacing={3}>
                            {[
                                { name: 'is_active', label: 'Visible on Website', color: 'success', checked: data.is_active ?? true },
                                { name: 'is_featured', label: 'Feature on Homepage', color: 'warning', checked: data.is_featured ?? false },
                                { name: 'is_working', label: 'Currently Active Site', color: 'info', checked: data.is_working ?? false },
                                { name: 'is_completed', label: 'Fully Handed Over', color: 'success', checked: data.is_completed ?? false },
                            ].map((flag) => (
                                <Grid item xs={12} sm={6} md={3} key={flag.name}>
                                    <Paper variant="outlined" sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        bgcolor: flag.checked ? `${flag.color}.50` : 'transparent',
                                        borderColor: flag.checked ? `${flag.color}.200` : 'divider',
                                        transition: 'all 0.2s'
                                    }}>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{flag.label}</Typography>
                                        <Switch
                                            checked={flag.checked}
                                            onChange={e => setData(flag.name, e.target.checked)}
                                            color={flag.color}
                                        />
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>

                    {/* ─── Tab 1: Media & Documents ─────────────────────── */}
                    <TabPanel value={tab} index={1}>
                        <SectionHeader icon={<ImageIcon />} title="Project Showcase" subtitle="Manage visuals, renders, and site photos" />

                        {/* Existing Images */}
                        {existingImages.filter(img => !deletedImageIds.includes(img.id)).length > 0 && (
                            <Box sx={{ mb: 8 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckIcon color="success" fontSize="small" /> LIVE GALLERY
                                </Typography>
                                <Grid container spacing={4}>
                                    {existingImages.filter(img => !deletedImageIds.includes(img.id)).map(img => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={img.id}>
                                            <Paper elevation={0} sx={{
                                                borderRadius: 2,
                                                overflow: 'hidden',
                                                border: '2px solid',
                                                borderColor: primaryImageId === img.id ? 'primary.main' : 'divider',
                                                transition: 'all 0.3s ease',
                                                '&:hover': { transform: 'scale(1.02)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }
                                            }}>
                                                <Box sx={{ position: 'relative', pt: '75%', bgcolor: 'action.hover' }}>
                                                    <Box 
                                                        component="img" 
                                                        src={img.file_path?.startsWith('http') ? img.file_path : `/storage/${img.file_path}`} 
                                                        alt={img.alt_text || data.project_name}
                                                        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                                                    />
                                                    {primaryImageId === img.id && (
                                                        <Chip label="COVER IMAGE" size="small" color="primary" sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 900, borderRadius: 1, fontSize: '0.65rem' }} />
                                                    )}
                                                </Box>
                                                <Box sx={{ p: 2.5 }}>
                                                    <Box sx={{ mb: 2 }}>
                                                        <FormLabel>Visual Category</FormLabel>
                                                        <TextField
                                                            select size="small" fullWidth
                                                            value={existingImageMeta[img.id]?.imageTypeId ?? ''}
                                                            onChange={e => updateExistingMeta(img.id, 'imageTypeId', e.target.value)}
                                                        >
                                                            <MenuItem value="">Select Type</MenuItem>
                                                            {imageTypes.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
                                                        </TextField>
                                                    </Box>
                                                    <Box>
                                                        <FormLabel>Alt Narrative</FormLabel>
                                                        <TextField
                                                            size="small" fullWidth
                                                            placeholder="Describe image..."
                                                            value={existingImageMeta[img.id]?.altText ?? ''}
                                                            onChange={e => updateExistingMeta(img.id, 'altText', e.target.value)}
                                                        />
                                                    </Box>
                                                </Box>
                                                <Divider />
                                                <Stack direction="row" sx={{ bgcolor: 'action.hover' }}>
                                                    <Button
                                                        fullWidth
                                                        startIcon={primaryImageId === img.id ? <StarIcon /> : <StarBorderIcon />}
                                                        onClick={() => setExistingPrimary(img.id)}
                                                        color={primaryImageId === img.id ? 'primary' : 'inherit'}
                                                        sx={{ borderRadius: 0, py: 1.2, fontWeight: 700, fontSize: '0.75rem' }}
                                                    >
                                                        Primary
                                                    </Button>
                                                    <Divider orientation="vertical" flexItem />
                                                    <IconButton color="error" onClick={() => removeExistingImage(img.id)} sx={{ borderRadius: 0, width: 56 }}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}

                        {/* Upload Interface */}
                        <Box sx={{
                            p: 6,
                            borderRadius: 2,
                            border: '3px dashed',
                            borderColor: 'divider',
                            bgcolor: 'action.hover',
                            textAlign: 'center',
                            mb: 6,
                            transition: 'all 0.2s',
                            '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' }
                        }}>
                            <ImageIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Add Project Visuals</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 300, mx: 'auto' }}>
                                Drag and drop images here, or click the button below to browse your computer.
                            </Typography>
                            <input ref={imageInputRef} type="file" multiple accept="image/*" hidden
                                onChange={e => { if (e.target.files) handleImageFiles(e.target.files); e.target.value = ''; }}
                                name="images[]"
                            />
                            <Button
                                variant="contained"
                                startIcon={<UploadIcon />}
                                onClick={() => imageInputRef.current.click()}
                                sx={{ borderRadius: 2, px: 4, py: 1.5, fontWeight: 800 }}
                            >
                                Browse Files
                            </Button>
                        </Box>

                        {/* Upload Queue */}
                        {imagePreviews.length > 0 && (
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 3 }}>PENDING UPLOAD ({imagePreviews.length})</Typography>
                                <Stack spacing={2.5}>
                                    {imagePreviews.map((prev, i) => (
                                        <Paper key={i} variant="outlined" sx={{ p: 2.5, borderRadius: 2, bgcolor: 'background.paper' }}>
                                            <Grid container spacing={3} alignItems="center">
                                                <Grid item xs={12} sm={2} md={1.5}>
                                                    <Box component="img" src={prev.url} sx={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 1, display: 'block' }} />
                                                </Grid>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <FormLabel required>Content Type</FormLabel>
                                                    <TextField
                                                        select size="small" fullWidth
                                                        value={prev.imageTypeId}
                                                        onChange={e => updatePreviewField(i, 'imageTypeId', e.target.value)}
                                                    >
                                                        <MenuItem value="">Select Type</MenuItem>
                                                        {imageTypes.map(type => (
                                                            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={12} sm={5} md={5.5}>
                                                    <FormLabel>Accessibility Alt Text</FormLabel>
                                                    <TextField
                                                        size="small" fullWidth
                                                        placeholder="e.g. Living room rendering..."
                                                        value={prev.altText}
                                                        onChange={e => updatePreviewField(i, 'altText', e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={1} md={1} sx={{ textAlign: 'right' }}>
                                                    <IconButton color="error" onClick={() => removeNewImage(i)} sx={{ mt: 2.5 }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    ))}
                                </Stack>
                            </Box>
                        )}

                        <Divider sx={{ my: 8 }} />
                        <SectionHeader icon={<DocIcon />} title="File Repository" subtitle="Project brochures, floor plans, and certifications" />

                        {existingDocuments.length > 0 && (
                            <Box sx={{ mb: 6 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2.5 }}>ARCHIVED DOCUMENTS</Typography>
                                <Grid container spacing={2}>
                                    {existingDocuments.filter(d => !deletedDocIds.includes(d.id)).map(doc => (
                                        <Grid item xs={12} md={6} key={doc.id}>
                                            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main', borderRadius: 1.5 }}>
                                                    <DocIcon />
                                                </Avatar>
                                                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }} noWrap>{doc.document_name}</Typography>
                                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                                                        {doc.document_type}
                                                    </Typography>
                                                </Box>
                                                <Stack direction="row" spacing={1}>
                                                    <IconButton size="small" href={`/storage/${doc.file_path}`} target="_blank" color="primary"><UploadIcon sx={{ transform: 'rotate(180deg)' }} /></IconButton>
                                                    <IconButton size="small" color="error" onClick={() => {
                                                        const ids = [...deletedDocIds, doc.id];
                                                        setDeletedDocIds(ids);
                                                        setData('deleted_doc_ids', JSON.stringify(ids));
                                                    }}><DeleteIcon /></IconButton>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}

                        <Box sx={{ textAlign: 'center', p: 4, borderRadius: 2, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider' }}>
                            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => docInputRef.current.click()} sx={{ borderRadius: 2, fontWeight: 800, px: 4 }}>
                                Attach New Documents
                            </Button>
                            <input ref={docInputRef} type="file" multiple hidden
                                onChange={e => {
                                    const files = Array.from(e.target.files);
                                    const docs = files.map(f => ({ file: f, name: f.name, type: 'other' }));
                                    const combined = [...newDocs, ...docs];
                                    setNewDocs(combined);
                                    setData('document_names', JSON.stringify(combined.map(x => x.name)));
                                    setData('document_types', JSON.stringify(combined.map(x => x.type)));
                                    e.target.value = '';
                                }}
                                name="documents[]"
                            />
                        </Box>

                        {newDocs.length > 0 && (
                            <Stack spacing={2} sx={{ mt: 4 }}>
                                {newDocs.map((doc, i) => (
                                    <Paper key={i} variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                        <Grid container spacing={3} alignItems="center">
                                            <Grid item xs={12} md={5}>
                                                <FormLabel required>File Title</FormLabel>
                                                <TextField size="small" fullWidth value={doc.name}
                                                    onChange={e => { const d = [...newDocs]; d[i].name = e.target.value; setNewDocs(d); setData('document_names', JSON.stringify(d.map(x => x.name))); }} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <FormLabel required>Document Category</FormLabel>
                                                <TextField select size="small" fullWidth value={doc.type}
                                                    onChange={e => { const d = [...newDocs]; d[i].type = e.target.value; setNewDocs(d); setData('document_names', JSON.stringify(d.map(x => x.name))); }}
                                                >
                                                    <MenuItem value="plan">Floor Plan</MenuItem>
                                                    <MenuItem value="approval">Government Approval</MenuItem>
                                                    <MenuItem value="brochure">Sales Brochure</MenuItem>
                                                    <MenuItem value="other">General File</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} md={2} sx={{ textAlign: 'right' }}>
                                                <IconButton color="error" onClick={() => {
                                                    const updated = newDocs.filter((_, j) => j !== i);
                                                    setNewDocs(updated);
                                                    setData('document_names', JSON.stringify(updated.map(x => x.name)));
                                                    setData('document_types', JSON.stringify(updated.map(x => x.type)));
                                                }} sx={{ mt: 2.5 }}><DeleteIcon /></IconButton>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                ))}
                            </Stack>
                        )}
                    </TabPanel>

                    {/* ─── Tab 2: Contacts ───────────────────────────────── */}
                    <TabPanel value={tab} index={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                            <SectionHeader icon={<PeopleIcon />} title="Key Stakeholders" subtitle="Manage owners, partners, and site contacts" />
                            <Button variant="contained" startIcon={<AddIcon />} onClick={addOwner} sx={{ borderRadius: 2, fontWeight: 800 }}>Add Stakeholder</Button>
                        </Box>
                        <Grid container spacing={4}>
                            {owners.map((owner, i) => (
                                <Grid item xs={12} md={6} key={i}>
                                    <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, bgcolor: 'background.default' }}>
                                        <Stack spacing={3}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Chip label={`CONTACT #${i + 1}`} size="small" color="primary" sx={{ fontWeight: 900, borderRadius: 1 }} />
                                                {owners.length > 1 && (
                                                    <IconButton color="error" size="small" onClick={() => removeOwner(i)}><DeleteIcon fontSize="small" /></IconButton>
                                                )}
                                            </Box>
                                            <Box>
                                                <FormLabel required>Stakeholder Name</FormLabel>
                                                <TextField fullWidth value={owner.name} onChange={e => updateOwner(i, 'name', e.target.value)} />
                                            </Box>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <FormLabel>Mobile Number</FormLabel>
                                                    <TextField fullWidth value={owner.phone} onChange={e => updateOwner(i, 'phone', e.target.value)} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <TextField fullWidth type="email" value={owner.email} onChange={e => updateOwner(i, 'email', e.target.value)} />
                                                </Grid>
                                            </Grid>
                                            <Box>
                                                <FormLabel>Mailing Address</FormLabel>
                                                <TextField fullWidth multiline rows={2} value={owner.address} onChange={e => updateOwner(i, 'address', e.target.value)} />
                                            </Box>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>

                    {/* ─── Tab 3: Amenities ──────────────────────────────── */}
                    <TabPanel value={tab} index={3}>
                        <SectionHeader icon={<ConstructionIcon />} title="Project Features" subtitle="Highlight the luxuries and facilities available" />
                        <Paper elevation={0} variant="outlined" sx={{ p: 5, borderRadius: 2, bgcolor: 'background.default' }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                {amenities.map(a => {
                                    const selected = (data.amenity_ids ?? []).includes(a.id);
                                    return (
                                        <Chip
                                            key={a.id}
                                            label={a.name}
                                            clickable
                                            onClick={() => toggleAmenity(a.id)}
                                            color={selected ? 'primary' : 'default'}
                                            variant={selected ? 'filled' : 'outlined'}
                                            sx={{
                                                fontWeight: 800,
                                                borderRadius: 1.5,
                                                height: 48,
                                                px: 2,
                                                fontSize: '0.9rem',
                                                borderWidth: 2,
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                        </Paper>
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
                                <Box component="span" sx={{ color: 'primary.main' }}>{(data.amenity_ids ?? []).length}</Box> features currently selected for this project.
                            </Typography>
                        </Box>
                    </TabPanel>

                    {/* ─── Tab 4: Progress ───────────────────────────────── */}
                    <TabPanel value={tab} index={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                            <SectionHeader icon={<ProgressIcon />} title="Build Journey" subtitle="Track development phases and reaching goals" />
                            <Button variant="outlined" startIcon={<AddIcon />} onClick={addProgress} sx={{ borderRadius: 2, fontWeight: 800 }}>Add Entry</Button>
                        </Box>
                        <Stack spacing={4}>
                            {progressList.map((prog, i) => (
                                <Paper key={i} elevation={0} variant="outlined" sx={{ p: 4, borderRadius: 2, position: 'relative' }}>
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => removeProgress(i)}
                                        sx={{ position: 'absolute', top: 16, right: 16 }}
                                    ><DeleteIcon /></IconButton>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} md={7}>
                                            <FormLabel required>Phase Title</FormLabel>
                                            <TextField fullWidth placeholder="e.g. Foundation & Plinth Work" value={prog.title} onChange={e => updateProgress(i, 'title', e.target.value)} required />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={2.5}>
                                            <FormLabel required>Log Date</FormLabel>
                                            <TextField fullWidth type="date" InputLabelProps={{ shrink: true }} value={prog.progress_date} onChange={e => updateProgress(i, 'progress_date', e.target.value)} required />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={2.5}>
                                            <FormLabel required>Status</FormLabel>
                                            <TextField select fullWidth value={prog.status ?? 'in_progress'} onChange={e => updateProgress(i, 'status', e.target.value)}>
                                                <MenuItem value="in_progress">In Progress</MenuItem>
                                                <MenuItem value="completed">Achieved</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormLabel>Narrative Summary</FormLabel>
                                            <TextField fullWidth multiline rows={2} placeholder="Describe the work done in this phase..." value={prog.description ?? ''} onChange={e => updateProgress(i, 'description', e.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                        </Stack>
                    </TabPanel>

                    {/* ─── Tab 5: Videos ─────────────────────────────────── */}
                    <TabPanel value={tab} index={5}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                            <SectionHeader icon={<VideoIcon />} title="Cinematic Tour" subtitle="Curate video walkthroughs and site flybys" />
                            <Button variant="contained" startIcon={<AddIcon />} onClick={addVideo} sx={{ borderRadius: 2, fontWeight: 800 }}>Add Video Link</Button>
                        </Box>
                        <Grid container spacing={3}>
                            {videos.map((vid, i) => (
                                <Grid item xs={12} key={i}>
                                    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: 'background.default' }}>
                                        <Grid container spacing={3} alignItems="center">
                                            <Grid item xs={12} md={2}>
                                                <FormLabel required>Host</FormLabel>
                                                <TextField select fullWidth value={vid.platform} onChange={e => updateVideo(i, 'platform', e.target.value)}>
                                                    <MenuItem value="youtube">YouTube</MenuItem>
                                                    <MenuItem value="vimeo">Vimeo</MenuItem>
                                                    <MenuItem value="upload">Local</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormLabel required>Resource URL</FormLabel>
                                                <TextField fullWidth value={vid.video_url} onChange={e => updateVideo(i, 'video_url', e.target.value)} required />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <FormLabel>Display Title</FormLabel>
                                                <TextField fullWidth value={vid.title} onChange={e => updateVideo(i, 'title', e.target.value)} />
                                            </Grid>
                                            <Grid item xs={12} md={1} sx={{ textAlign: 'right' }}>
                                                <IconButton color="error" onClick={() => removeVideo(i)} sx={{ mt: 2.5 }}><DeleteIcon /></IconButton>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>

                </Box>
            </Paper>

            {/* Sticky Action Footer */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: '0 -10px 40px -10px rgba(0,0,0,0.1)',
                position: 'sticky',
                bottom: 24,
                zIndex: 10,
                border: '1px solid',
                borderColor: 'divider'
            }}>
                <Button component="a" href={route('admin.projects.index')} color="inherit" sx={{ fontWeight: 800, px: 4 }}>
                    Discard & Exit
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={processing}
                    size="large"
                    sx={{
                        fontWeight: 900,
                        borderRadius: 2,
                        px: 8,
                        py: 1.8,
                        fontSize: '1rem',
                        boxShadow: '0 12px 24px -6px rgba(99,102,241,0.4)',
                        textTransform: 'none'
                    }}
                >
                    {processing 
                        ? 'Saving Data…' 
                        : !isEdit 
                            ? 'Next: Media & Documents' 
                            : tab === 0 
                                ? 'Save & Next: Media' 
                                : 'Sync Project Updates'}
                </Button>
            </Box>
        </form>
    );
}
