import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ColorModeContext = createContext({ toggleColorMode: () => {}, mode: 'light', setMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export function ColorModeProvider({ children }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState(localStorage.getItem('theme-mode') || 'system');

    useEffect(() => {
        localStorage.setItem('theme-mode', mode);
    }, [mode]);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    if (prevMode === 'light') return 'dark';
                    if (prevMode === 'dark') return 'system';
                    return 'light';
                });
            },
            mode,
            setMode
        }),
        [mode],
    );

    const activeMode = useMemo(() => {
        if (mode === 'system') {
            return prefersDarkMode ? 'dark' : 'light';
        }
        return mode;
    }, [mode, prefersDarkMode]);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: activeMode,
                    primary: {
                        main: '#6366f1', // Modern Indigo
                        light: '#818cf8',
                        dark: '#4f46e5',
                    },
                    secondary: {
                        main: '#10b981', // Emerald
                    },
                    background: {
                        default: activeMode === 'dark' ? '#0f172a' : '#f8fafc',
                        paper: activeMode === 'dark' ? '#1e293b' : '#ffffff',
                    },
                    text: {
                        primary: activeMode === 'dark' ? '#f1f5f9' : '#1e293b',
                        secondary: activeMode === 'dark' ? '#94a3b8' : '#64748b',
                    },
                    divider: activeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                },
                typography: {
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    h1: { fontWeight: 800 },
                    h2: { fontWeight: 800 },
                    h3: { fontWeight: 700 },
                    h4: { fontWeight: 700 },
                    h5: { fontWeight: 600 },
                    h6: { fontWeight: 600 },
                    subtitle1: { fontWeight: 500 },
                    subtitle2: { fontWeight: 500 },
                    button: { textTransform: 'none', fontWeight: 600 },
                },
                shape: {
                    borderRadius: 12,
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                },
                            },
                        },
                    },
                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                backgroundImage: 'none',
                            },
                        },
                    },
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                boxShadow: activeMode === 'dark' ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                                border: '1px solid',
                                borderColor: activeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                            },
                        },
                    },
                },
            }),
        [activeMode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
