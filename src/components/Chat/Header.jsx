import logo from '../../assets/aurora128_enhanced.png';

function Header() {
  return (
    <>
      <div className="flex items-center p-4 text-white bg-transparent">
        <img src={logo} alt="logo" className="mr-2 h-6" />
        <span className="text-xl font-bold">Aurora</span>
      </div>
    </>
  );
}

export default Header;
