import Avatar from '../images/profile-1.jpg';
import Button from '@mui/material/Button';



import {
    CircularProgressbar,
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";

export default function RightBar(props) {
   
    const SourceWaterLevel1 = props.data ? Math.round((props.data.sourceWaterLevel)): 50;
    const SourceWaterLevel = SourceWaterLevel1 > 0 ? Math.round (((SourceWaterLevel1)/23)*100) : 25;

   

    return (
        <div class="right-section">
            <div class="nav">
                <button onClick={()=>{props.setSideMenu("block")}}id="menu-btn">
                    <span class="material-icons-sharp">
                        menu
                    </span>
                </button>
                <div class="dark-mode">
                    <span class="material-icons-sharp active">
                        light_mode
                    </span>
                    <span class="material-icons-sharp">
                        dark_mode
                    </span>
                </div>

                <div class="profile">
                    <div class="info">
                        <p>Hey, <b>{localStorage.getItem("apiKey")}</b></p>
                        <small class="text-muted">User</small>
                    </div>
                    <div class="profile-photo">
                        <img src={Avatar} />
                    </div>
                </div>

            </div>


            <div class="user-profile">
                <div class="logo">
                    <CircularProgressbar    
                        value={SourceWaterLevel}
                        text={`${SourceWaterLevel}%`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            //backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            backgroundColor: SourceWaterLevel < 20 ? 'red' : "#3e98c7",
                            //trailColor: "transparent"
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    />
                    <h2>Source Water Level</h2>
                    <p>(this much of water diliverable)</p>

                    <Button 
                    variant="contained" 
                    sx={{ 
                        backgroundColor: '#3e98c7', 
                        marginTop: '400px',
                        '&:hover': {
                            backgroundColor: '#337ba1' 
                        } 
                    }}
                >
                    Blue Button
                </Button>
                    
                    
                </div>
                
                
            </div>

          
        </div>
    )
}