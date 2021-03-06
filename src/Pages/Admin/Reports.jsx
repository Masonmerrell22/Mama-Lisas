import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// To make rows collapsible
import { Collapse } from 'bootstrap'
const Reports =  ()  =>{
const[data,setData] = useState('')
    var [toggle, setToggle] = useState(false);

    
    useEffect(() => {
        var myCollapse = document.getElementById('collapseTarget')
        var bsCollapse = new Collapse(myCollapse, {toggle: false})
        toggle ? bsCollapse.show() : bsCollapse.hide()
    })
    
   const loadOrders = async ()=>{
    const response =  await axios.get('https://mama-lisas-api.herokuapp.com/completed-orders')
   const  sorted = response.data.sort((a, b) => {
        const aDate = new Date(a.time[0] + ' ' + a.time[1])
        const bDate = new Date(b.time[0] + ' ' + b.time[1])
        
        return bDate.getTime() - aDate.getTime()
      })

      setData(sorted.map(i=>{

        
        // console.log(addonArr)
          return (
            <tr onClick={() => setToggle(toggle => !toggle)}>
            <td>{i.orderId}</td>
            <td>{i.time[0]}</td>
         <td >{i.time[1]}</td>
         <td>{i.personsName}</td>
         <td>{i.pickUpOrDelivery}</td>
                            <td>{i.total}</td>
                            
                       
        </tr>
       
        
        
        
          )
      }))


    
   }
    useEffect(()=>{
        loadOrders()
    })


   
return(
    <div style={{padding:'60px'}}>
    <p style={{fontSize:'32px', textAlign:'end', fontWeight:'bold', color:'gray'}}>REPORTS</p>
    <hr></hr>

    <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Total</th>
                    </tr>
                </thead>
               <tbody>
              {data}


          
            
   </tbody>
              </Table>  
              <div className="collapse" id="collapseTarget">
            This is the collapsible content!
        </div>   
    </div>
)
}

export default Reports;