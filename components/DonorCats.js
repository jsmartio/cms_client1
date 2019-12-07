//import React, { Component } from 'react'
import React, { useState, useEffect } from "react";
import { getDonorCats } from './DonorFunctions'
import { sizeSideBar } from './_sharedFunctions'

const DonorCat = (props) => {
  let tid = props.title; //.replace(/\D/g,'');
  let title = props.title.toString()
    .replace('2500000','2.5M')
    .replace('0000000','0M')
    .replace('000000','M')
    .replace('00000','00K')
    .replace('0000','0K')
    .replace('000','K')
    .replace('lifetime','')
  return(
    <div className="donors__list-item flex_container_column margin-bot8">
        <div className="donors__list-item-header flex_container_row">
            <p className="donors__list-item-title">{title}</p>
            <div className="buttonLG dgroup" id={tid}>
                <i className="fa fa-edit dgroup" id={"l"+tid} aria-hidden="true"></i>
            </div>
        </div>
        <div className="donors__list-item-info flex_container_column outlines">
            <p># of Entries: {props.count}</p>
            <p>Last edited: {props.date}</p>
            <p>Edited By: {props.author}</p>

        </div>
    </div>    
  )
}

const AllDonorCats = (props) => {

  return(
    <React.Fragment>
      {props.donorCats.map(dc => 
        <DonorCat author={dc.author} 
                  date={dc.date} 
                  count={dc.count}
                  title={dc.donorKey}
                  key={dc.donorKey}
        />        
        )}
    </React.Fragment>
  )
}

export const DonorCats = () => {

  // set up props
  const [donorCats, setDonorCats] = useState([])
  const butClick = (e) => window.location.href = '/getdonors/' + e.target.id

  // on page load / componentDidMount
  useEffect(() => {    
    document.body.style.background = "#ffffff";
    window.addEventListener('resize', sizeSideBar);
  
    sizeSideBar();
    getDonorCats().then(data => {
      setDonorCats(data) // state is changed here - now will repaint

      // add listener to each of the clicked edit icons
      var c = document.getElementsByClassName("dgroup");
      for (var i = 0; i < c.length; i++) c[i].addEventListener('click', butClick, false);
  
    })
  }, []);
  
  return (
    <div id="main" >
      <div className="donors__CSV-upload flex_container_row">
          <div className="donors__CSV-button download-button flex_container_row" id="dcsv">
              <div className="icon"></div>
              <p>Download a CSV file</p>
          </div>
          <div className="donors__CSV-button flex_container_row ucsv">
              <div className="icon"></div>
              <p className="ucsv">Upload a CSV file</p>
          </div>
          <input style={iStyle} type="file" />
      </div>

      <div className="donorCatsRow" id="donor_rows">
        <AllDonorCats donorCats={donorCats} />
      </div>
    </div>
  )
}

const iStyle = {
  display:'none'
}