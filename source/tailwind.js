tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'orbitron': ['Orbitron', 'sans-serif'],
                'rajdhani': ['Rajdhani', 'sans-serif'],
            },
            colors: {
                // Terran Colors - Expanded Palette
                'terran': {
                    'steel': '#4a5568',
                    'steel-light': '#718096',
                    'steel-dark': '#2d3748',
                    'blue': '#3182ce',
                    'blue-light': '#63b3ed',
                    'blue-dark': '#2b6cb0',
                    'orange': '#f6ad55',
                    'orange-light': '#fbd38d',
                    'orange-dark': '#ed8936',
                    'red': '#fc8181',
                    'red-light': '#fed7d7',
                    'red-dark': '#e53e3e',
                    'yellow': '#faf089',
                    'yellow-dark': '#d69e2e',
                    'gray': '#1a202c',
                    'gray-light': '#2d3748',
                    'gray-lighter': '#4a5568',
                },
                // Protoss Colors (kept for reference if needed)
                'protoss': {
                    'teal': '#00b5ad',
                    'gold': '#f6ad55',
                },
                // Zerg Colors (kept for reference if needed)
                'zerg': {
                    'purple': '#805ad5',
                    'green': '#51cf66',
                }
            },
            animation: {
                // Terran-specific animations
                'pulse-glow': 'pulse-glow 2s infinite',
                'scan-line': 'scan-line 2s linear infinite',
                'float': 'float 3s ease-in-out infinite',
                'blink': 'blink 1s infinite',
                'status-pulse': 'status-pulse 2s ease-in-out infinite',
                'ship-float': 'ship-float 5s ease-in-out infinite',
                'radar-sweep': 'radar-sweep 4s linear infinite',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { 
                        boxShadow: '0 0 10px rgba(49, 130, 206, 0.7)',
                        opacity: 1 
                    },
                    '50%': { 
                        boxShadow: '0 0 20px rgba(49, 130, 206, 0.9), 0 0 40px rgba(49, 130, 206, 0.5)',
                        opacity: 0.9 
                    },
                },
                'scan-line': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'blink': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.3 },
                },
                'status-pulse': {
                    '0%, 100%': { 
                        boxShadow: '0 0 5px #48bb78',
                        opacity: 1 
                    },
                    '50%': { 
                        boxShadow: '0 0 15px #48bb78, 0 0 30px #48bb78',
                        opacity: 0.8 
                    },
                },
                'ship-float': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '25%': { transform: 'translateY(-15px) rotate(1deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(0deg)' },
                    '75%': { transform: 'translateY(-15px) rotate(-1deg)' },
                },
                'radar-sweep': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
            backgroundImage: {
                // Terran background patterns
                'terran-metal': 'linear-gradient(135deg, #2d3748 0%, #1a202c 50%, #4a5568 100%)',
                'terran-panel': 'linear-gradient(135deg, rgba(26, 32, 44, 0.9) 0%, rgba(45, 55, 72, 0.9) 100%)',
                'terran-gradient': 'linear-gradient(135deg, #3182ce 0%, #2b6cb0 50%, #1a202c 100%)',
                'terran-orange-gradient': 'linear-gradient(135deg, #f6ad55 0%, #ed8936 50%, #2d3748 100%)',
                'terran-red-gradient': 'linear-gradient(135deg, #fc8181 0%, #e53e3e 50%, #2d3748 100%)',
                'terran-glass': 'linear-gradient(135deg, rgba(26, 32, 44, 0.8) 0%, rgba(45, 55, 72, 0.8) 100%)',
            },
            backdropBlur: {
                'xs': '2px',
            },
            boxShadow: {
                // Terran-specific shadows
                'terran-glow': '0 0 15px rgba(49, 130, 206, 0.7)',
                'terran-glow-lg': '0 0 30px rgba(49, 130, 206, 0.5)',
                'terran-orange-glow': '0 0 15px rgba(246, 173, 85, 0.7)',
                'terran-red-glow': '0 0 15px rgba(252, 129, 129, 0.7)',
                'terran-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)',
                'terran-outer': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
            },
            textShadow: {
                'terran': '0 0 10px rgba(49, 130, 206, 0.5)',
                'terran-lg': '0 0 20px rgba(49, 130, 206, 0.7)',
                'terran-orange': '0 0 10px rgba(246, 173, 85, 0.5)',
                'terran-red': '0 0 10px rgba(252, 129, 129, 0.5)',
            },
            borderWidth: {
                '3': '3px',
                '5': '5px',
            },
            transitionProperty: {
                'transform-shadow': 'transform, box-shadow',
            },
            scale: {
                '102': '1.02',
                '105': '1.05',
            },
            // Custom utilities for Terran styling
            utilities: {
                '.terran-panel': {
                    'background': 'linear-gradient(135deg, rgba(26, 32, 44, 0.9) 0%, rgba(45, 55, 72, 0.9) 100%)',
                    'border': '2px solid #3182ce',
                    'border-radius': '0.75rem',
                    'position': 'relative',
                    'overflow': 'hidden',
                },
                '.terran-panel::before': {
                    'content': "''",
                    'position': 'absolute',
                    'top': '0',
                    'left': '0',
                    'right': '0',
                    'height': '4px',
                    'background': 'linear-gradient(90deg, #3182ce, #63b3ed, #3182ce)',
                },
                '.status-dot': {
                    'width': '8px',
                    'height': '8px',
                    'border-radius': '50%',
                    'display': 'inline-block',
                    'animation': 'status-pulse 2s infinite',
                },
                '.status-online': {
                    'background-color': '#48bb78',
                },
                '.status-offline': {
                    'background-color': '#f56565',
                },
                '.btn-terran': {
                    'background': 'linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%)',
                    'border': '2px solid #63b3ed',
                    'color': 'white',
                    'font-family': 'Orbitron, sans-serif',
                    'font-weight': 'bold',
                    'text-transform': 'uppercase',
                    'letter-spacing': '1px',
                    'transition': 'all 0.3s ease',
                },
                '.btn-terran:hover': {
                    'background': 'linear-gradient(135deg, #2b6cb0 0%, #3182ce 100%)',
                    'transform': 'translateY(-2px)',
                    'box-shadow': '0 10px 20px rgba(49, 130, 206, 0.3)',
                },
                '.btn-terran-secondary': {
                    'background': 'transparent',
                    'border': '2px solid #4a5568',
                    'color': '#a0aec0',
                    'font-family': 'Orbitron, sans-serif',
                    'font-weight': 'bold',
                    'text-transform': 'uppercase',
                    'letter-spacing': '1px',
                    'transition': 'all 0.3s ease',
                },
                '.btn-terran-secondary:hover': {
                    'border-color': '#3182ce',
                    'color': '#63b3ed',
                },
                '.img-glow': {
                    'transition': 'all 0.3s ease',
                },
                '.img-glow:hover': {
                    'box-shadow': '0 0 30px rgba(49, 130, 206, 0.5)',
                },
                '.img-hover-zoom': {
                    'transition': 'transform 0.3s ease',
                },
                '.img-hover-zoom:hover': {
                    'transform': 'scale(1.05)',
                },
            }
        }
    },
    plugins: [
        function({ addUtilities, addComponents }) {
            // Add custom Terran utilities
            const newUtilities = {
                '.terran-scrollbar': {
                    'scrollbar-width': 'thin',
                    'scrollbar-color': '#3182ce #1a202c',
                },
                '.terran-scrollbar::-webkit-scrollbar': {
                    'width': '8px',
                },
                '.terran-scrollbar::-webkit-scrollbar-track': {
                    'background': '#1a202c',
                },
                '.terran-scrollbar::-webkit-scrollbar-thumb': {
                    'background-color': '#3182ce',
                    'border-radius': '4px',
                },
                '.terran-glass': {
                    'background': 'rgba(26, 32, 44, 0.8)',
                    'backdrop-filter': 'blur(10px)',
                    'border': '1px solid rgba(49, 130, 206, 0.2)',
                },
                '.terran-hud-line': {
                    'background': 'linear-gradient(90deg, transparent, #3182ce, transparent)',
                    'height': '1px',
                },
                '.terran-data-grid': {
                    'display': 'grid',
                    'gap': '1rem',
                },
                '.terran-grid-item': {
                    'background': 'rgba(26, 32, 44, 0.8)',
                    'border': '1px solid #4a5568',
                    'border-radius': '0.5rem',
                    'padding': '1rem',
                    'transition': 'all 0.3s ease',
                },
                '.terran-grid-item:hover': {
                    'border-color': '#3182ce',
                    'transform': 'translateY(-2px)',
                },
                '.scanning-line': {
                    'position': 'absolute',
                    'top': '0',
                    'left': '-100%',
                    'width': '100%',
                    'height': '2px',
                    'background': 'linear-gradient(90deg, transparent, #3182ce, transparent)',
                    'animation': 'scanning 2s linear infinite',
                },
            };
            
            addUtilities(newUtilities);
            
            // Add custom Terran components
            const components = {
                '.terran-card': {
                    'background': 'linear-gradient(135deg, rgba(26, 32, 44, 0.9) 0%, rgba(45, 55, 72, 0.9) 100%)',
                    'border': '2px solid #3182ce',
                    'border-radius': '1rem',
                    'position': 'relative',
                    'overflow': 'hidden',
                    'transition': 'all 0.3s ease',
                },
                '.terran-card::before': {
                    'content': "''",
                    'position': 'absolute',
                    'top': '0',
                    'left': '0',
                    'right': '0',
                    'height': '4px',
                    'background': 'linear-gradient(90deg, #3182ce, #63b3ed, #3182ce)',
                },
                '.terran-card:hover': {
                    'transform': 'translateY(-5px)',
                    'box-shadow': '0 20px 40px rgba(49, 130, 206, 0.2)',
                },
                '.terran-unit-display': {
                    'position': 'relative',
                    'overflow': 'hidden',
                    'border-radius': '0.75rem',
                    'border': '2px solid #4a5568',
                },
                '.terran-unit-display:hover': {
                    'border-color': '#3182ce',
                },
                '.terran-unit-overlay': {
                    'position': 'absolute',
                    'bottom': '0',
                    'left': '0',
                    'right': '0',
                    'padding': '1rem',
                    'background': 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
                },
            };
            
            addComponents(components);
        }
    ]
}