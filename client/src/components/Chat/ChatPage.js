import React, { Component } from "react";
import io from "socket.io-client";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./ChatPage.css";

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      message: "",
      messages: []
    };

    this.socket = io("localhost:5000");

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      this.setState({ messages: [...this.state.messages, data] });
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        author: this.state.username,
        message: this.state.message
      });
      this.setState({ message: "" });
    };
  }
  render() {
    const { user } = this.props.auth;
    return (
      <div className="chat-page">
        <div
          className="container alert alert-dismissible alert-secondary"
          style={{ maxWidth: "60rem" }}
        >
          <div className="row">
            <div className="col-sm-12" style={{ padding: "10px" }}>
              <div>
                <div>
                  <h2>Let's share feelings about movies!</h2>
                  <hr />
                  <div
                    className="messages"
                    style={{
                      width: "100%",
                      maxHeight: "350px",
                      overflowY: "auto"
                    }}
                  >
                    {this.state.messages.map((message, index) => {
                      return (
                        <p
                          className={
                            this.state.username === message.author
                              ? "alert alert-dismissible alert-success"
                              : "alert alert-dismissible alert-info"
                          }
                          key={index}
                          style={{ wordBreak: "break-all" }}
                        >
                          <strong>{message.author}:</strong>
                          &nbsp;
                          {message.message}
                        </p>
                      );
                    })}
                  </div>
                  <hr />
                </div>
                <div>
                  <form onSubmit={this.sendMessage}>
                    {/* <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} className="form-control" />
                                <br /> */}
                    <input
                      type="text"
                      placeholder="Message"
                      className="form-control"
                      required
                      value={this.state.message}
                      onChange={ev =>
                        this.setState({
                          username: user.name,
                          message: ev.target.value
                        })
                      }
                    />
                    <br />
                    <button type="submit" className="btn btn-secondary">
                      Send
                    </button>
                    <br />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

ChatPage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ChatPage);
