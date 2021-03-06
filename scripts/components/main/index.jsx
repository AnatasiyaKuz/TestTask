import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '/css/styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import {Line} from 'react-chartjs-2';

export const Main =()=>{
   const [mainData,setMainData]=useState([]);
   const [cur_data,setCur_data]=useState([]); 
   const [value,setValue]=useState('Select currency');
   const [cur_id,setCur_id]=useState();
   const [cur_Abbreviation,setCur_Abbreviation]=useState()
   const [startSelectedDate,setStartSelectedDate]=useState(new Date());
   const [endSelectedDate,setEndSelectedDate]=useState(new Date())

    

    useEffect(()=>{
        
            axios.get(`https://www.nbrb.by/api/exrates/rates?periodicity=0`)
                .then(res=>{
                    setMainData(res.data);
                })
                .catch(err=>{
                    console.log(err);
                })
    },[])

    useEffect(()=>{
        mainData.map((item)=>{
            if(item.Cur_Name===value){
                setCur_id(item.Cur_ID);
                setCur_Abbreviation(item.Cur_Abbreviation);
            }
        })
    },[value]);

    useEffect(()=>{
        axios.get(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${cur_id}?startDate=${startSelectedDate}&endDate=${endSelectedDate}`)
            .then(res=>{
                setCur_data(res.data);
            })
            .catch(err=>{
                console.log(err);
            })

    },[startSelectedDate,endSelectedDate,cur_id])
    const getValue=(Cur_Name)=>{
        setValue(Cur_Name);
    }
    let OX = [];
    let OY = [];
    cur_data.map((item,index)=>{
        OX.push(item.Date);
        OY.push(item.Cur_OfficialRate)
    })

    const datas={
        labels:OX,
        datasets:[
            {
                label:'currency rate ',
                data: OY,
                fill:false,
                backgroundColor:'rgb(255,99,132)',
                borderColor:'rgba(255,99,132,8.2)',
            },
        ],
    } 
    const options ={
        scales:{
            yAxes:[
                {
                    ticks:{
                        beginAtZero:true,
                    }
                }
            ]
        }
    }

    
    console.log(datas.labels)
    
    
    
    
    return(
        <section style={{width:'100%'}}>
            <h2>Select dates</h2>

            <input type="date" onChange={(date)=>setStartSelectedDate(`${date.target.valueAsDate.getFullYear()}-${date.target.valueAsDate.getMonth()+1}-${date.target.valueAsDate.getDate()}`)} ></input>
            <input type="date" onChange={(date)=>setEndSelectedDate(`${date.target.valueAsDate.getFullYear()}-${date.target.valueAsDate.getMonth()+1}-${date.target.valueAsDate.getDate()}`)} ></input>
            
            <h1>{value}</h1>
            <select id="select" onChange={()=>getValue(()=>{return document.getElementById('select').value})}>
                {
                    mainData.map((item,index)=>{
                        return(
                                <option key={index}>{item.Cur_Name}</option>
                        )
                    }) 
                }
            </select>

            <table >
                 <thead>
                    <tr >
                        <th> </th>
                            {
                                cur_data.map((item,index)=>{
                                    return(         
                                        <th key={index}>{item.Date}</th>
                                    )
                                })                               
                            }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{cur_Abbreviation}</td>
                        {
                                cur_data.map((item,index)=>{
                                    return(         
                                        <td key={index}>{item.Cur_OfficialRate}</td>
                                    )
                                })                               
                            }
                    </tr>
                </tbody>
            </table>
            <div>
                 <Line data={datas} option={options} />
            </div>
        </section>
    )

}
