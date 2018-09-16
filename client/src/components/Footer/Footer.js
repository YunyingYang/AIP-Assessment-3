import React from 'react';
import './Footer.css';

const tdStyle = {
    width: '30px',
};


const footer = () => {
    return (
        <div className="Footer">
            <table id="Siteinfo">
                <tr>
                    <td style={tdStyle}></td>
                    <td><a href="#aboutus">About Us</a></td>
                    <td style={tdStyle}></td>
                    <td><a href="#contact">Contact</a></td>
                    <td style={tdStyle}></td>
                    <td><a href="#terms">Terms of Use</a></td>
                    <td style={tdStyle}></td>
                    <td><a href="#policy">Privacy Policy</a></td>
                </tr>
            </table>
            <p id="copyright">© {new Date().getFullYear()} Peppa Filmtopia. Film data from IMDb. Made by 🐰🦄🐹 with ♥️</p>
        </div>
    )
};

export default footer;