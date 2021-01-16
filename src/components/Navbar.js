import React,{useState} from 'react'

const Navbar = () => {
    const [days,setDays] = useState(['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']) 
    return (
        <>
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
            <a href='#' className="navbar-brand">Todo Application</a>
                {/* <form class="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}
                <span className="navbar-text">
                    {days[new Date().getDay()]}
                </span>
            </div>
        </nav>
        </>
    )
}

export default Navbar;
