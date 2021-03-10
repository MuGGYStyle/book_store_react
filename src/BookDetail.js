import React, { Component } from "react";
import axios from "axios";
import Spinner from "./Spinner";

export default class BookDetail extends Component {
  state = {
    name: "",
    price: "",
    content: "",
    photo: null,
    error: null,
    success: null,
    deleted: null,
    loading: false,
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    axios
      .get("http://localhost:5000/api/v1/books/" + this.props.match.params.id)
      .then((res) => {
        console.log(res);

        this.setState({ ...res.data.book, loading: false, error: null });
      })
      .catch((err) =>
        this.setState({
          error: err.response.data.error.message,
          loading: false,
        })
      );
  };

  handleType = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: null, success: null });
  };

  handleSave = () => {
    const token = localStorage.getItem("token");
    this.setState({ loading: true, success: null });
    axios
      .put(
        "http://localhost:5000/api/v1/books/" + this.props.match.params.id,
        {
          name: this.state.name,
          price: this.state.price,
          content: this.state.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        this.setState({
          ...res.data.book,
          loading: false,
          error: null,
          success: "Амжилттай хадгалагдлаа...",
        });
      })
      .catch((err) =>
        this.setState({
          error: err.response.data.error.message,
          loading: false,
        })
      );
  };

  handleDelete = () => {
    const token = localStorage.getItem("token");
    this.setState({ loading: true, success: null });
    axios
      .delete(
        "http://localhost:5000/api/v1/books/" + this.props.match.params.id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        this.setState({
          deleted: true,
        });
      })
      .catch((err) =>
        this.setState({
          error: err.response.data.error.message,
          loading: false,
        })
      );
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    if (this.state.deleted)
      return (
        <div className="notification is-danger">Амжилттай устгагдлаа... </div>
      );
    return (
      <>
        {this.state.error && (
          <div className="notification is-warning">{this.state.error}</div>
        )}
        {this.state.success && (
          <div className="notification is-success">{this.state.success}</div>
        )}
        {this.state.loading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="title">{this.state.name}</h1>
            <div className="media">
              <div className="media-left">
                {this.state.photo && (
                  <img
                    src={`https://data.internom.mn/media/images/${this.state.photo}`}
                  />
                )}
              </div>
              <div className="media-content">
                <div className="field">
                  <label className="label">Нэр</label>
                  <input
                    className="input"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleType}
                  />
                </div>

                <div className="field">
                  <label className="label">Үнэ</label>
                  <input
                    className="input"
                    name="price"
                    value={this.state.price}
                    onChange={this.handleType}
                  />
                </div>

                <div className="field">
                  <label className="label">Агуулга</label>
                  <textarea
                    style={{ height: "20em" }}
                    className="input"
                    name="content"
                    value={this.state.content}
                    onChange={this.handleType}
                  />
                </div>

                <div className="field">
                  <button className="button is-success" onClick={this.goBack}>
                    Буцах
                  </button>
                  &nbsp;
                  <button className="button is-link" onClick={this.handleSave}>
                    Хадгалах
                  </button>
                  &nbsp;
                  <button
                    className="button is-danger"
                    onClick={this.handleDelete}
                  >
                    Устгах
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
