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
    Paper,
    IconButton,
    Grid,
} from "@mui/material";
import {
    Add as AddIcon,
    ArrowBack as BackIcon,
    RemoveCircleOutline as RemoveIcon,
} from "@mui/icons-material";

export default function Create({ servicePackages, selectedPackageId }) {
    const { data, setData, post, processing, errors } = useForm({
        service_package_id: selectedPackageId || "",
        materials: [
            {
                material_name: "",
                material_image: null,
                description: "",
                is_available: true,
            },
        ],
    });

    const addMaterialRow = () => {
        setData("materials", [
            ...data.materials,
            {
                material_name: "",
                material_image: null,
                description: "",
                is_available: true,
            },
        ]);
    };

    const removeMaterialRow = (index) => {
        const newMaterials = [...data.materials];
        newMaterials.splice(index, 1);
        setData("materials", newMaterials);
    };

    const handleMaterialChange = (index, field, value) => {
        const newMaterials = [...data.materials];
        newMaterials[index][field] = value;
        setData("materials", newMaterials);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.package-materials.store"), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Add Package Materials" />

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
                        Add New Materials
                    </Typography>
                </Box>
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 3, borderRadius: 1.5, position: 'sticky', top: 24 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                                General Information
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Select the service package these materials belong to.
                            </Typography>
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

                            <Box sx={{ mt: 4 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={processing}
                                    size="large"
                                    sx={{ fontWeight: 700, borderRadius: 1.5 }}
                                >
                                    {processing ? "Saving..." : "Save All Materials"}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            {data.materials.map((material, index) => (
                                <Paper
                                    key={index}
                                    elevation={0}
                                    variant="outlined"
                                    sx={{ p: 3, position: "relative", borderRadius: 1.5, bgcolor: "background.paper" }}
                                >
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main" }}>
                                            Material #{index + 1}
                                        </Typography>
                                        {data.materials.length > 1 && (
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => removeMaterialRow(index)}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                        )}
                                    </Box>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Material Name"
                                                fullWidth
                                                value={material.material_name}
                                                onChange={(e) => handleMaterialChange(index, "material_name", e.target.value)}
                                                error={!!errors[`materials.${index}.material_name`]}
                                                helperText={errors[`materials.${index}.material_name`]}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Description"
                                                fullWidth
                                                multiline
                                                rows={2}
                                                value={material.description}
                                                onChange={(e) => handleMaterialChange(index, "description", e.target.value)}
                                                error={!!errors[`materials.${index}.description`]}
                                                helperText={errors[`materials.${index}.description`]}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                                                Material Image
                                            </Typography>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleMaterialChange(index, "material_image", e.target.files[0])}
                                                style={{ width: "100%" }}
                                            />
                                            {errors[`materials.${index}.material_image`] && (
                                                <Typography variant="caption" color="error" display="block">
                                                    {errors[`materials.${index}.material_image`]}
                                                </Typography>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={material.is_available}
                                                        onChange={(e) => handleMaterialChange(index, "is_available", e.target.checked)}
                                                    />
                                                }
                                                label="Available"
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}

                            <Button
                                startIcon={<AddIcon />}
                                onClick={addMaterialRow}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    py: 2,
                                    borderStyle: "dashed",
                                    borderRadius: 1.5,
                                    fontWeight: 700,
                                }}
                            >
                                Add Another Material
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </AdminLayout>
    );
}
