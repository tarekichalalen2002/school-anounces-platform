import React, { useState } from 'react';
import './Sidebar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';  // Utiliser useNavigate au lieu de useHistory
import { FaCog } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { ImUsers } from "react-icons/im";
import { MdReport } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";
import { BiSolidCommentError } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import Notifications from '../../components/Notifications';

const Sidebar = () => {
    const [hoveredIcon, setHoveredIcon] = useState(null);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log('Logout clicked');
        navigate('/login');
        window.location.reload();
    };
     //const [notificationsActive, setNotificationsActive] = useState(false);

  const handleNotificationsClick = () => {
    // setNotificationsActive(!notificationsActive);
    setNotificationsOpen(!notificationsOpen);

  };
  
    
    const { pathname } = useLocation();
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
                        className={`icon ${hoveredIcon === 'notifications' ? 'hovered' : ''} `}
                        onClick={handleNotificationsClick}
                        id='notif'
                    />
                    {notificationsOpen && <Notifications onClose={() => setNotificationsOpen(false)} />}
                </div>
                <Link to="/Rooms"  className={`menuItem ${pathname === '/Rooms' ? 'active' : ''}`} id='option'>
                    <div>
                        <BiSolidCommentDetail />
                    </div>
                    <span>Rooms</span>
                    <div className='NavigateNext'>
                        <MdOutlineNavigateNext />
                    </div>
                </Link>
                <Link to="/Users" className={`menuItem ${pathname === '/Users' ? 'active' : ''}`} id='option'>
                    <div>
                        <ImUsers />
                    </div>
                    <span>Users</span>
                    <div className='NavigateNext'>
                        <MdOutlineNavigateNext />
                    </div>
                </Link>
                <Link to='/Reports' className={`menuItem ${pathname === '/Reports' ? 'active' : ''}`} id='option'>
                    <div>
                        <MdReport />
                    </div>
                    <span>Reports</span>
                    <div className='NavigateNext'>
                        <MdOutlineNavigateNext />
                    </div>
                </Link>
                <Link to='/Assistance' className={`menuItem ${pathname === '/Assistance' ? 'active' : ''}`} id='option'>
                    <div>
                        <BiSolidCommentError />
                    </div>
                    <span>Assistance</span>
                    <div className='NavigateNext'>
                        <MdOutlineNavigateNext />
                    </div>
                </Link>
            </div>
            <div className='menuItemLast' onClick={handleLogout}>
                <span>Logout</span>
                <LuLogOut />
            </div>
        </div>
    );
};

export default Sidebar;
