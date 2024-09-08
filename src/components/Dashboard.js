import RightBar from "./RightBar"
import SideBar from "./SideBar"


import rain from '../images/rain.png'
import sunny from '../images/sunny.png'
//import temperature from '../images/temperature.png'
import axios from "axios"
import Button from '@mui/material/Button';

import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react"

//import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




// const data = { rain: true, humidity: 50, waterLevel: 30, ph: 10, temperature: 27.6, sourceWaterLevel: 70 }

export default function Dashboard() {

    const [data, setData] = useState(null)
    const navigate = useNavigate();

    const storedValue = localStorage.getItem('logStatus');
    if (!storedValue) {
        localStorage.removeItem('logStatus');
        navigate('/log-in')
    }

    const refreshData = (resolve, reject) => {
        const apiKey = localStorage.getItem("apiKey");
        const channelId = localStorage.getItem("channelId");
        axios.get(`https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=300`)
            .then(response => {

                if (response.status == 200) {
                    resolve(response.data)

                } else {
                    reject()
                }
            })
            .catch(err => {
                reject()

            });
    }


    const filterData = (result) => {

        if (result) {

            const latestValues = {
                field1: null,
                field2: null,
                field3: null,
                field4: null,
                field5: null,
                field6: null
            };

            for (let i = result.feeds.length - 1; i >= 0; i--) {
                const feed = result.feeds[i];
                if (latestValues.field1 === null && feed.field1 !== null) latestValues.field1 = feed.field1;
                if (latestValues.field2 === null && feed.field2 !== null) latestValues.field2 = feed.field2;
                if (latestValues.field3 === null && feed.field3 !== null) latestValues.field3 = feed.field3;
                if (latestValues.field4 === null && feed.field4 !== null) latestValues.field4 = feed.field4;
                if (latestValues.field5 === null && feed.field5 !== null) latestValues.field5 = feed.field5;
                if (latestValues.field6 === null && feed.field6 !== null) latestValues.field6 = feed.field6;


            }
            const newData = {
                rain: latestValues.field1 != 0 ? true : false,
                LakeGate: latestValues.field4 != 0 ? true : false,
                waterLevel: latestValues.field5,
                ph: latestValues.field6,
                FieldGate: latestValues.field2 != 0 ? true : false,
                sourceWaterLevel: latestValues.field3
            }
            // console.log(newData)
            setData(newData)

        }
    }
    useEffect(() => {
        const myPromise = new Promise((resolve, reject) => {
            refreshData(resolve, reject)

        });
        myPromise
            .then((result) => {

                filterData(result)
            })
            .catch((error) => {
                console.error(error); // "Operation failed!"
            });


    }, [])


    const [sideMenu, setSideMenu] = useState("block")

        // Function to round temperature to nearest 0.5
        const roundToNearestHalf = (num) => {
            return Math.round(num * 2) / 2;
        };

        // Function to get the color based on pH value
// const getPHColor = (ph) => {
//     if (ph >= 0 && ph <= 5) {
//         return "red";
//     } else if (ph >= 6 && ph <= 8) {
//         return "green";
//     } else if (ph >= 9) {
//         return "blue";
//     }
//     return "gray"; // Default color if none of the conditions match
// }
    
        // Rounded temperature value
        const roundedTemperature = data ? roundToNearestHalf(data.temperature) : 0;
       // const phColor = data ? getPHColor(data.ph) : "gray";

    return (
        storedValue ?

            <>
                <div class="container">


                    <SideBar sideMenu={sideMenu} setSideMenu={setSideMenu} />

                    <main>
                        
                        <h1>Dashboard</h1>

                        <div style={{ paddingTop: '2rem' }} class="new-users">
                            <h2>Source Details</h2>

                            {data ?
                                <div class=" analyse">
                                    <div class="sales">
                                        <div class="status">
                                            <div class="info">
                                                <h3>Rain Status</h3>
                                                <h1>&nbsp;{data.rain ? "Yes" : "NO"}</h1>
                                            </div>
                                            <div class="progresss">

                                                <img src={data.rain ? rain : sunny} />

                                            </div>
                                        </div>
                                    </div>
                                    <div class="visits">
                                        <div class="status">
                                            <div class="info">
                                                <h3>Lake Gate</h3>
                                                <h1>&nbsp;{data.LakeGate ? "ON" : "OFF"}</h1>
                                            </div>
                                            <Button 
                                                variant="contained" 
                                                sx={{ 
                                                    backgroundColor: data.LakeGate ? 'green' : 'red', 
                                                    width: '80px',       // Set the width to a fixed value
                                                    height: '80px',      // Set the height to the same value as the width
                                                    borderRadius: '50%'
                                                }}
                                            >
                                            <h2>&nbsp;{data.LakeGate ? "ON" : "OFF"}</h2>
                                            </Button>

                                        </div>
                                    </div>
                                    <div class="sales">
                                        <div class="status">
                                            <div class="info">
                                                <h3>Field Gate</h3>
                                                <h1>&nbsp;{data.FieldGate ? "ON" : "OFF"}</h1>
                                            </div>
                                            <Button 
                                                variant="contained" 
                                                sx={{ 
                                                    backgroundColor: data.FieldGate ? 'green' : 'red', 
                                                    width: '80px',       // Set the width to a fixed value
                                                    height: '80px',      // Set the height to the same value as the width
                                                    borderRadius: '50%'
                                                }}
                                            >
                                            <h2>&nbsp;{data.FieldGate ? "ON" : "OFF"}</h2>
                                            </Button>
                                        </div>

                                    </div>

                                </div> : null
                            }

                        </div>





                        <div style={{ paddingTop: '2rem' }} class="new-users">
                            <h2>Personal Details</h2>

                            {data ?
                                <div class=" custom-grid analyse">
                                    <div class="sales">
                                        <div class="status">
                                            <div class="info">
                                                <h3>Water Level</h3>
                                                <h1>&nbsp;{(data.waterLevel*100).toFixed(2)}%</h1>
                                            </div>
                                            <div class="progresss">

                                                <CircularProgressbar value={data ? (data.waterLevel) : 0} text={`${data ? (data.waterLevel*100).toFixed(2) : 0}%`} />

                                            </div>
                                        </div>
                                    </div>
                                    <div class="visits">
                                        <div class="status">
                                            <div class="info">
                                                <h3>PH value</h3>
                                                <h1>{data ? Math.round(data.ph) : 0}</h1>
                                            </div>
                                            <CircularProgressbar value={data ? parseInt(data.ph * 100 / 14) : 0} text={`${data ? Math.round(data.ph) : 0}`} styles={buildStyles({
                                                    //pathColor: phColor,
                                                    //textColor: phColor,
                                                    //trailColor: "transparent"
                                                    //backgroundColor:phColor
                                                })}/>
                                        </div>
                                    </div>


                                </div> : null
                            }

                        </div>



                    </main>
                    {data ? <RightBar data={data} setSideMenu={setSideMenu} /> : null}

                </div>
            </>
            : null

    )
}
