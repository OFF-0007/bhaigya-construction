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
    Divider,
} from "@mui/material";
import {
    ArrowBack as BackIcon,
    Save as SaveIcon,
    Download as DownloadIcon,
} from "@mui/icons-material";

export default function Edit({ agreement, agreementTypes, servicePackages }) {
    const { data, setData, post, processing, errors } = useForm({
        agreement_type_id: agreement.agreement_type_id || "",
        service_package_id: agreement.service_package_id || "",
        document: null,
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.agreements.update", agreement.id), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit Service Agreement" />

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
                        Edit Agreement
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
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                                            Agreement Document
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            Current: <Link href={`/storage/${agreement.document_uploaded}`} target="_blank" sx={{ fontWeight: 600 }}>View Current Document</Link>
                                        </Typography>
                                    </Box>
                                    <Button
                                        size="small"
                                        component="a"
                                        href={`/storage/${agreement.document_uploaded}`}
                                        target="_blank"
                                        startIcon={<DownloadIcon />}
                                        variant="outlined"
                                    >
                                        View
                                    </Button>
                                </Box>
                                
                                <Divider sx={{ my: 2 }} />

                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                                    Upload New Document
                                </Typography>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                                    Leave blank to keep current. Supported formats: PDF, Word, JPG, PNG (Max 10MB)
                                </Typography>
                                <input
                                    type="file"
                                    onChange={(e) => setData("document", e.target.files[0])}
                                    style={{ width: "100%" }}
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
                                    startIcon={<SaveIcon />}
                                    size="large"
                                    sx={{ fontWeight: 700, px: 4 }}
                                >
                                    {processing ? "Saving..." : "Update Agreement"}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </form>
        </AdminLayout>
    );
}
