import logo from '../assets/alora128.png'

function Header() {
    return(
        <>
      <div className="flex items-center p-4 bg-transparent text-white">
      <img src={logo} alt="logo" className="h-6 mr-2" /> Aurora
      </div>
      </>
    )
}

export default Header;