import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { 
    Box, 
    Button, 
    Checkbox, 
    Container, 
    FormControlLabel, 
    TextField, 
    Typography, 
    Paper,
    Avatar,
    Alert
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login.submit'));
    };

    return (
        <Box 
            sx={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: '#f5f5f5' 
            }}
        >
            <Head title="Admin Login" />
            <Container component="main" maxWidth="xs">
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: 4, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        borderRadius: 0.75
                    }}
                >
                    <Box component="img" src="/BGC.jpeg" alt="Bhaigya Construction" sx={{ height: 60, width: 'auto', borderRadius: 1, mb: 1, mt: 1 }} />
                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                        Admin Portal
                    </Typography>

                    <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    value="remember" 
                                    color="primary" 
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                            }
                            label="Remember me"
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={processing}
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                        >
                            {processing ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </Box>
                </Paper>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                    {'Copyright © '}
                    Bhaigya Construction {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>
    );
}
