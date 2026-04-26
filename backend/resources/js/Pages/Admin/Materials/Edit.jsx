import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import {
    Box,
    Typography,
    Button,
    Card,
    TextField,
    MenuItem,
    FormControlLabel,
    Switch,
    Grid,
    Avatar,
} from "@mui/material";
import {
    ArrowBack as BackIcon,
    Image as ImageIcon,
} from "@mui/icons-material";

export default function Edit({ material, servicePackages }) {
    const { data, setData, post, processing, errors } = useForm({
        service_package_id: material.service_package_id || "",
        material_name: material.material_name || "",
        material_image: null,
        description: material.description || "",
        is_available: !!material.is_available,
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.package-materials.update", material.id), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit Package Material" />

            <Box sx={{ mb: 5, display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                    component={Link}
                    href={route("admin.package-materials.index")}
                    startIcon={<BackIcon />}
                    variant="outlined"
                    size="small"
                >
                    Back
                </Button>
                <Box>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 800, letterSpacing: -1 }}
                    >
                        Edit Material
                    </Typography>
                </Box>
            </Box>

            <form onSubmit={handleSubmit}>
                <Card sx={{ p: 4, borderRadius: 1.5 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                                    rows={4}
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
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Material Image
                                </Typography>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 2, border: '1px dashed', borderColor: 'divider', borderRadius: 1.5 }}>
                                    <Avatar
                                        src={material.material_image ? `/storage/${material.material_image}` : null}
                                        variant="rounded"
                                        sx={{ width: 100, height: 100, bgcolor: "primary.light" }}
                                    >
                                        <ImageIcon sx={{ fontSize: 40 }} />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Current Image
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                            {material.material_image ? 'Image is uploaded' : 'No image uploaded'}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                                        Upload New Image (Leave blank to keep current)
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
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button
                                    component={Link}
                                    href={route("admin.package-materials.index")}
                                    color="inherit"
                                    sx={{ fontWeight: 700 }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={processing}
                                    size="large"
                                    sx={{ fontWeight: 700, px: 4 }}
                                >
                                    {processing ? "Updating..." : "Update Material"}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </form>
        </AdminLayout>
    );
}
