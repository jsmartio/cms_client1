import React, { useState, useEffect } from "react";
import { getDonors, donorSwap, updateSQL,deleteSQL } from './DonorFunctions'
import { sizeSideBar } from './_sharedFunctions'
import { Spinner } from 'reactstrap';
import arraySort from 'array-sort'

const Adonor = (props) => {

  return (
<div className={"donors__edit__table-row flex_container_row font-gray " + props.bgc} >
        <input type="hidden" id="did" value={ props.id } />
        <input type="hidden" id="order" value="5" />

        <div className="donors__edit__table-item center flex-1 hide_query">
            <i aria-hidden="true" className="fa fa-arrow-up headerr_link headerr_link" id={"au-" + props.id }  onClick={props.ArrowClick.bind(this)}></i>
        </div>
        <div className="donors__edit__table-item flex-1 hide_query ">
            <i aria-hidden="true" className="fa fa-arrow-down headerr_link" id={"ad-" + props.id } onClick={props.ArrowClick.bind(this)}></i>
        </div>

        <div className="donors__edit__table-item flex-1 show_query display-none" >
            <span>&nbsp;</span>
        </div>

        <div className="donors__edit__table-item flex-5" id={"donor-" + props.id }>
                    {props.donorName} 
        </div>
        <div className="donors__edit__table-item flex-1 floatl" id={"let-" + props.id }>
                    {props.letter} 
        </div>
    
        <div className="donors__edit__table-item flex-1 show_query display-none" >
            <span>&nbsp;</span>
        </div>  
        <div className="donors__edit__table-item flex-2">
              <div className="btn deleteBtn" id={"del-" + props.id }>
                  <i aria-hidden="true" className="fa fa-trash-o deleteBtn" id={"delb-" + props.id } onClick={props.delDon.bind(this)}></i>
              </div>
              <div className="btn saveBtn startHid" id={"save-" + props.id }>
                  <i aria-hidden="true" className="fa fa-floppy-o saveBtn" id={"savei-" + props.id }></i>
              </div>
        </div>
        <div className="donors__edit__table-item flex-2">
              <div className="btn editBtn" id={"edit-" + props.id }><i aria-hidden="true" className="fa fa-pencil-square-o editd editBtnIcon" id={"editI-" + props.id }></i></div>
              <div className="btn cancelBtn startHid" id={"reset-" + props.id }><i aria-hidden="true" className="fa fa-reply cancelBtn" id={"reset-" + props.id }></i></div>
        </div>
    </div>
  )
}

const Alldonors = (props) => {

  var tog = false, bgc, first, last, arrowsArr = [];
  
  // the following is to stripe the lines for easier visuals
  props.donorArr.forEach( (e,i) => {
    // get first and last because need to remove first and lasrt sort arrows
    if(first === undefined) first = e.id.toString();
    last = e.id.toString();
    tog === false ? bgc = 'whitebg' : bgc = 'graybg'
    tog =! tog; 
    props.donorArr[i].bgc = bgc;
    arrowsArr.push('au-' + e.id.toString())
    arrowsArr.push('ad-' + e.id.toString())
  })

  setTimeout(() => {
    arrowsArr.forEach( (e,i) => {
      document.getElementById(e).style.display = 'block'  // make all arrows viewable
    })
    // then hide first and last (up down respectively)
    if(document.getElementById('au-' + first)){
      document.getElementById('au-' + first).style.display = 'none'
      document.getElementById('ad-' + last).style.display = 'none'
    }
  }, 50);

  return(
    props.donorArr.map(donor => <Adonor
      id={donor.id }
      key={donor.id}
      bgc={donor.bgc}
      order={donor.donor_order}
      donorKey={donor.donorKey}
      donorName={donor.donorName}
      letter={donor.letter}
      ArrowClick={props.ArrowClick}
      delDon={props.delDon}
      />)
  )
}

export const Donors = () => {

    const [donorArr, setDonorArr] = useState([])

    const delDon = (e) => {
      e.stopPropagation(); e.preventDefault();
      let [,id] = e.target.id.toString().split('-');
      id = parseInt(id)
      console.log('id = ' + id)
      setDonorArr([...donorArr.filter(donor => donor.id !== id)])
      console.log('donorArr = ')
      console.log(donorArr)
      deleteSQL(id,'Donors').then( (res) => {
        console.log(res)
      })
    }

    const ArrowClick = (e) => {
      let donorArrNS = donorArr
      e.stopPropagation(); e.preventDefault();

      var ret2 = donorSwap(e.target.id, donorArrNS)
      if(ret2.updArr !== undefined && ret2.updArr.length > 2){
          setDonorArr([...ret2.updArr])
          ret2.updArr = [] // empty array so the object is smaller
          updateSQL(ret2.displacedID, ret2.displacedNewOrderNo, 'donor_order','Donors')
            .then(res => {console.log(res)})
          updateSQL(ret2.clkID, ret2.clkNewOrderNo, 'donor_order','Donors')
            .then(res => {console.log(res)})
      } 
    }

    useEffect(() => {
        document.getElementById('rendered').style.display = 'none'
        document.body.style.background = "#ffffff";
        window.addEventListener('resize', sizeSideBar);
        let temp = document.location.href.toString().split('/')
        let rest = temp[temp.length -1].toString().replace('ll','l')
        document.getElementById('title_box').innerHTML = rest;

        sizeSideBar();
        //rest attribute being sent is url REST to specify which grp returned
        getDonors(rest).then(data => {
            // do origonal sort by
            data = arraySort(data, 'donor_order')
            setDonorArr(data) // state is changed here - now will repaint
            

            document.getElementById('loading').style.display = 'none'
            document.getElementById('loading2').style.display = 'none'
            document.getElementById('rendered').style.display = 'block'
        })
    },[]);

    const headStyle = {
      width:'99%',
      paddingTop:'20px',
      marginBottom:'-50px'
    }
    const inline = {
      display:'inline-block',
      width: '200px',
      height: '100px',
      padding:0,
      margin:0
    }
    const spaceRight = {
      marginRight:'8px'
    }
    const floatRight = {
      float:'right'
    }
    const preNameStyle = {
      marginTop:'-2px',
      marginRight:'10px'
    }
  return(
    <div id="main" donorarr={donorArr}>
        <div id="loading">
          <center><Spinner type="grow" color="primary" /> Loading...</center>
        </div>
        <div id="rendered">
            <div className="donors__edit__list-title flex_container_row">
                <div className="donors__edit__title-box" id="title_box"></div>
                
                <div className="buttonLG dgroup" >
                  <i className="fa fa-edit dgroup"  aria-hidden="true"></i>
                </div>
                <div className="buttonLG dgroup" >
                  <i className="fa fa-trash dgroup"  aria-hidden="true"></i>
                </div>

                <button className="save startHid" id="edit_dcat"></button>
            </div>
        </div>

        <div style={headStyle} >

              <div className="buttonRED" id="ref_donors"  style={spaceRight}>
                  &#8635; Refresh Donors
              </div>

              <div id="prefetch" style={inline} className="twitter-typeahead ">
                  <input style={spaceRight} className="donors__edit__add-name ng-untouched ng-pristine ng-valid typeahead tt-hint tt1 " type="text" readOnly="" autoComplete="off" spellCheck="false" tabIndex="-1" dir="ltr"  />
                  <input style={preNameStyle} className="donors__edit__add-name ng-untouched ng-pristine ng-valid typeahead tt-input" placeholder="Name" type="text" id="pre_name" autoComplete="off" spellCheck="false" dir="auto" />
                  <pre aria-hidden="true" className="preAria"></pre>
                  <div className="tt-menu tt-menu-extra " >
                    <div className="tt-dataset tt-dataset-type-ahead">tt</div>
                  </div>
              </div>

              <input style={spaceRight} className="ng-untouched ng-pristine ng-valid" placeholder="Letter" type="text" id="live_letter" size="5"/>

              <div style={floatRight}className="buttonGR" id="add_new" data-target="#addDonor">
              &#x2b; Add Donor
              </div>

        </div>

        <div className="donors__edit__table-header flex_container_row no-shrink">
            <div className="donors__edit__table-item center flex-1 hide_query">
                <span><i aria-hidden="true" className="fa fa-arrow-up "></i></span>
            </div>
            <div className="donors__edit__table-item flex-1 hide_query">
                <span><i aria-hidden="true" className="fa fa-arrow-down"></i></span>
            </div>
            <div className="donors__edit__table-item flex-1 show_query display-none" >
                <span>&nbsp;</span>
            </div>
            <div className="donors__edit__table-item flex-5">
                Name
            </div>
            <div className="donors__edit__table-item center flex-1 floatr">
                Letter
            </div>

            <div className="donors__edit__table-item flex-1 show_query display-none">
                <span>&nbsp;</span>
            </div>                        
            <div className="donors__edit__table-item flex-2">
                Delete
            </div>
            <div className="donors__edit__table-item flex-2">
                Edit
            </div>
        </div>

        <div id="AllDonorsWrapper" style={adr}>
          <div id="loading2">
            <center><Spinner type="grow" color="primary" /> Loading...</center>
          </div>
          <Alldonors donorArr={donorArr} ArrowClick={ArrowClick} delDon={delDon} />
        </div>
        


    </div>  
  )
}

const adr = {
  marginRight:'10px'
}