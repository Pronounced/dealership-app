import React from "react";

export default class Login extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={ 
      username: "",
      password: "",
      userList: [],
      isLogined: false
    };
  }
  


  handleInputChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
      })
  }

  handleSubmit = () => {
    console.log(this.state.userList.filter(element => element.username === this.state.username).length === 1);
    console.log(this.state.userList.filter(element => element.password === this.state.password).length === 1);
    if((this.state.userList.filter(element => element.username === this.state.username).length === 1) && (this.state.userList.filter(element => element.password === this.state.password).length === 1))
    {
      this.setState({isLogined:true});
    }
    if(this.state.isLogined)
    {
      this.props.changeView("Inventory");
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
        <form name="loginForm" onSubmit={this.handleSubmit}>
          <input name="username" type="text" onChange={this.handleInputChange}></input>
          <input name="password" type="password" onChange={this.handleInputChange}></input>
          <button type="submit">Submit</button>
        </form>

      </div>

    );
  }
}

