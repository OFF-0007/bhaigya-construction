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
    Tooltip
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';

export default function Index({ amenities }) {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        icon: '',
        slug: ''
    });

    const handleOpen = (amenity = null) => {
        if (amenity) {
            setEditMode(true);
            setCurrentId(amenity.id);
            setData({
                name: amenity.name,
                icon: amenity.icon || '',
                slug: amenity.slug || ''
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
            put(route('admin.amenities.update', currentId), {
                onSuccess: () => handleClose()
            });
        } else {
            post(route('admin.amenities.store'), {
                onSuccess: () => handleClose()
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this amenity?')) {
            destroy(route('admin.amenities.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Amenities" />

            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -1 }}>
                        Amenities
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Manage project amenities and features.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{ borderRadius: 1, px: 3, py: 1 }}
                >
                    Add Amenity
                </Button>
            </Box>

            <Card sx={{ borderRadius: 1.5 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Slug</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Icon (Class)</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {amenities.map((amenity) => (
                                <TableRow key={amenity.id} hover>
                                    <TableCell>{amenity.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{amenity.name}</TableCell>
                                    <TableCell>{amenity.slug}</TableCell>
                                    <TableCell>{amenity.icon}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton onClick={() => handleOpen(amenity)} color="primary" size="small">
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDelete(amenity.id)} color="error" size="small">
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {amenities.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                        No amenities found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 1 } }}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle sx={{ fontWeight: 700 }}>
                        {editMode ? 'Edit Amenity' : 'Add New Amenity'}
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Amenity Name"
                                fullWidth
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                error={!!errors.name}
                                helperText={errors.name}
                                required
                            />
                            <TextField
                                label="Slug (Optional)"
                                fullWidth
                                value={data.slug}
                                onChange={e => setData('slug', e.target.value)}
                                error={!!errors.slug}
                                helperText={errors.slug || "Leave blank to auto-generate"}
                            />
                            <TextField
                                label="Icon Class (e.g. fas fa-swimming-pool)"
                                fullWidth
                                value={data.icon}
                                onChange={e => setData('icon', e.target.value)}
                                error={!!errors.icon}
                                helperText={errors.icon}
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
