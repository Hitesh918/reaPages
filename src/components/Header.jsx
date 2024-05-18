import React from 'react'
import { useLocation  , Link} from 'react-router-dom';

function Header() {
    const location = useLocation();
    return (
        <header className="header">

            <section style={{ textAlign: "center" }} className="flex">

                {/* <a href="/" className="logo">REA</a> */}
                <h2 style={{ color: "black", marginLeft: "auto", marginRight: "auto" }}>Unlocking Potential, One Bead at a Time</h2>
                {/* <img src="images/logo.png" alt="logo" style={{width:"5rem"}} /> */}
                <br></br>
                <br></br>
                <br></br>

                {location.pathname==="/admin" && <div className="more-btn">
                    <Link to="/AddEventForm" className="inline-option-btn">Manage Events</Link>
                </div>}

            </section>

        </header>
    )
}
export default Header;