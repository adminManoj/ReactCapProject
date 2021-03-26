import React from "react";
import { withRouter } from "react-router-dom";
import { apiEndPoint } from "../config";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handlevalidation = () => {
    return this.state.username && this.state.password;
  };

  // componentDidMount() {
  //   fetch(apiEndPoint + "products")
  //     .then((response) => response.json())
  //     // .then((data) => this.setState({ data }))
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log(error));
  // }

  handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    };
    console.log(requestOptions);
    const response = await fetch(apiEndPoint + "Products", requestOptions);
    const data = await response.json();
    if (data) {
      localStorage.setItem("loggedInUser", JSON.stringify(data));
      this.props.history.push("/Dashboard");
    }
  };

  render() {
    return (
      <form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="col-md-4">
            <h4>Login</h4>
            <div className="form-group">
              <label>Username : </label>
              <input
                name="username"
                type="text"
                className="form-control"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password : </label>
              <input
                name="password"
                type="text"
                className="form-control"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                type="submit"
                value="Login"
                className="btn btn-primary btn-block"
                onClick={this.handleSubmit}
                disabled={!this.state.username || !this.state.password}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(Login);
