import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    FormControlLabel,
    Switch,
    Tooltip,
    Grid,
    InputAdornment,
    Divider,
    Avatar
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    RemoveCircleOutline as RemoveIcon,
    Star as StarIcon,
    Image as ImageIcon,
    Visibility as ViewIcon,
    Assignment as AgreementIcon,
    Build as MaterialIcon
} from '@mui/icons-material';

export default function Index({ packages, categories }) {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors, transform } = useForm({
        category_id: '',
        title: '',
        description: '',
        image: null,
        benefits: [''],
        is_active: true,
        popularity: 'standard',
        price: '',
        is_featured: false
    });

    const handleOpen = (pkg = null) => {
        if (pkg) {
            setEditMode(true);
            setCurrentId(pkg.id);
            setData({
                category_id: pkg.category_id,
                title: pkg.title,
                description: pkg.description || '',
                image: null,
                benefits: pkg.benefits && pkg.benefits.length > 0 ? pkg.benefits : [''],
                is_active: pkg.is_active,
                popularity: pkg.popularity,
                price: pkg.price || '',
                is_featured: pkg.is_featured
            });
        } else {
            setEditMode(false);
            reset();
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
        clearErrors();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editMode) {
            transform((data) => ({
                ...data,
                _method: 'PUT',
                benefits: data.benefits.filter(b => b.trim() !== ''),
            }));
            post(route('admin.service-packages.update', currentId), {
                forceFormData: true,
                onSuccess: () => handleClose()
            });
        } else {
            transform((data) => ({
                ...data,
                benefits: data.benefits.filter(b => b.trim() !== ''),
            }));
            post(route('admin.service-packages.store'), {
                forceFormData: true,
                onSuccess: () => handleClose()
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this package?')) {
            destroy(route('admin.service-packages.destroy', id));
        }
    };

    const handleBenefitChange = (index, value) => {
        const newBenefits = [...data.benefits];
        newBenefits[index] = value;
        setData('benefits', newBenefits);
    };

    const addBenefit = () => {
        setData('benefits', [...data.benefits, '']);
    };

    const removeBenefit = (index) => {
        const newBenefits = data.benefits.filter((_, i) => i !== index);
        setData('benefits', newBenefits.length > 0 ? newBenefits : ['']);
    };

    return (
        <AdminLayout>
            <Head title="Service Packages" />

            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -1 }}>
                        Service Packages
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Manage different packages provided by the construction company.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        component={Link}
                        href={route('admin.agreements.index')}
                        variant="outlined"
                        startIcon={<AgreementIcon />}
                        sx={{ borderRadius: 1, px: 2 }}
                    >
                        Agreements
                    </Button>
                    <Button
                        component={Link}
                        href={route('admin.package-materials.index')}
                        variant="outlined"
                        startIcon={<MaterialIcon />}
                        sx={{ borderRadius: 1, px: 2 }}
                    >
                        Materials
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpen()}
                        sx={{ borderRadius: 1, px: 3, py: 1 }}
                    >
                        Add Package
                    </Button>
                </Box>
            </Box>

            <Card sx={{ borderRadius: 1.5 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Popularity</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Featured</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packages.map((pkg) => (
                                <TableRow key={pkg.id} hover>
                                    <TableCell>
                                        <Avatar 
                                            src={pkg.image ? `/storage/${pkg.image}` : null} 
                                            variant="rounded"
                                            sx={{ bgcolor: 'primary.light' }}
                                        >
                                            <ImageIcon />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{pkg.title}</TableCell>
                                    <TableCell>{pkg.category?.category_name}</TableCell>
                                    <TableCell>{pkg.price ? `₹${pkg.price}` : 'N/A'}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={pkg.popularity.toUpperCase()}
                                            size="small"
                                            color={
                                                pkg.popularity === 'premium' ? 'secondary' :
                                                pkg.popularity === 'popular' ? 'primary' : 'default'
                                            }
                                            sx={{ fontWeight: 700, borderRadius: 0.5 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {pkg.is_featured && <StarIcon color="warning" fontSize="small" />}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={pkg.is_active ? 'Active' : 'Inactive'}
                                            size="small"
                                            color={pkg.is_active ? 'success' : 'error'}
                                            variant="outlined"
                                            sx={{ fontWeight: 700, borderRadius: 0.5 }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="View Details">
                                            <IconButton component={Link} href={route('admin.service-packages.show', pkg.id)} color="info" size="small">
                                                <ViewIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit">
                                            <IconButton onClick={() => handleOpen(pkg)} color="primary" size="small">
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDelete(pkg.id)} color="error" size="small">
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {packages.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                        No packages found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Dialog 
                open={open} 
                onClose={handleClose} 
                maxWidth="sm" 
                fullWidth 
                PaperProps={{ 
                    sx: { 
                        borderRadius: 1.5,
                        backgroundImage: 'none',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                    } 
                }}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle sx={{ 
                        fontWeight: 800, 
                        fontSize: '1.5rem', 
                        pb: 1,
                        pt: 3,
                        px: 4
                    }}>
                        {editMode ? 'Edit Package' : 'Create New Package'}
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mt: 0.5 }}>
                            Fill in the details below to {editMode ? 'update the' : 'add a new'} service package.
                        </Typography>
                    </DialogTitle>
                    <DialogContent sx={{ px: 4, py: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
                            <TextField
                                label="Package Title"
                                fullWidth
                                placeholder="e.g. Premium Construction Plan"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                error={!!errors.title}
                                helperText={errors.title}
                                required
                                variant="outlined"
                            />

                            <TextField
                                select
                                label="Category"
                                fullWidth
                                value={data.category_id}
                                onChange={e => setData('category_id', e.target.value)}
                                error={!!errors.category_id}
                                helperText={errors.category_id}
                                required
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.category_name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                placeholder="Briefly describe what this package includes..."
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                error={!!errors.description}
                                helperText={errors.description}
                            />

                            <Box>
                                <Typography variant="caption" color="text.secondary" gutterBottom sx={{ display: 'block', mb: 1, fontWeight: 600 }}>
                                    Package Image {editMode && '(Leave blank to keep current)'}
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setData('image', e.target.files[0])}
                                    style={{ width: '100%' }}
                                />
                                {errors.image && <Typography color="error" variant="caption" sx={{ mt: 0.5, display: 'block' }}>{errors.image}</Typography>}
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                <TextField
                                    label="Price"
                                    fullWidth
                                    type="number"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                    error={!!errors.price}
                                    helperText={errors.price}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                />
                                <TextField
                                    select
                                    label="Popularity Tag"
                                    fullWidth
                                    value={data.popularity}
                                    onChange={e => setData('popularity', e.target.value)}
                                    error={!!errors.popularity}
                                    helperText={errors.popularity}
                                    required
                                >
                                    <MenuItem value="standard">Standard</MenuItem>
                                    <MenuItem value="popular">Popular</MenuItem>
                                    <MenuItem value="premium">Premium</MenuItem>
                                </TextField>
                            </Box>
                            
                            <Box>
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between',
                                    mb: 2 
                                }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                        Key Benefits
                                    </Typography>
                                    <Button 
                                        size="small" 
                                        startIcon={<AddIcon />} 
                                        onClick={addBenefit}
                                        variant="outlined"
                                        sx={{ borderRadius: 0.75 }}
                                    >
                                        Add Benefit
                                    </Button>
                                </Box>
                                
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                    {data.benefits.map((benefit, index) => (
                                        <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                placeholder="e.g. 24/7 Customer Support"
                                                value={benefit}
                                                onChange={e => handleBenefitChange(index, e.target.value)}
                                                sx={{ 
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 0.75
                                                    }
                                                }}
                                            />
                                            <IconButton 
                                                color="error" 
                                                onClick={() => removeBenefit(index)} 
                                                disabled={data.benefits.length === 1 && benefit === ''}
                                                sx={{ 
                                                    border: '1px solid', 
                                                    borderColor: 'error.light',
                                                    borderRadius: 0.75,
                                                    p: 0.5
                                                }}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>
                                {errors.benefits && <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>{errors.benefits}</Typography>}
                            </Box>

                            <Divider />

                            <Box sx={{ 
                                display: 'flex', 
                                flexDirection: { xs: 'column', sm: 'row' }, 
                                justifyContent: 'space-between',
                                bgcolor: 'action.hover',
                                p: 2,
                                borderRadius: 1,
                                gap: 2
                            }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label={<Typography sx={{ fontWeight: 600 }}>Active Status</Typography>}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={data.is_featured}
                                            onChange={e => setData('is_featured', e.target.checked)}
                                            color="warning"
                                        />
                                    }
                                    label={<Typography sx={{ fontWeight: 600 }}>Featured Package</Typography>}
                                />
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 4, pt: 2 }}>
                        <Button 
                            onClick={handleClose} 
                            color="inherit" 
                            sx={{ fontWeight: 700, px: 3 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={processing}
                            sx={{ 
                                fontWeight: 700, 
                                borderRadius: 1,
                                px: 4,
                                py: 1.2,
                                boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.3)'
                            }}
                        >
                            {editMode ? 'Update Package' : 'Save Package'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </AdminLayout>
    );
}
