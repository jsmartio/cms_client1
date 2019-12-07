import axios from 'axios'
import arraySort from 'array-sort'

export const deleteSQL = (id,modelName) => {
  var jo = {
    id: id,
    modelName: modelName
  }
  return axios
    .post('/donors/deletesql2', jo )
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log("ClientSide Error @ DonorFunction > updateSQL " + err)
      return '++Error Loc 07'
    })
}

export const updateSQL = (id,newVal,field,modelName) => {
  var jo = {
    id: id, 
    newVal: newVal,
    field: field,
    modelName: modelName
  }
  return axios
    .post('/donors/updatesql2', jo )
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log("ClientSide Error @ DonorFunction > updateSQL " + err)
      return '++Error Loc 07'
    })
}

export const getDonors = (rest) => {
    return axios
      .post('/donors/getdonors2',{rest:rest})
      .then(res => {
        return res.data
      })
      .catch(err => {
        console.log("ClientSide Error @ DonorFunction > getDonors " + err)
        return '++Error Loc 07'
      })
}

export const getDonorCats = () => {
    return axios
      .post('/donors/donor_category2')
      .then(res => {
        return res.data
      })
      .catch(err => {
        console.log("ClientSide Error @ DonorFunction > getDonors " + err)
        return '++Error Loc 07'
      })
}

export const donorSwap = (cid, donorArr) => {
  // direction is up or down only
  var direction = 'down'
  if(cid.includes('u')) direction = 'up'
  var [,id] = cid.toString().split('-')
  id = parseInt(id);
  var addressOfId = '', newOrder = '', oldOrder


    donorArr.forEach( (e,i) => {
      //console.log('comparing parseInt(donorArr[i].id)' + parseInt(donorArr[i].id) + ' <-> ' + id)
      if(parseInt(donorArr[i].id) === id){
        addressOfId = i;
        oldOrder = donorArr[i].donor_order;
      } 
    })

  if(addressOfId === undefined || addressOfId === ''){
    donorArr = []
    var displacedID             // Store the id of the displaced donor order (for SQL update)
    var displacedNewOrderNo     // Store the new 'donor_order' of the displaced donor order (for SQL update)
    var clkID                   // clicked arrow id (for SQL update)
    var clkNewOrderNo           // clicked arrow new 'donor_order'  (for SQL update)

  } else if(direction === 'down'){
    newOrder = donorArr[addressOfId + 1].donor_order; // get donor_order of displaced
    // displaced
    donorArr[addressOfId + 1].donor_order = oldOrder; // update the displaced
    displacedID = donorArr[addressOfId + 1].id
    // clicked
    donorArr[addressOfId].donor_order = newOrder;     // upadating the clicked on
  } else {
    newOrder = donorArr[addressOfId - 1].donor_order
    // displaced
    donorArr[addressOfId - 1].donor_order = oldOrder
    displacedID = donorArr[addressOfId - 1].id
    displacedNewOrderNo = oldOrder
    // clicked
    donorArr[addressOfId].donor_order = newOrder;
    
  }
  displacedNewOrderNo = oldOrder
  clkID = donorArr[addressOfId].id
  clkNewOrderNo = newOrder


  donorArr = arraySort(donorArr, 'donor_order')
  return  {
    displacedID : displacedID,
    displacedNewOrderNo : displacedNewOrderNo,
    clkID : clkID,
    clkNewOrderNo : clkNewOrderNo,
    updArr : donorArr
  }
}


  