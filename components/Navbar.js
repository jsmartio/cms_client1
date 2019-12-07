import React, { Component } from 'react'
import { logout } from './UserFunctions'

class Navbar extends Component {
  logOut(e) {
    e.preventDefault()
    // install delay spinner here
    logout()
      .then( () => {
        localStorage.removeItem('usertoken')
        window.top.location = '/';
      }).catch( err => {
        console.log('+++ error in file: ' + __filename + "err=" + err)
      })
  }

  dba(){
    document.location.href = '/dba'
  }

  toggle = (props) => {
    let t =  document.getElementById('pmenu');
    if (t.style.visibility === 'hidden') t.style.visibility = 'visible';
    else t.style.visibility = 'hidden';
  } 

  componentDidMount() {
    document.getElementById('pmenu').style.visibility = 'hidden'; 
  }
  

  render() {

    return (
        <div className="header__container flex_container_row" id="navWrapper">
          <div className="header__logo-container " id="logoWrap">
            <div className="header__logo flex_container_column">
                <img alt="" src="/img/logo_env.png" />
                <h3>cms system</h3>
            </div>
          </div>
          <div className="header__button-row flex_container_row">
            <div className="header__nav-buttons flex_container_row">
              <div className="header__button"><a href="/donor_cats">Donors</a></div>
              <div className="header__button"><a href="/playlist">Playlist</a></div>
              <div className="header__button"><a href="/users">Users</a></div>
              <div className="header__button"><a href="/media">Media</a></div>
            </div>
            <div className="header__user-button flex_container_row">
            
            <img src="/img/logout.png" 
                  className="logoutImg img-button" 
                  alt="Logout"
                  onClick={this.toggle.bind(this)}/>

                  <div id="pmenu">
                    <div id="logoutPop" className="pmStyle" onClick={this.logOut.bind(this)}>Logout</div> 
                    <div id="dba" className="pmStyle" onClick={this.dba.bind(this)}>DB Maint</div> 
                  </div>
                  

            </div>
          </div>
        </div>
    )
  }
}


export default Navbar

//export default withRouter(Landing)
