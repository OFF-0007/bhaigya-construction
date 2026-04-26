import React, { useState } from "react";
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
    Divider,
    Paper,
    IconButton,
} from "@mui/material";
import {
    ArrowBack as BackIcon,
    Save as SaveIcon,
    Image as ImageIcon,
    CloudUpload as UploadIcon,
    Close as CloseIcon,
} from "@mui/icons-material";

export default function Edit({ image, imageTypes }) {
    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        image_type_id: image.image_type_id || "",
        image_name: image.image_name || "",
        description: image.description || "",
        upload_image: null,
        is_active: !!image.is_active,
        _method: "PUT",
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("upload_image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const clearImage = () => {
        setData("upload_image", null);
        setPreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.gallery.update", image.id), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit Gallery Image" />

            <Box sx={{ mb: 5, display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                    component={Link}
                    href={route("admin.gallery.index")}
                    startIcon={<BackIcon />}
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 1.5 }}
                >
                    Back
                </Button>
                <Box>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 800, letterSpacing: -1 }}
                    >
                        Edit Gallery Image
                    </Typography>
                </Box>
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={4} sx={{ maxWidth: 1200, mx: "auto" }}>
                    <Grid item xs={12} md={8}>
                        <Card sx={{ p: 4, borderRadius: 2, height: "100%" }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                Image Details
                            </Typography>
                            
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Image Name"
                                        fullWidth
                                        placeholder="Enter a descriptive name"
                                        value={data.image_name}
                                        onChange={(e) => setData("image_name", e.target.value)}
                                        error={!!errors.image_name}
                                        helperText={errors.image_name}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        placeholder="Enter image description (optional)"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        error={!!errors.description}
                                        helperText={errors.description}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Image Type"
                                        fullWidth
                                        value={data.image_type_id}
                                        onChange={(e) => setData("image_type_id", e.target.value)}
                                        error={!!errors.image_type_id}
                                        helperText={errors.image_type_id}
                                        required
                                    >
                                        <MenuItem value="" disabled>
                                            <em>Select a category</em>
                                        </MenuItem>
                                        {imageTypes.map((type) => (
                                            <MenuItem key={type.id} value={type.id}>
                                                {type.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box sx={{ 
                                        mt: 1, 
                                        p: 2, 
                                        borderRadius: 1.5, 
                                        bgcolor: 'action.hover',
                                        border: '1px solid',
                                        borderColor: 'divider'
                                    }}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={data.is_active}
                                                    onChange={(e) => setData("is_active", e.target.checked)}
                                                    color="primary"
                                                />
                                            }
                                            label={
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                        Active Status
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Visible to the public in the gallery
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 5, pt: 2, display: 'flex', gap: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={processing}
                                    startIcon={<SaveIcon />}
                                    size="large"
                                    sx={{ 
                                        fontWeight: 700, 
                                        px: 4, 
                                        borderRadius: 1.5,
                                        boxShadow: '0 8px 16px -4px rgba(0, 105, 92, 0.3)'
                                    }}
                                >
                                    {processing ? "Updating..." : "Update Image"}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 4, borderRadius: 2, height: "100%", display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                Gallery Media
                            </Typography>
                            
                            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ position: 'relative', flexGrow: 1, borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider', mb: 3, minHeight: 250 }}>
                                    <Box
                                        component="img"
                                        src={preview || `/storage/${image.upload_image}`}
                                        sx={{ width: '100%', height: '100%', objectFit: 'contain', bgcolor: '#f5f5f5' }}
                                    />
                                    {preview && (
                                        <IconButton
                                            sx={{ 
                                                position: 'absolute', 
                                                top: 10, 
                                                right: 10, 
                                                bgcolor: 'rgba(0,0,0,0.5)', 
                                                color: 'white',
                                                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                                            }}
                                            size="small"
                                            onClick={clearImage}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </Box>

                                <Divider sx={{ mb: 3 }} />

                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        borderStyle: 'dashed',
                                        borderWidth: 2,
                                        borderColor: errors.upload_image ? 'error.main' : 'divider',
                                        borderRadius: 2,
                                        bgcolor: 'grey.50',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            bgcolor: 'grey.100',
                                            borderColor: 'primary.main',
                                        }
                                    }}
                                    component="label"
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleImageChange}
                                    />
                                    <UploadIcon sx={{ color: 'primary.main', mb: 1 }} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                        {preview ? "Change selected image" : "Replace current image"}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                        Leave blank to keep current image
                                    </Typography>
                                </Paper>
                                
                                {errors.upload_image && (
                                    <Typography variant="caption" color="error" sx={{ mt: 1.5, fontWeight: 600, display: 'block' }}>
                                        {errors.upload_image}
                                    </Typography>
                                )}
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </AdminLayout>
    );
}
