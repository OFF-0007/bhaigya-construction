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
} from "@mui/material";
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Download as DownloadIcon,
} from "@mui/icons-material";

export default function Index({ agreements }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this agreement?")) {
            router.delete(route("admin.agreements.destroy", id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Service Agreements" />

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
                        Service Agreements
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                    >
                        Manage agreements (Labour, Client, Branch) for different service packages.
                    </Typography>
                </Box>
                <Button
                    component={Link}
                    href={route("admin.agreements.create")}
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ borderRadius: 1, px: 3, py: 1 }}
                >
                    Upload Agreement
                </Button>
            </Box>

            <Card sx={{ borderRadius: 1.5 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Package</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Document</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {agreements.data.map((agreement, index) => (
                                <TableRow key={agreement.id} hover>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>
                                        {agreement.service_package?.title}
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                px: 1,
                                                py: 0.5,
                                                borderRadius: 1,
                                                bgcolor: "primary.light",
                                                color: "primary.contrastText",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {agreement.agreement_type?.type_name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            component="a"
                                            href={`/storage/${agreement.document_uploaded}`}
                                            target="_blank"
                                            startIcon={<DownloadIcon />}
                                        >
                                            View Doc
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton
                                                component={Link}
                                                href={route("admin.agreements.edit", agreement.id)}
                                                color="primary"
                                                size="small"
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                onClick={() => handleDelete(agreement.id)}
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {agreements.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                        No agreements found.
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
