import React from 'react';

const footerStyle = {
    height: '60px',
};

// const navStyle = {
//     height: '40px',
//     position: 'relative',
//     top: '-15px',
// };
//
// const textStyle = {
//     position: 'relative',
//     top: '-15px',
// };

const footer = () => {
    return (
        <div className="fixed-bottom bg-dark text-white mt-5 p-4" style={footerStyle}>
            {/*<nav className="nav" style={navStyle}>*/}
                {/*<a className="nav-link" href="#About">About</a>*/}
                {/*<a className="nav-link" href="#Help">Help</a>*/}
                {/*<a className="nav-link" href="#Feedback">Feedback</a>*/}
                {/*<a className="nav-link" href="#Contact">Contact</a>*/}
                {/*<a className="nav-link" href="#Terms of Use">Terms of Use</a>*/}
                {/*<a className="nav-link" href="#Privacy Policy">Privacy Policy</a>*/}
            {/*</nav>*/}
            <p id="copyright" className="text-sm-center">
                © {new Date().getFullYear()} Peppa Filmtopia. Made by 🐰🦄🐹 with ♥️
            </p>
        </div>
    )
};

export default footer;
