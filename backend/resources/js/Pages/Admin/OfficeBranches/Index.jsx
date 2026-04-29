import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Box,
    Typography,
    Button,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Tooltip,
    Chip,
    FormControlLabel,
    Switch,
    Avatar
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';

export default function Index({ branches }) {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        _method: 'post',
        name: '',
        location: '',
        address: '',
        email: '',
        phone: '',
        description: '',
        map_url: '',
        image: null,
        is_active: true
    });

    const handleOpen = (branch = null) => {
        if (branch) {
            setEditMode(true);
            setCurrentId(branch.id);
            setData({
                _method: 'put',
                name: branch.name || '',
                location: branch.location || '',
                address: branch.address || '',
                email: branch.email || '',
                phone: branch.phone || '',
                description: branch.description || '',
                map_url: branch.map_url || '',
                image: null, // Reset file input
                is_active: branch.is_active === 1 || branch.is_active === true
            });
        } else {
            setEditMode(false);
            reset();
            setData('_method', 'post');
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
            post(route('admin.office-branches.update', currentId), {
                forceFormData: true,
                onSuccess: () => handleClose()
            });
        } else {
            post(route('admin.office-branches.store'), {
                forceFormData: true,
                onSuccess: () => handleClose()
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this office branch?')) {
            destroy(route('admin.office-branches.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Office Branches" />

            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -1 }}>
                        Office Branches
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Manage company office locations and contact details.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{ borderRadius: 1, px: 3, py: 1 }}
                >
                    Add Branch
                </Button>
            </Box>

            <Card sx={{ borderRadius: 1.5 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Contact Info</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {branches.map((branch) => (
                                <TableRow key={branch.id} hover>
                                    <TableCell sx={{ fontWeight: 600 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            {branch.image_url ? (
                                                <Avatar src={branch.image_url} variant="rounded" sx={{ width: 40, height: 40 }} />
                                            ) : (
                                                <Avatar variant="rounded" sx={{ width: 40, height: 40 }}>B</Avatar>
                                            )}
                                            {branch.name}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{branch.location}</TableCell>
                                    <TableCell>
                                        <Typography variant="caption" display="block">{branch.email}</Typography>
                                        <Typography variant="caption" display="block">{branch.phone}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={branch.is_active ? 'Active' : 'Inactive'} 
                                            color={branch.is_active ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton onClick={() => handleOpen(branch)} color="primary" size="small">
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDelete(branch.id)} color="error" size="small">
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {branches.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                        No office branches found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 1 } }}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle sx={{ fontWeight: 700 }}>
                        {editMode ? 'Edit Office Branch' : 'Add New Office Branch'}
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Branch Name"
                                fullWidth
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                error={!!errors.name}
                                helperText={errors.name || "e.g., Headquarters, Downtown Office"}
                                required
                            />
                            <TextField
                                label="Location (City/Area)"
                                fullWidth
                                value={data.location}
                                onChange={e => setData('location', e.target.value)}
                                error={!!errors.location}
                                helperText={errors.location}
                            />
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>Branch Image</Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setData('image', e.target.files[0])}
                                    className="form-control"
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                                {errors.image && <Typography variant="caption" color="error">{errors.image}</Typography>}
                            </Box>
                            <TextField
                                label="Full Address"
                                fullWidth
                                multiline
                                rows={2}
                                value={data.address}
                                onChange={e => setData('address', e.target.value)}
                                error={!!errors.address}
                                helperText={errors.address}
                            />
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    label="Email Address"
                                    fullWidth
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                                <TextField
                                    label="Phone Number"
                                    fullWidth
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                />
                            </Box>
                            <TextField
                                label="Description / Details"
                                fullWidth
                                multiline
                                rows={2}
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                error={!!errors.description}
                                helperText={errors.description}
                            />
                            <TextField
                                label="Google Maps Embed URL (src attribute only)"
                                fullWidth
                                value={data.map_url}
                                onChange={e => setData('map_url', e.target.value)}
                                error={!!errors.map_url}
                                helperText={errors.map_url || "Extract the 'src' link from the Google Maps iframe embed code"}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Branch is Active"
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={handleClose} color="inherit" sx={{ fontWeight: 700 }}>Cancel</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={processing}
                            sx={{ fontWeight: 700, borderRadius: 0.75 }}
                        >
                            {editMode ? 'Update' : 'Save'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </AdminLayout>
    );
}
