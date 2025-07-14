import Nav from "./Nav";

function Header() {
  return (
    <div className="bg-zinc-900 text-white">
        <Nav />
        {/* Card and content */}
        <div className="App lg:w-1/2 sm:w-4/5 md:w-1/2 h-2/3 mx-auto px-4 sm:px-6 lg:px-8 bg-zinc-800 rounded-3xl shadow-lg mt-4 mb-4 p-4 border-white">
            <h2 className="text-3xl font-thin text-justify pl-5 pt-10 text-white">Total Balance</h2>
            <h1 className="text-5xl font-black text-justify pl-5 pt-2 text-white">$10,000</h1>
            <p className="text-xl font-thin text-justify pl-5 pt-2 text-white">This is your total balance across all accounts.</p>
        
            
        <div className="flex h-3.5 justify-between items-center mt-6 pt-10 pb-14">
        <p className="text-xl font-thin text-justify pl-5 pt-2 text-white">**** **** **** 6816</p>
        <ion-icon name="card-outline" className="w-12 h-12"></ion-icon>
        </div>

          </div>
      </div>
  );
}

export default Header;
