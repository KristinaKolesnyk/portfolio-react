
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["./public/index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Apple Color Emoji', 'Segoe UI Emoji'],
            },
            colors: {
                brand: '#A6BBCC', // цвет из макета
            },
        },
    },
    plugins: [],
};
