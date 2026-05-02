import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
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
    Tooltip,
    Avatar,
    Chip,
} from "@mui/material";
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Image as ImageIcon,
} from "@mui/icons-material";

export default function Index({ images }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to remove this image from gallery?")) {
            router.delete(route("admin.gallery.destroy", id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Image Gallery" />

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
                        Image Gallery
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                    >
                        Manage general images for the company gallery.
                    </Typography>
                </Box>
                <Button
                    component={Link}
                    href={route("admin.gallery.create")}
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ borderRadius: 1, px: 3, py: 1 }}
                >
                    Add Image
                </Button>
            </Box>

            <Card sx={{ borderRadius: 1.5 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Image Name</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {images.data.map((img, index) => (
                                <TableRow key={img.id} hover>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Avatar
                                            src={img.upload_image ? `/storage/${img.upload_image}` : null}
                                            variant="rounded"
                                            sx={{ bgcolor: "primary.light", width: 56, height: 56 }}
                                        >
                                            <ImageIcon />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>
                                        {img.image_name}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {img.description || "-"}
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={img.image_type?.name} 
                                            size="small" 
                                            sx={{ fontWeight: 700, borderRadius: 0.5 }} 
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={img.is_active ? "ACTIVE" : "INACTIVE"}
                                            size="small"
                                            color={img.is_active ? "success" : "error"}
                                            sx={{ fontWeight: 700, borderRadius: 0.5 }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton
                                                component={Link}
                                                href={route("admin.gallery.edit", img.id)}
                                                color="primary"
                                                size="small"
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                onClick={() => handleDelete(img.id)}
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {images.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                        No images found in gallery.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </AdminLayout>
    );
}
