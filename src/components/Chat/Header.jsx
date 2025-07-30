import logo from '../../assets/aurora128_enhanced.png'

function Header() {
    return(
        <>
      <div className="flex items-center  p-4 bg-transparent text-white">
      <img src={logo} alt="logo" className="h-6 mr-2" />
      <span className="text-xl font-bold">Aurora</span>
      </div>
      </>
    )
}

export default Header;