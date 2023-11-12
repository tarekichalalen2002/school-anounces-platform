import React,{ useState } from 'react';
import './Sidebar.css';
import { FaCog } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { ImUsers} from "react-icons/im";
import { MdReport} from "react-icons/md";
import { MdOutlineNavigateNext} from "react-icons/md";
import { BiSolidCommentError} from "react-icons/bi";
import { LuLogOut} from "react-icons/lu";

const Sidebar = () =>{
    const [hoveredIcon, setHoveredIcon] = useState(null);
    return (
    
        <div className='Sidebar'>
           
            <div className='menu'>
            <div className='menuItem' id='icon-head'>
             <FaCog 
              className={`icon ${hoveredIcon === 'cog' ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredIcon('cog')}
              onMouseLeave={() => setHoveredIcon(null)}
             />
             <IoMdNotifications
             className={`icon ${hoveredIcon === 'notifications' ? 'hovered' : ''}`}
             onMouseEnter={() => setHoveredIcon('notifications')}
             onMouseLeave={() => setHoveredIcon(null)}
             />
            </div>
            
                <div className='menuItem' id='option'>
                    <div >
                        <BiSolidCommentDetail/>
                    </div>
                    <span>Rooms</span>
                    <div className='NavigateNext'>
                        <MdOutlineNavigateNext/>
                    </div>
                    
                </div>
                <div className='menuItem' id='option'>
                    <div >
                        <ImUsers/>
                    </div>
                    <span>Users</span>
                    <div className='NavigateNext'>
                    <MdOutlineNavigateNext/>
                    </div>
                    
                </div>
                <div className='menuItem' id='option'>
                    <div>
                        <MdReport/>
                    </div>
                    <span>Reports</span>
                    <div className='NavigateNext'>
                    <MdOutlineNavigateNext/>
                    </div>
                    
                </div>
                <div className='menuItem' id='option'>
                    <div>
                        <BiSolidCommentError/>
                    </div>
                    <span>Assistance</span>
                    <div className='NavigateNext'>
                    <MdOutlineNavigateNext/>
                    </div>
                    
                </div>
           
            </div>
            <div className='menuItemLast'>
                    <span>Logout</span>
                    <div>
                        <LuLogOut/>
                    </div>
                    
                </div>
        </div>
    )
};
export default Sidebar;
