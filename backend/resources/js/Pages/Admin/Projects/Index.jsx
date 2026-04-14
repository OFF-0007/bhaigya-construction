import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Box, Typography, Button, Card, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, IconButton, Chip, Tooltip,
    TextField, MenuItem, Avatar, Stack, Pagination, InputAdornment,
    Switch, FormControlLabel, Badge
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    Search as SearchIcon,
    Construction as ConstructionIcon,
    FilterList as FilterIcon,
    ToggleOn as ToggleOnIcon,
    Star as StarIcon,
    CheckCircle as CheckCircleIcon,
    Build as BuildIcon,
    Schedule as ScheduleIcon
} from '@mui/icons-material';

const statusColors = {
    ongoing:   { color: '#f59e0b', bg: '#fef3c7', label: 'Ongoing' },
    completed: { color: '#10b981', bg: '#d1fae5', label: 'Completed' },
    upcoming:  { color: '#6366f1', bg: '#ede9fe', label: 'Upcoming' },
};

export default function Index({ projects, projectTypes, servicePackages = [], filters }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');
    const [typeId, setTypeId] = useState(filters.project_type_id ?? '');
    const [packageId, setPackageId] = useState(filters.service_package_id ?? '');

    const applyFilter = (overrides = {}) => {
        router.get(route('admin.projects.index'), {
            search,
            status,
            project_type_id: typeId,
            service_package_id: packageId,
            ...overrides,
        }, { preserveState: true, replace: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this project? This action is reversible.')) {
            router.delete(route('admin.projects.destroy', id));
        }
    };

    const handleToggleActive = (id) => {
        router.patch(route('admin.projects.toggle-active', id), {}, { preserveScroll: true });
    };

    return (
        <AdminLayout>
            <Head title="Projects" />

            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -1 }}>
                        Projects
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Manage all construction projects — ongoing, upcoming, and completed.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link}
                    href={route('admin.projects.create')}
                    sx={{ borderRadius: 1, px: 3, py: 1.2, fontWeight: 700, boxShadow: '0 8px 16px -4px rgba(99,102,241,0.35)' }}
                >
                    Add Project
                </Button>
            </Box>

            {/* Filters */}
            <Card sx={{ borderRadius: 1, mb: 3, p: 2.5 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                    <TextField
                        size="small"
                        placeholder="Search projects..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && applyFilter({ search })}
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
                        sx={{ minWidth: 240 }}
                    />
                    <TextField
                        select size="small" label="Status" value={status}
                        onChange={e => { setStatus(e.target.value); applyFilter({ status: e.target.value }); }}
                        sx={{ minWidth: 150 }}
                    >
                        <MenuItem value="">All Status</MenuItem>
                        <MenuItem value="ongoing">Ongoing</MenuItem>
                        <MenuItem value="upcoming">Upcoming</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                    </TextField>
                    <TextField
                        select size="small" label="Project Category" value={packageId}
                        onChange={e => { setPackageId(e.target.value); applyFilter({ service_package_id: e.target.value }); }}
                        sx={{ minWidth: 160 }}
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        {servicePackages.map(p => <MenuItem key={p.id} value={p.id}>{p.title}</MenuItem>)}
                    </TextField>
                    <TextField
                        select size="small" label="Style / Type" value={typeId}
                        onChange={e => { setTypeId(e.target.value); applyFilter({ project_type_id: e.target.value }); }}
                        sx={{ minWidth: 160 }}
                    >
                        <MenuItem value="">All Styles</MenuItem>
                        {projectTypes.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
                    </TextField>
                    <Button
                        variant="outlined" size="small"
                        onClick={() => { setSearch(''); setStatus(''); setTypeId(''); setPackageId(''); applyFilter({ search: '', status: '', project_type_id: '', service_package_id: '' }); }}
                        sx={{ borderRadius: 0.75, minWidth: 80 }}
                    >
                        Clear
                    </Button>
                </Stack>
            </Card>

            {/* Table */}
            <Card sx={{ borderRadius: 1.5 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ '& th': { fontWeight: 700, bgcolor: 'action.hover' } }}>
                                <TableCell>Project</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Style</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Flags</TableCell>
                                <TableCell align="center">Visible</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.data.map((project) => {
                                const st = statusColors[project.status] ?? statusColors.upcoming;
                                return (
                                    <TableRow key={project.id} hover>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Avatar
                                                    src={project.primary_image ? `/storage/${project.primary_image.file_path}` : null}
                                                    variant="rounded"
                                                    sx={{ width: 44, height: 44, bgcolor: 'primary.main', borderRadius: 0.75 }}
                                                >
                                                    <ConstructionIcon fontSize="small" />
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{project.project_name}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{project.slug}</Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{project.service_package?.title ?? '—'}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{project.project_type?.name ?? '—'}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{project.project_location}</Typography>
                                            <Typography variant="caption" color="text.secondary">{project.district?.name}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={st.label}
                                                size="small"
                                                sx={{ fontWeight: 700, color: st.color, bgcolor: st.bg, borderRadius: 0.5, border: 'none' }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Stack direction="row" spacing={0.5} justifyContent="center">
                                                {project.is_featured && <Tooltip title="Featured"><StarIcon sx={{ color: '#f59e0b', fontSize: 18 }} /></Tooltip>}
                                                {project.is_completed && <Tooltip title="Completed"><CheckCircleIcon sx={{ color: '#10b981', fontSize: 18 }} /></Tooltip>}
                                                {project.is_working && <Tooltip title="Working"><BuildIcon sx={{ color: '#6366f1', fontSize: 18 }} /></Tooltip>}
                                                {!project.is_featured && !project.is_completed && !project.is_working && (
                                                    <Typography variant="caption" color="text.secondary">—</Typography>
                                                )}
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={project.is_active ? 'Click to hide' : 'Click to show'}>
                                                <Switch
                                                    checked={project.is_active}
                                                    onChange={() => handleToggleActive(project.id)}
                                                    size="small"
                                                    color="success"
                                                />
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                                <Tooltip title="View">
                                                    <IconButton component={Link} href={route('admin.projects.show', project.id)} size="small" color="info">
                                                        <ViewIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit">
                                                    <IconButton component={Link} href={route('admin.projects.edit', project.id)} size="small" color="primary">
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton onClick={() => handleDelete(project.id)} size="small" color="error">
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {projects.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                            <ConstructionIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
                                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}>No projects found.</Typography>
                                            <Button variant="contained" startIcon={<AddIcon />} component={Link} href={route('admin.projects.create')} sx={{ borderRadius: 1 }}>
                                                Add First Project
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                {projects.last_page > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="body2" color="text.secondary">
                            Showing {projects.from}–{projects.to} of {projects.total} projects
                        </Typography>
                        <Pagination
                            count={projects.last_page}
                            page={projects.current_page}
                            onChange={(_, page) => router.get(route('admin.projects.index'), { ...filters, page }, { preserveState: true })}
                            shape="rounded"
                            size="small"
                        />
                    </Box>
                )}
            </Card>
        </AdminLayout>
    );
}
