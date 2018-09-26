import React, {Component} from 'react';
import pic1 from '../../images/1.jpg';
import pic2 from '../../images/2.jpg';
import pic3 from '../../images/3.jpg';

class Carousel extends Component {
    constructor() {
        super();


    }

    render() {
        return (
            <div id="carousel" className="carousel">
                <div className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carousel" data-slide-to="0" className="active"></li>
                        <li data-target="#carousel" data-slide-to="1"></li>
                        <li data-target="#carousel" data-slide-to="2"></li>
                    </ol>
                    {/* carousel body */}
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100 h-100" src={pic3}
                                 alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100 h-100" src={pic1}
                                 alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100 h-100" src={pic2}
                                 alt="Third slide" />
                        </div>
                    </div>
                    {/* next and prev control */}
                    <a className="carousel-control-prev" href="#carousel" role="button"
                       data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carousel" role="button"
                       data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default Carousel;