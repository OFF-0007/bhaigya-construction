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

export default function Index({ districts }) {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        state: 'Odisha',
        country: 'India'
    });

    const handleOpen = (district = null) => {
        if (district) {
            setEditMode(true);
            setCurrentId(district.id);
            setData({
                name: district.name,
                state: district.state || 'Odisha',
                country: district.country || 'India'
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
            put(route('admin.districts.update', currentId), {
                onSuccess: () => handleClose()
            });
        } else {
            post(route('admin.districts.store'), {
                onSuccess: () => handleClose()
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this district?')) {
            destroy(route('admin.districts.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Districts" />

            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -1 }}>
                        Districts
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Manage locations for projects.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{ borderRadius: 3, px: 3, py: 1 }}
                >
                    Add District
                </Button>
            </Box>

            <Card sx={{ borderRadius: 4 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>State</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Country</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {districts.map((district) => (
                                <TableRow key={district.id} hover>
                                    <TableCell>{district.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{district.name}</TableCell>
                                    <TableCell>{district.state}</TableCell>
                                    <TableCell>{district.country}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton onClick={() => handleOpen(district)} color="primary" size="small">
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDelete(district.id)} color="error" size="small">
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {districts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                        No districts found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle sx={{ fontWeight: 700 }}>
                        {editMode ? 'Edit District' : 'Add New District'}
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="District Name"
                                fullWidth
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                error={!!errors.name}
                                helperText={errors.name}
                                required
                            />
                            <TextField
                                label="State"
                                fullWidth
                                value={data.state}
                                onChange={e => setData('state', e.target.value)}
                                error={!!errors.state}
                                helperText={errors.state}
                            />
                            <TextField
                                label="Country"
                                fullWidth
                                value={data.country}
                                onChange={e => setData('country', e.target.value)}
                                error={!!errors.country}
                                helperText={errors.country}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={handleClose} color="inherit" sx={{ fontWeight: 700 }}>Cancel</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={processing}
                            sx={{ fontWeight: 700, borderRadius: 2 }}
                        >
                            {editMode ? 'Update' : 'Save'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </AdminLayout>
    );
}
