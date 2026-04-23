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
    Paper,
    Link,
} from "@mui/material";
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Description as FileIcon,
    Download as DownloadIcon,
} from "@mui/icons-material";

export default function Index({ agreements, agreementTypes, servicePackages }) {
    const [open, setOpen] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        agreement_type_id: "",
        service_package_id: "",
        document: null,
    });

    const handleOpen = () => {
        reset();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
        clearErrors();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.agreements.store"), {
            onSuccess: () => handleClose(),
        });
    };

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
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
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

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{ sx: { borderRadius: 1 } }}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle sx={{ fontWeight: 700 }}>
                        Upload New Agreement
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

                            <Box>
                                <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                                    Upload Document (PDF, Word, or Image)
                                </Typography>
                                <input
                                    type="file"
                                    onChange={(e) => setData("document", e.target.files[0])}
                                    style={{ width: "100%" }}
                                    required
                                />
                                {errors.document && (
                                    <Typography variant="caption" color="error" display="block">
                                        {errors.document}
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
                            Upload
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </AdminLayout>
    );
}
