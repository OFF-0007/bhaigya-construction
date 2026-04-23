import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Box, Typography } from '@mui/material';
import ProjectForm from './ProjectForm';

export default function Edit({ project, projectTypes, districts, amenities, imageTypes, serviceCategories, servicePackages, initialTab = 0 }) {
    const { data, setData, processing, errors, setError, clearErrors } = useForm({
        project_name: project.project_name ?? '',
        project_type_id: project.project_type_id ?? '',
        service_category_id: project.service_category_id ?? '',
        service_package_id: project.service_package_id ?? '',
        description: project.description ?? '',
        project_location: project.project_location ?? '',
        district_id: project.district_id ?? '',
        address: project.address ?? '',
        latitude: project.latitude ?? '',
        longitude: project.longitude ?? '',
        project_start_date: project.project_start_date ?? '',
        project_completion_date: project.project_completion_date ?? '',
        number_of_rooms: project.number_of_rooms ?? '',
        number_of_floors: project.number_of_floors ?? '',
        number_of_washrooms: project.number_of_washrooms ?? '',
        total_area: project.total_area ?? '',
        carpet_area: project.carpet_area ?? '',
        area_unit: project.area_unit ?? 'sqft',
        status: project.status ?? 'upcoming',
        is_active: project.is_active ?? true,
        is_featured: project.is_featured ?? false,
        is_completed: project.is_completed ?? false,
        is_working: project.is_working ?? false,
        // Pre-populate amenity IDs from existing relation
        amenity_ids: project.amenities?.map(a => a.id) ?? [],
        owners: JSON.stringify(project.owners ?? []),
        progress: JSON.stringify(project.progress ?? []),
        videos: JSON.stringify(project.videos ?? []),
        images: [],
        image_types: [],
        image_alt_texts: [],
        document_names: '[]',
        document_types: '[]',
        deleted_image_ids: '[]',
        deleted_doc_ids: '[]',
        primary_image_id: project.images?.find(i => i.is_primary)?.id ?? null,
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

        const fd = new FormData();
        fd.append('_method', 'PUT');

        const scalarFields = [
            'project_name', 'project_type_id', 'service_category_id', 'service_package_id',
            'description', 'project_location', 'district_id', 'address',
            'latitude', 'longitude', 'project_start_date', 'project_completion_date',
            'number_of_rooms', 'number_of_floors', 'number_of_washrooms',
            'total_area', 'carpet_area', 'area_unit', 'status',
        ];
        scalarFields.forEach(f => fd.append(f, data[f] ?? ''));

        fd.append('is_active', data.is_active ? '1' : '0');
        fd.append('is_featured', data.is_featured ? '1' : '0');
        fd.append('is_completed', data.is_completed ? '1' : '0');
        fd.append('is_working', data.is_working ? '1' : '0');

        fd.append('amenity_ids', JSON.stringify(data.amenity_ids ?? []));
        fd.append('owners', data.owners);
        fd.append('progress', data.progress);
        fd.append('videos', data.videos);
        fd.append('document_names', data.document_names);
        fd.append('document_types', data.document_types);
        fd.append('image_types', JSON.stringify(data.image_types ?? []));
        fd.append('image_alt_texts', JSON.stringify(data.image_alt_texts ?? []));
        fd.append('existing_image_meta', data.existing_image_meta ?? '{}');
        fd.append('deleted_image_ids', data.deleted_image_ids ?? '[]');
        fd.append('deleted_doc_ids', data.deleted_doc_ids ?? '[]');

        if (data.primary_image_id) {
            fd.append('primary_image_id', data.primary_image_id);
        }

        (data.images ?? []).forEach(file => fd.append('images[]', file));

        // Use router.post for manual FormData submission with method spoofing
        router.post(route('admin.projects.update', project.id), fd, {
            forceFormData: true,
            onStart: () => {},
            onFinish: () => {},
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit — ${project.project_name}`} />

            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -1 }}>
                    Edit Project
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Editing: <strong>{project.project_name}</strong>
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
                isEdit={true}
                initialTab={initialTab}
                existingImages={project.images ?? []}
                existingDocuments={project.documents ?? []}
                existingOwners={project.owners ?? []}
                existingProgress={project.progress ?? []}
                existingVideos={project.videos ?? []}
            />
        </AdminLayout>
    );
}
