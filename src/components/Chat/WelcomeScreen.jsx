import BotAvatar from '../../assets/aurora128_enhanced.png'

function WelcomeScreen() {
  return (
    <div className="flex-1 h-full flex flex-col gap-4 items-center justify-center">
      <img className='w-16' src={BotAvatar} alt="Aurora-logo" />
      <h2 className="text-gray-400 text-3xl">Привіт, я ваш помічник Aurora</h2>
      <p className="text-gray-400 text-xl">Що у вас сьогодні на думці?</p>
    </div>
  );
}

export default WelcomeScreen;