import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
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
    Paper,
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
    Tooltip
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Refresh as RefreshIcon
} from '@mui/icons-material';

export default function Index({ categories }) {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        category_name: '',
        type: 'common',
        is_active: true
    });

    const handleOpen = (category = null) => {
        if (category) {
            setEditMode(true);
            setCurrentId(category.id);
            setData({
                category_name: category.category_name,
                type: category.type,
                is_active: category.is_active
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
            put(route('admin.service-categories.update', currentId), {
                onSuccess: () => handleClose()
            });
        } else {
            post(route('admin.service-categories.store'), {
                onSuccess: () => handleClose()
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            destroy(route('admin.service-categories.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Service Categories" />

            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -1 }}>
                        Service Categories
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Manage categories for packages, projects, and common services.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{ borderRadius: 3, px: 3, py: 1 }}
                >
                    Add Category
                </Button>
            </Box>

            <Card sx={{ borderRadius: 4 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Category Name</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id} hover>
                                    <TableCell>{category.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{category.category_name}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={category.type.toUpperCase()}
                                            size="small"
                                            color={
                                                category.type === 'package' ? 'primary' :
                                                category.type === 'project' ? 'secondary' : 'default'
                                            }
                                            sx={{ fontWeight: 700, borderRadius: 1.5 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={category.is_active ? 'Active' : 'Inactive'}
                                            size="small"
                                            color={category.is_active ? 'success' : 'error'}
                                            variant="outlined"
                                            sx={{ fontWeight: 700, borderRadius: 1.5 }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton onClick={() => handleOpen(category)} color="primary" size="small">
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDelete(category.id)} color="error" size="small">
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {categories.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                        No categories found.
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
                        {editMode ? 'Edit Category' : 'Add New Category'}
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Category Name"
                                fullWidth
                                value={data.category_name}
                                onChange={e => setData('category_name', e.target.value)}
                                error={!!errors.category_name}
                                helperText={errors.category_name}
                                required
                            />
                            <TextField
                                select
                                label="Type"
                                fullWidth
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                                error={!!errors.type}
                                helperText={errors.type}
                                required
                            >
                                <MenuItem value="package">Package</MenuItem>
                                <MenuItem value="project">Project</MenuItem>
                                <MenuItem value="common">Common</MenuItem>
                            </TextField>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Active Status"
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
