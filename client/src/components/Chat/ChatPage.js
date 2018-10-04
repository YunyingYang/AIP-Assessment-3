import React, { Component } from "react";
import io from "socket.io-client";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import axios from "axios";

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
      // var div = document.getElementsByClassName("messages");
      // div.scrollTop = div.scrollHeight;
      const messageData = {
        text: this.state.message
      };
      console.log(messageData);
      axios
        .post("/api/chats", messageData)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
      this.setState({ message: "" });
    };
  }

  componentDidMount() {
    this.setState({ username: this.props.auth.user.name });
    axios
      .get("/api/chats/latest")
      .then(res => {
        var data = res.data.map(entry => ({
          author: entry.user.name,
          message: entry.text
        }));
        this.setState({ messages: data.reverse() });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="chat-page">
        <div
          className="container alert alert-dismissible alert-secondary"
          style={{ maxWidth: "60rem", minHeight: "30rem" }}
        >
          <div className="row">
            <div className="col-sm-12" style={{ padding: "10px" }}>
              <div>
                <h2>Let's share feelings about movies!</h2>
                <hr />
                <div
                  className="messages"
                  style={{
                    width: "100%",
                    maxHeight: "20rem",
                    minHeight: "15rem",
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
                <div>
                  <form
                    className="form-horizontal form-inline"
                    onSubmit={this.sendMessage}
                  >
                    {/* <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} className="form-control" />
                                <br /> */}
                    <div className="form-group col-md-12 col-lg-13 m-auto form-inline">
                      <input
                        type="text"
                        placeholder="Message"
                        className="form-control input-group mb-3 col-md-10 col-lg-10"
                        required
                        value={this.state.message}
                        onChange={ev =>
                          this.setState({
                            username: user.name,
                            message: ev.target.value
                          })
                        }
                      />
                      &nbsp;&nbsp;
                      <input
                        type="submit"
                        className="btn btn-secondary input-group-append"
                        style={{ minWidth: "3rem" }}
                        value="Send"
                      />
                    </div>
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
