import BotAvatar from '../../assets/aurora128_enhanced.png'

function WelcomeScreen() {
  return (
    <div className="flex flex-col flex-1 gap-4 justify-center items-center px-6 h-full text-center">
      <img className='w-16 md:w-20' src={BotAvatar} alt="Aurora-logo" />
      <h2 className="text-2xl text-gray-400 md:text-3xl">Привіт, я ваш помічник Aurora</h2>
      <p className="text-lg text-gray-400 md:text-xl">Що у вас сьогодні на думці?</p>
    </div>
  );
}

export default WelcomeScreen;