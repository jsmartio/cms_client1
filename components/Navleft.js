import React from 'react'

class Navleft extends React.Component{
  render(){
    return (
      <div className="" id="belowNav">
        <div className="left-bar flex_container_column">
          <div className="sunnybrook-logo">
          </div>
          <div className="flex_container_row" style={{ flex:9999, justifyContent: 'center' }}>
            <p className="left-bar-description">
            </p>
          </div>
          <div className="core__copyrights flex_container_column">
              <p>Copyright 2018 ©</p>
              <p>All Rights Reserved, Envision</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Navleft