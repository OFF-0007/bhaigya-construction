import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, router } from "@inertiajs/react";
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
    MenuItem,
    Avatar,
    FormControlLabel,
    Switch,
} from "@mui/material";
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Image as ImageIcon,
} from "@mui/icons-material";

export default function Index({ materials, servicePackages }) {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
        transform,
    } = useForm({
        service_package_id: "",
        material_name: "",
        material_image: null,
        description: "",
        is_available: true,
    });

    const handleOpen = (material = null) => {
        if (material) {
            setEditMode(true);
            setCurrentId(material.id);
            setData({
                service_package_id: material.service_package_id,
                material_name: material.material_name,
                material_image: null,
                description: material.description || "",
                is_available: !!material.is_available,
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
                _method: "PUT",
            }));
            post(route("admin.package-materials.update", currentId), {
                forceFormData: true,
                onSuccess: () => handleClose(),
            });
        } else {
            post(route("admin.package-materials.store"), {
                forceFormData: true,
                onSuccess: () => handleClose(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this material?")) {
            router.delete(route("admin.package-materials.destroy", id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Package Materials" />

            <Box
                sx={{
                    mb: 5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 800, letterSpacing: -1 }}
                    >
                        Package Materials
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                    >
                        Manage materials used across different service packages.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{ borderRadius: 1, px: 3, py: 1 }}
                >
                    Add Material
                </Button>
            </Box>

            <Card sx={{ borderRadius: 1.5 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Material Name</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Package</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {materials.data.map((material, index) => (
                                <TableRow key={material.id} hover>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Avatar
                                            src={material.material_image ? `/storage/${material.material_image}` : null}
                                            variant="rounded"
                                            sx={{ bgcolor: "primary.light" }}
                                        >
                                            <ImageIcon />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>
                                        {material.material_name}
                                    </TableCell>
                                    <TableCell>
                                        {material.service_package?.title}
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                px: 1,
                                                py: 0.5,
                                                borderRadius: 1,
                                                bgcolor: material.is_available ? "success.light" : "error.light",
                                                color: material.is_available ? "success.contrastText" : "error.contrastText",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {material.is_available ? "AVAILABLE" : "UNAVAILABLE"}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton
                                                onClick={() => handleOpen(material)}
                                                color="primary"
                                                size="small"
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                onClick={() => handleDelete(material.id)}
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {materials.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                        No materials found.
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
                PaperProps={{ sx: { borderRadius: 1 } }}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle sx={{ fontWeight: 700 }}>
                        {editMode ? "Edit Material" : "Add New Material"}
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                            <TextField
                                select
                                label="Service Package"
                                fullWidth
                                value={data.service_package_id}
                                onChange={(e) => setData("service_package_id", e.target.value)}
                                error={!!errors.service_package_id}
                                helperText={errors.service_package_id}
                                required
                            >
                                {servicePackages.map((pkg) => (
                                    <MenuItem key={pkg.id} value={pkg.id}>
                                        {pkg.title}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Material Name"
                                fullWidth
                                value={data.material_name}
                                onChange={(e) => setData("material_name", e.target.value)}
                                error={!!errors.material_name}
                                helperText={errors.material_name}
                                required
                            />

                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={3}
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                error={!!errors.description}
                                helperText={errors.description}
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={data.is_available}
                                        onChange={(e) => setData("is_available", e.target.checked)}
                                    />
                                }
                                label="Is Available"
                            />

                            <Box>
                                <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                                    Material Image {editMode && "(Leave blank to keep current)"}
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData("material_image", e.target.files[0])}
                                    style={{ width: "100%" }}
                                />
                                {errors.material_image && (
                                    <Typography variant="caption" color="error" display="block">
                                        {errors.material_image}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={handleClose} color="inherit" sx={{ fontWeight: 700 }}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={processing}
                            sx={{ fontWeight: 700, borderRadius: 0.75 }}
                        >
                            {editMode ? "Update" : "Save"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </AdminLayout>
    );
}
