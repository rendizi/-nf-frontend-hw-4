const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl" href='/'>OLX</a>
            </div>
            <div className="navbar-end">
                <a className="btn" href='/post'>Sell</a>
            </div>
        </div>
    )
}

export default Navbar