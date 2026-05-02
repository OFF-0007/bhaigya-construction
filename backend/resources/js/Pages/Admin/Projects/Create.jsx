import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Box, Typography } from '@mui/material';
import { Construction as ConstructionIcon } from '@mui/icons-material';
import ProjectForm from './ProjectForm';

export default function Create({ projectTypes, districts, amenities, imageTypes, serviceCategories, servicePackages }) {
    const { data, setData, processing, errors, setError, clearErrors } = useForm({
        project_name: '',
        project_type_id: '',
        service_category_id: '',
        service_package_id: '',
        description: '',
        project_location: '',
        district_id: '',
        address: '',
        latitude: '',
        longitude: '',
        project_start_date: '',
        project_completion_date: '',
        number_of_rooms: '',
        number_of_floors: '',
        number_of_washrooms: '',
        total_area: '',
        carpet_area: '',
        area_unit: 'sqft',
        status: 'upcoming',
        is_active: true,
        is_featured: false,
        is_completed: false,
        is_working: false,
        // Nested (JSON-serialized before submit)
        amenity_ids: [],
        owners: '[]',
        progress: '[]',
        videos: '[]',
        // Image meta arrays
        images: [],
        image_types: [],
        image_alt_texts: [],
        // Document meta arrays
        document_names: '[]',
        document_types: '[]',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();

        // Client-side validation
        let hasErrors = false;

        if (!data.project_name) { setError('project_name', 'Project name is required'); hasErrors = true; }
        if (!data.service_package_id) { setError('service_package_id', 'Service package is required'); hasErrors = true; }
        if (!data.description) { setError('description', 'Description is required'); hasErrors = true; }
        if (!data.project_location) { setError('project_location', 'Location is required'); hasErrors = true; }
        if (!data.district_id) { setError('district_id', 'District is required'); hasErrors = true; }
        if (!data.address) { setError('address', 'Address is required'); hasErrors = true; }
        if (!data.status) { setError('status', 'Status is required'); hasErrors = true; }

        if (data.latitude && (data.latitude < -90 || data.latitude > 90)) {
            setError('latitude', 'Latitude must be between -90 and 90');
            hasErrors = true;
        }
        if (data.longitude && (data.longitude < -180 || data.longitude > 180)) {
            setError('longitude', 'Longitude must be between -180 and 180');
            hasErrors = true;
        }

        // Owners
        const ownersArr = JSON.parse(data.owners || '[]');
        ownersArr.forEach((owner, i) => {
            if (!owner.name) { setError(`owners.${i}.name`, 'Name is required'); hasErrors = true; }
        });

        // Progress
        const progressArr = JSON.parse(data.progress || '[]');
        progressArr.forEach((prog, i) => {
            if (!prog.title) { setError(`progress.${i}.title`, 'Title is required'); hasErrors = true; }
            if (!prog.progress_date) { setError(`progress.${i}.progress_date`, 'Date is required'); hasErrors = true; }
        });

        // Videos
        const videosArr = JSON.parse(data.videos || '[]');
        videosArr.forEach((vid, i) => {
            if (!vid.video_url) { setError(`videos.${i}.video_url`, 'URL is required'); hasErrors = true; }
            if (!vid.platform) { setError(`videos.${i}.platform`, 'Platform is required'); hasErrors = true; }
        });

        if (hasErrors) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Build a FormData manually to support file uploads + JSON fields
        const fd = new FormData();

        // Scalar fields
        const scalarFields = [
            'project_name', 'project_type_id', 'service_category_id', 'service_package_id',
            'description', 'project_location', 'district_id', 'address',
            'latitude', 'longitude', 'project_start_date', 'project_completion_date',
            'number_of_rooms', 'number_of_floors', 'number_of_washrooms',
            'total_area', 'carpet_area', 'area_unit', 'status',
        ];
        scalarFields.forEach(f => fd.append(f, data[f] ?? ''));

        // Booleans
        fd.append('is_active', data.is_active ? '1' : '0');
        fd.append('is_featured', data.is_featured ? '1' : '0');
        fd.append('is_completed', data.is_completed ? '1' : '0');
        fd.append('is_working', data.is_working ? '1' : '0');

        // Amenities
        fd.append('amenity_ids', JSON.stringify(data.amenity_ids ?? []));

        // JSON blobs
        fd.append('owners', data.owners);
        fd.append('progress', data.progress);
        fd.append('videos', data.videos);
        fd.append('document_names', data.document_names);
        fd.append('document_types', data.document_types);

        // Image meta
        fd.append('image_types', JSON.stringify(data.image_types ?? []));
        fd.append('image_alt_texts', JSON.stringify(data.image_alt_texts ?? []));

        // File arrays
        (data.images ?? []).forEach(file => fd.append('images[]', file));

        router.post(route('admin.projects.store'), fd, {
            forceFormData: true,
            onSuccess: () => {},
        });
    };

    return (
        <AdminLayout>
            <Head title="Create Project" />

            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -1 }}>
                    Create New Project
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Fill in all the details across the tabs below. You can save and edit anytime.
                </Typography>
            </Box>

            <ProjectForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                projectTypes={projectTypes}
                districts={districts}
                amenities={amenities}
                imageTypes={imageTypes}
                serviceCategories={serviceCategories}
                servicePackages={servicePackages}
                onSubmit={handleSubmit}
                isEdit={false}
            />
        </AdminLayout>
    );
}
