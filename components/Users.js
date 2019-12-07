import React, { Component } from 'react'
import { getUsers, removeUser } from './UserFunctions'
import { sizeSideBar} from './_sharedFunctions'
import ModalAddUser from './ModalAddUser'

class Userow extends React.Component{

  render(){

    return (

      <div className={"flex_container_row header_back pad5 " + this.props.bgc} key={"i-/" + this.props.email}>
          <div className="txt_div flex-2 font-gray leftpad15" >
            {this.props.first_name}
          </div>
          <div className="txt_div font-gray flex-2">
            {this.props.last_name}
          </div>
          <div className="txt_div font-gray flex-4">
              {this.props.email}
          </div>
          <div className="txt_div font-gray flex-1">
              <img alt="delete" 
                className="img-button rem_user margin-left8" 
                src="../img/delete.png" 
                id={this.props.uuid} 
                width="20px" height="20px"
                onClick={this.props.removeUserStart.bind(this, this.props.uuid)}
                />
          </div>
      </div>                
    )
  }
}

class Allusers extends React.Component{
  render(){
    var tog = false, bgc;

    this.props.users.forEach( (e,i) => {
      tog === false ? bgc = 'whitebg' : bgc = 'graybg'
      tog =! tog; 
      this.props.users[i].bgc = bgc;
    })

    return (
      <div>
      { 
        this.props.users.map(user => <Userow 
                                      key={user.uuid} 
                                      uuid={user.uuid} 
                                      id={user.id}
                                      bgc={user.bgc}
                                      email={user.email} 
                                      first_name={user.first_name} 
                                      last_name={user.last_name}
                                      removeUserStart={this.props.removeUserStart}
                                      /> )
      }
      </div>
    )
  }
}

class Users extends Component {
  constructor(){
    super()
    this.state = {
      users:[]
    }
  }

  removeUserStart = (uuid) => {
    if(uuid !== undefined){
      const data = { uuid: uuid }
      removeUser(data).then(res => {
        this.setState({ users: this.state.users.filter( user => user.uuid !== uuid )});
      }).catch(err => {
        console.log('Err #105 could not remove user ' + err)
      })
    }
  }

  addUserStart = (data) => {
    this.setState({ users: [...this.state.users, data] });
  }

  componentDidMount() {
    document.body.style.background = "#ffffff";
    window.addEventListener('resize', sizeSideBar);
    sizeSideBar();
    getUsers().then(res => {
      this.setState({  users: res })
    })



  }
  
  render() {
    return (
      <div id="main">
        <div className="part-screen__container flex_container_column">
            <ModalAddUser  addUserStart={this.addUserStart} />
                <div className="donors__edit__table-header flex_container_row no-shrink">
                    <div className="txt_div  font-white flex-2 leftpad15"  >
                        First name
                    </div>
                    <div className="txt_div font-white flex-2">
                        Last name
                    </div>
                    <div className="txt_div font-white  flex-4">
                        Email
                    </div>
                    <div className="txt_div font-white  flex-1">
                        Delete
                    </div>
                </div>
                
                <div className="donors__edit__table-body flex_container_column " id="user_rows">

                <Allusers users={this.state.users} removeUserStart={this.removeUserStart}/>

                </div>
            </div>
      </div>
    )
  }
}

export default Users
