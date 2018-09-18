import React, { Component } from 'react'
import io from "socket.io-client";

import './ChatPage.css';
import Background from '../../images/chatbg.jpg';

var sectionStyle = {
    width: "1000px",
    height: "600px",
    border: "5px solid #FFF",
    borderRadius: "20px 70px",
    // makesure here is String, following is ES6
    backgroundImage: `url(${Background})`
};

class ChatPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };

        this.socket = io('localhost:5000');

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({ message: '' });

        }
    }
    render() {
        return (
            <div className="container" style={sectionStyle}>
                <div className="row">
                    <div className="col-sm-12" style={{ padding: "10px" }}>
                        <div>
                            <div>
                                <h2>Let's share feelings about movies!</h2>
                                <hr />
                                <div className="messages">
                                    {/* TODO: add scrollbar here!!! */}
                                    {this.state.messages.map(message => {
                                        return (
                                            <p className={this.state.username === message.author ?
                                                "alert alert-dismissible alert-success" : "alert alert-dismissible alert-info"}
                                                key={message.author}>
                                                <strong>{message.author}: </strong>
                                                {message.message}
                                            </p>
                                        )
                                    })}
                                </div>
                                <hr />
                            </div>
                            <div>
                                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} className="form-control" />
                                <br />
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                                <br />
                                <button onClick={this.sendMessage} className="btn btn-primary">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatPage;
