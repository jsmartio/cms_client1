import React, { useState, useEffect } from "react";
import { sizeSideBar,get_date } from './_sharedFunctions'
import { createDB, getDBs, removeDB, fromMainDbToNew, rmDupes, restoreFromNew } from './DbaFunctions'
import { Alert, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';


const Dbline = (props) => {
    return (
        <div>
            <Button color="success" id={"a-"+ props.id} className="c2db" onClick={props.copyTo}>Copy to Live DB</Button>
            <Button color="primary" id={"b-"+ props.id} className="cfdb" onClick={props.copyFrom}>Copy From Live DB</Button>
            <Button color="danger" id={"c-"+ props.id} className="del" onClick={props.deleteOne.bind(this)}>Delete</Button>
            {props.dbName}
        </div>
    )
}

const DBlist  = (props) => {
    return (
        props.dbNames.map(dbName => <Dbline 
                                id={dbName}
                                key={"key-" + dbName}  
                                dbName={dbName}
                                copyTo={props.copyTo}
                                copyFrom={props.copyFrom}
                                deleteOne={props.deleteOne}
                            />)
    )
}

export const Dba = () => {

    const [dbNames,setDbNames] = useState([])
    const [newDb, setNewDb] = useState('')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('primary')

    const loading = `Loading...`

    function copyFrom(e){
        e.preventDefault(); e.stopPropagation();
        let [,DBname] = e.target.id.toString().split('-')
        fromMainDbToNew(DBname).then( (res)=> {
            console.log(res)
            setAlertType('primary')
            setAlertMsg(JSON.stringify(res))
            callGetDBs();
        })
    }
    function copyTo(e){
        e.preventDefault(); e.stopPropagation();
        setAlertType('primary')
        setAlertMsg(loading)
        let [,DBname] = e.target.id.toString().split('-')
        restoreFromNew(DBname).then( (res)=> {
            console.log(res)
            setAlertMsg(JSON.stringify(res))
            callGetDBs();
        })
    }
    function deleteOne(e){
        e.preventDefault(); e.stopPropagation();
        setAlertType('primary')
        setAlertMsg(loading)
        let [,DBname] = e.target.id.toString().split('-')
        removeDB(DBname).then( (res)=> {
            console.log(res)
            setAlertMsg(JSON.stringify(res))
            callGetDBs();
        })
    }
    function createOneDb(e){
        e.preventDefault()
        setAlertType('primary')
        setAlertMsg(loading)
        createDB(newDb)
            .then( (res) => {
                console.log(res)
                setAlertType('success')
                setAlertMsg(JSON.stringify(res))
                callGetDBs();
            })
            .catch( err => { 
                console.log('err: ' + err)
                setAlertMsg(err)
                setAlertType('danger')
            })
    }

    function removeDupes(){
        setAlertType('primary')
        setAlertMsg(loading)
        rmDupes('envision').then( res => {
            console.log(res)
            setAlertType('success')
            setAlertMsg(JSON.stringify(res))
        })
    }

    function callGetDBs(){
        setAlertType('primary')
        //setAlertMsg(loading)
        getDBs().then(res => {
            setDbNames(res) // change state
            //setAlertMsg(JSON.stringify(res))
        })
    }
    useEffect(() => {
        sizeSideBar();
        callGetDBs();
        setNewDb("_"+get_date());
    }, [])

    const dd = {
        display:'block',
        width:'100%',
        padding:10

    }

    return (
        <div id="main">

            <div style={dd}>
                <Alert color={alertType} id="alert">
                    {alertMsg}
                </Alert>  
            </div>
            <div style={dd}>
                <Button color="success" onClick={removeDupes}>Remove Duplicates</Button>
            </div>

            <div style={dd}>

                <InputGroup >
                    <InputGroupAddon addonType="prepend">
                        <Button onClick={createOneDb}>Create DB</Button>
                    </InputGroupAddon>
                    <Input type="text" 
                                    id="newDbName" 
                                    placeholder="DB Name" 
                                    value={newDb}
                                    onChange={e => setNewDb(e.target.value)}      
                                />
                </InputGroup>

            </div>
            <div style={dd} id="existingDbs">
                Existing DB's
                <DBlist dbNames={dbNames}
                            copyTo={copyTo}
                            copyFrom={copyFrom}
                            deleteOne={deleteOne}
                    />

                <div id="spin1">
                </div>
            </div>            
        </div>
    )



} 