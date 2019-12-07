import React, { Component } from 'react'
import { login } from './UserFunctions'
//import { brotliDecompressSync } from 'zlib'
//import logo from '../logo_env.png';

class Landing extends Component {

  constructor() {
    super()
    this.state = {
      email: 'admin@envision.design',
      password: 'sifdje9uij343er',
      errors: {},
      history:[]
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user).then(res => {
      if (res) {
        this.props.history.push(`/users`)
      } else {
        console.log('+++ unhandled error here: ' + __filename)
        document.getElementById('loginerr').innerHTML = 'Login Failed';
      }
    }).catch( err => {
      console.log('+++ error in file: ' + __filename + "err=" + err)
    })
  }

  centerLogin = () => {
    var height = window.innerHeight; 

    var lHeight = document.getElementById('loginform').offsetHeight; 
    var new_top = (height/2) - lHeight;
    if (new_top < 1) new_top = 10;
    document.getElementById('loginform').style.marginTop = new_top+"px";
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.centerLogin);
  }

  componentDidMount(){
   document.body.style.background = "#f3f3f3 url('img/blue_background.png') left top";
   window.addEventListener('resize', this.centerLogin);
   window.addEventListener('DOMContentLoaded', this.centerLogin);
  }

  render() {
    return (
      <div className="container align-middle" id="loginform">
        
        <div className="login__container flex_container_column">
          <div className="login__logo-container flex_container_row">
            <div className="login__logo flex_container_column">
                <img src="./img/logo_env.png" alt="Logo"/>
                <h3>CMS System</h3>
            </div>
          </div>
        </div>

        <div className="login__credentials-container flex_container_column">
          <div className="login__form-error" id="loginerr"></div>

          <form noValidate onSubmit={this.onSubmit} >
              
              <div className="login__form flex_container_column" >

                <div className="padding20">
                  <input  type="email"
                          className="form-control borderless"
                          name="email"
                          placeholder="Enter email"
                          value={this.state.email}
                          onChange={this.onChange}  />
                </div>
                <div className="padding20">
                  <input  type="password"
                          className="form-control borderless"
                          name="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.onChange}  />
                </div>

              </div>
              <button className="login__login-button" type="submit">Login</button><br></br>
              
          </form>
        </div>

      </div>
    )
  }
}

export default Landing
