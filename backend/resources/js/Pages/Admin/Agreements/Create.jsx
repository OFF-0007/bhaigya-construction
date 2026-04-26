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
    Grid,
} from "@mui/material";
import {
    ArrowBack as BackIcon,
    CloudUpload as UploadIcon,
} from "@mui/icons-material";

export default function Create({ agreementTypes, servicePackages, selectedPackageId }) {
    const { data, setData, post, processing, errors } = useForm({
        agreement_type_id: "",
        service_package_id: selectedPackageId || "",
        document: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.agreements.store"), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Upload Service Agreement" />

            <Box sx={{ mb: 5, display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                    component={Link}
                    href={route("admin.agreements.index")}
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
                        Upload Agreement
                    </Typography>
                </Box>
            </Box>

            <form onSubmit={handleSubmit}>
                <Card sx={{ p: 4, borderRadius: 1.5, maxWidth: 800, mx: "auto" }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                Agreement Details
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Provide the package, type, and upload the document file.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
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
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                label="Agreement Type"
                                fullWidth
                                value={data.agreement_type_id}
                                onChange={(e) => setData("agreement_type_id", e.target.value)}
                                error={!!errors.agreement_type_id}
                                helperText={errors.agreement_type_id}
                                required
                            >
                                {agreementTypes.map((type) => (
                                    <MenuItem key={type.id} value={type.id}>
                                        {type.type_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ p: 3, border: '1px dashed', borderColor: 'divider', borderRadius: 1.5, bgcolor: 'grey.50' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                                    Document File
                                </Typography>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                                    Supported formats: PDF, Word, JPG, PNG (Max 10MB)
                                </Typography>
                                <input
                                    type="file"
                                    onChange={(e) => setData("document", e.target.files[0])}
                                    style={{ width: "100%" }}
                                    required
                                />
                                {errors.document && (
                                    <Typography variant="caption" color="error" display="block" sx={{ mt: 1 }}>
                                        {errors.document}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button
                                    component={Link}
                                    href={route("admin.agreements.index")}
                                    color="inherit"
                                    sx={{ fontWeight: 700 }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={processing}
                                    startIcon={<UploadIcon />}
                                    size="large"
                                    sx={{ fontWeight: 700, px: 4 }}
                                >
                                    {processing ? "Uploading..." : "Upload Agreement"}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </form>
        </AdminLayout>
    );
}
