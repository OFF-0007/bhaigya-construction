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
} from "@mui/material";
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Image as ImageIcon,
} from "@mui/icons-material";

export default function Index({ materials }) {
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
                    component={Link}
                    href={route("admin.package-materials.create")}
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ borderRadius: 1, px: 3, py: 1 }}
                >
                    Add Materials
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
                                                component={Link}
                                                href={route("admin.package-materials.edit", material.id)}
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
        </AdminLayout>
    );
}
