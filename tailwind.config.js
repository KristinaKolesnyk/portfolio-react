const withOpacity = (variable) => {
    return ({ opacityValue }) =>
        opacityValue !== undefined
            ? `rgb(var(${variable}) / ${opacityValue})`
            : `rgb(var(${variable}))`;
};

module.exports = {
    darkMode: 'class',
    content: ["./public/index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins','ui-sans-serif','system-ui','Segoe UI','Roboto','Helvetica','Arial'],
            },
            colors: {
                brand: withOpacity('--brand'), // A6BBCC (dark) / 2B3C4A (light)
                ink:   withOpacity('--ink'),   // #FFFFFF (dark) / #090D10 (light)

                surface:  withOpacity('--c-surface'),
                surface2: withOpacity('--c-surface-2'),
                border:   withOpacity('--c-border'),
                muted:    withOpacity('--c-muted'),
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
