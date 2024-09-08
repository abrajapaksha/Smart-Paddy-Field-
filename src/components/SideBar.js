
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.png'


export default function SideBar(props) {
    const navigate=useNavigate()

    const logOut=()=>{
        localStorage.removeItem('logStatus');
        navigate('/log-in')
    }
   
    return (
        <aside style={{display:props.sideMenu}}>
            <div class="toggle">
                <div class="logo">
                    <img src={Logo}/>
                    <h3>Smart</h3><h2><span class="danger">Wakkada</span></h2>
                </div>
                <div onClick={()=>{props.setSideMenu("none")}} class="close" id="close-btn">
                    <span class="material-icons-sharp">
                        close
                    </span>
                </div>
            </div>

            <div class="sidebar">
                <a href="#">
                    <span class="material-icons-sharp">
                        dashboard
                    </span>
                    <h3>Dashboard</h3>
                </a>
                <a href="#">
                    
                    <h3>Future</h3>
                </a>
              
                
                <a href="#">
                    
                    <h3>Future</h3>
                </a>
               
                <a onClick={logOut} >
                    <span class="material-icons-sharp">
                        logout
                    </span>
                    <h3>Logout</h3>
                </a>
            </div>
        </aside>
    )
}