import React, {Component} from 'react';

class Star extends Component {
    constructor(props) {
        super(props);
        this.state={
            arr: [1,2,3,4,5]
        }
    }

    render() {
        return(
            <span>
                { this.state.arr.map((ele,index) => {
                    return(
                        <span key={index}>
                            {ele >= this.props.rating / 2
                                ? <span style={{color:"#FFAC2D",fontSize:"12px"}}>☆</span>
                                : <span style={{color:"#FFAC2D",fontSize:"15px"}}>★</span>}
                        </span>
                    )
                })}
            </span>
        )
    }
}

export default Star;
