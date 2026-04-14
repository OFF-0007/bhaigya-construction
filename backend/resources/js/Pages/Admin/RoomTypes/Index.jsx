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
    FormControlLabel,
    Switch,
    Avatar,
} from "@mui/material";
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Image as ImageIcon,
} from "@mui/icons-material";

export default function Index({ roomTypes }) {
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
        room_type_name: "",
        is_active: true,
        primary_image: null,
    });

    const handleOpen = (roomType = null) => {
        if (roomType) {
            setEditMode(true);
            setCurrentId(roomType.id);
            setData({
                room_type_name: roomType.room_type_name,
                is_active: !!roomType.is_active,
                primary_image: null,
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
            post(route("admin.room-types.update", currentId), {
                forceFormData: true,
                onSuccess: () => handleClose(),
            });
        } else {
            post(route("admin.room-types.store"), {
                onSuccess: () => handleClose(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this room type?")) {
            router.delete(route("admin.room-types.destroy", id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Room Types" />

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
                        Room Types
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                    >
                        Manage different types of rooms and their settings.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{ borderRadius: 3, px: 3, py: 1 }}
                >
                    Add Room Type
                </Button>
            </Box>

            <Card sx={{ borderRadius: 4 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>
                                    ID
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>
                                    Image
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>
                                    Room Type Name
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>
                                    Status
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 700 }}
                                    align="right"
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roomTypes.map((type, index) => (
                                <TableRow key={type.id} hover>
                                    <TableCell>{index + 1}</TableCell>{" "}
                                    <TableCell>
                                        <Avatar
                                            src={
                                                type.primary_image
                                                    ? `/storage/${type.primary_image}`
                                                    : null
                                            }
                                            variant="rounded"
                                            sx={{ bgcolor: "primary.light" }}
                                        >
                                            <ImageIcon />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>
                                        {type.room_type_name}
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                px: 1,
                                                py: 0.5,
                                                borderRadius: 1,
                                                bgcolor: type.is_active
                                                    ? "success.light"
                                                    : "error.light",
                                                color: type.is_active
                                                    ? "success.contrastText"
                                                    : "error.contrastText",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {type.is_active
                                                ? "ACTIVE"
                                                : "INACTIVE"}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton
                                                onClick={() => handleOpen(type)}
                                                color="primary"
                                                size="small"
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                onClick={() =>
                                                    handleDelete(type.id)
                                                }
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {roomTypes.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        align="center"
                                        sx={{ py: 3 }}
                                    >
                                        No room types found.
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
                maxWidth="xs"
                fullWidth
                PaperProps={{ sx: { borderRadius: 3 } }}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle sx={{ fontWeight: 700 }}>
                        {editMode ? "Edit Room Type" : "Add New Room Type"}
                    </DialogTitle>
                    <DialogContent>
                        <Box
                            sx={{
                                mt: 1,
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <TextField
                                label="Room Type Name"
                                fullWidth
                                value={data.room_type_name}
                                onChange={(e) =>
                                    setData("room_type_name", e.target.value)
                                }
                                error={!!errors.room_type_name}
                                helperText={errors.room_type_name}
                                required
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={data.is_active}
                                        onChange={(e) =>
                                            setData(
                                                "is_active",
                                                e.target.checked,
                                            )
                                        }
                                    />
                                }
                                label="Is Active"
                            />

                            <Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    gutterBottom
                                    display="block"
                                >
                                    Primary Image{" "}
                                    {editMode &&
                                        "(Leave blank to keep current)"}
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            "primary_image",
                                            e.target.files[0],
                                        )
                                    }
                                    style={{ width: "100%" }}
                                />
                                {errors.primary_image && (
                                    <Typography variant="caption" color="error">
                                        {errors.primary_image}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button
                            onClick={handleClose}
                            color="inherit"
                            sx={{ fontWeight: 700 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={processing}
                            sx={{ fontWeight: 700, borderRadius: 2 }}
                        >
                            {editMode ? "Update" : "Save"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </AdminLayout>
    );
}
