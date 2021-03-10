import React from "react";

export default class Login extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={ 
      username: "",
      password: "",
      userList: [],
    };
  }

  handleInputChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
      })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(!this.state.isLogined)
    {
      this.state.userList.map(element =>
      {
        if(this.state.username === element.username && this.state.password === element.password)
        {
          this.props.onLogChange(true);
          this.props.changeView("Inventory");
        }
        return true;
      })
    }
  }

  componentDidMount() {
    fetch("https://localhost:5001/api/users/")
    .then(response => response.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          userList: result
        });
      }
    )  
  }
    
  render() {
    return (
      <div >
        <form name="loginForm" onSubmit={this.handleSubmit} autoComplete="off">
          <label>Username</label>
          <input name="username" type="text" onChange={this.handleInputChange}></input>
          <label>Password</label>
          <input name="password" type="password" onChange={this.handleInputChange}></input>
          <button type="submit">Submit</button>
        </form>

      </div>

    );
  }
}

