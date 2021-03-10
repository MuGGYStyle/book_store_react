import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

export default class Books extends Component {
  state = {
    error: null,
    loading: false,
    books: [],
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    axios
      .get("http://127.0.0.1:5000/api/v1/books?limit=50")
      .then((res) => this.setState({ loading: false, books: res.data.books }))
      .catch((err) =>
        this.setState({ loading: false, error: err.response.data.message })
      );
  };

  render() {
    return (
      <div>
        <h1 className="title">Amazon номын дэлгүүр</h1>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div className="columns is-multiline">
            {this.state.books.map((el) => (
              <div className="column is-one-quarter">
                <Link to={`/books/${el._id}`}>
                  <img
                    src={`https://data.internom.mn/media/images/${el.photo}`}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
