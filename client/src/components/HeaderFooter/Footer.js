import React from 'react';

const footerStyle = {
    height: '60px',
};

const footer = () => {
    return (
        <div className="fixed-bottom bg-dark text-white mt-5 p-4" style={footerStyle}>
            <p id="copyright" className="text-sm-center">
                © {new Date().getFullYear()} Peppa Filmtopia. Made by 🐰🦄🐹 with ♥️
            </p>
        </div>
    )
};

export default footer;
