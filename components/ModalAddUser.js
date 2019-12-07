import React, { useState } from 'react';
import { Alert, Button,  FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { register } from './UserFunctions'
import validator from 'validator';
import uuid from 'uuid'

const bstyle = () => {
    return {
        backgroundColor:'#cccccc',
        float:'right'
      }
}



const ModalAddUser = (props) => {


    const {
        className
    } = props;
    
    const [modal, setModal] = useState(false);
    
    const toggle = () => setModal(!modal);

    return (
        <div>
            <div className="donors__edit__add-donor only-button flex_container_row no-shrink" style={{bstyle}}>
                <button id="addUser" onClick={toggle}>Add New User</button>
            </div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}> Add User</ModalHeader>
            <ModalBody>
                <AddUserForm addUserStart={props.addUserStart} toggle={toggle}/>
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
        </div>
    );
}

/////////////

const AddUserForm = (props) => {

    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [errors, setErrors] = useState('')

    function onSubmit(e) {
        e.preventDefault()
    
        // do validation
        document.getElementById('errmsg').style.visibility = 'invisible'
        document.getElementById('errmsg').innerHTML = ''

        let errs = [];
        if(!validator.isEmail(email)) errs.push('Email invalid')
        if(first_name === undefined || first_name.length < 1) errs.push('First Name Invalid')
        if(last_name === undefined || last_name.length < 1) errs.push('Last Name Invalid')
        if(password === undefined || password.length < 4) errs.push('password must be at least 4 letters')

        if(errs[0] !== undefined){
            let clerr = '<b>User not added:</b>'
            errs.forEach( (e,i) => {
                clerr += '<br>&#8226; ' + e 
            })
            document.getElementById('errmsg').style.visibility = "visible"
            document.getElementById('errmsg').innerHTML = clerr
        } else {
            const newUser = {
                uuid: uuid(),
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                admin: 1,
                bgc: 'dummy'
            }
            register(newUser).then( res => {
                if(res.data.error === undefined){
                    props.addUserStart(newUser)
                    props.toggle()
                } else {
                    document.getElementById('errmsg').style.visibility = "visible"
                    document.getElementById('errmsg').innerHTML = res.data.error
                }
    
            }).catch( err => {
                console.log('Error #111: ' + err)
            })
        }

    }

    return (
    <form noValidate onSubmit={onSubmit}>
    <Alert color="danger" id="errmsg" className="hideStart"></Alert>
    <FormGroup>
        <Input type="text" 
                name="first_name" 
                id="first_name" 
                placeholder="First Name" 
                value={first_name}
                onChange={event => setFirst_name(event.target.value)}      
                />
    </FormGroup>

        <FormGroup>
          <Input type="text" 
                name="last_name" 
                id="last_name" 
                placeholder="Last Name" 
                value={last_name}
                onChange={event => setLast_name(event.target.value)}       
                />
        </FormGroup>
        <FormGroup>
          <Input type="email" 
                name="email" 
                id="email" 
                placeholder="some@email.com"
                value={email}
                onChange={event => setEmail(event.target.value)}      
                />
        </FormGroup>
        <FormGroup>
          <Input type="password" 
                name="password" 
                id="password" 
                placeholder="password" 
                value={password}
                onChange={event => setPassword(event.target.value)}      
                />
        </FormGroup>


        <Button type="submit" color="primary" block>Submit</Button>
      </form>
    );
  }


export default ModalAddUser;