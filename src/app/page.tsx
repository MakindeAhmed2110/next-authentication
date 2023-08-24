import Image from 'next/image'

export default function Home() {
  return (
    <main className="p-10">
      <nav className="flex flex-row justify-between items-center">
        <label className="text-3xl font-bold">Swi<span className="text-indigo-500">ftta</span>.</label>
        <ul className="flex gap-8">
          <li className="cursor-pointer hover:text-indigo-200">Accounts</li>
          <li className=' cursor-pointer hover:text-indigo-200'>Services</li>
          <li  className='cursor-pointer hover:text-indigo-200'>Testimonials</li>
          <li  className='cursor-pointer hover:text-indigo-200'>Privacy</li>
        </ul>
        <div className="flex gap-5">
        <a href='/signup'><button className="bg-indigo-500 text-white  px-8 py-4 rounded-lg backdrop-blur-lg
       shadow-sm shadow-indigo-300">
        Sign Up</button></a>

        <a href='/login'><button className="bg-transparent text-white px-8 py-4 rounded-lg backdrop-blur-lg
       shadow-lg shadow-indigo-500 hover:bg-white hover:text-indigo-500 transition ease-in-out duration-700">
        Login </button></a>
        </div>

      </nav>

      <div className="pt-40">
        <h1 className="text-6xl text-center font-black">Ace all your delivery plans<br /> with Swiftta Logistics at a GO.</h1>
        <div className="flex justify-center align-center pt-20">
          <button className="text-center rounded-full bg-white text-indigo-500 h-16 w-60 font-medium">Get started</button>

        </div>

      </div>

     
    </main>

  )
}
