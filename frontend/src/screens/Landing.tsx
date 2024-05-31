import React from 'react'
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
  return (
    <div className='flex justify-center'>
    <div className='pt-16 max-w-screen-lg'>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-2'>
            <div className='flex justify-center'>
                <img src="https://t3.ftcdn.net/jpg/05/71/99/86/360_F_571998686_7q0qDN2lvCn5wv90SHEepoffd0Pq8NRY.jpg" className='mx-w-'/>
            </div>

            <div className='pt-16'>
                <h1 className='flex justify-center text-5xl font-bold text-white'>
                    Welcome to Chess
                </h1>
                <div className='flex justify-center mt-8 '>
                    <button className='bg-green-500 hover:bg-green-700 text-whtie font-bold py-4 px-8 rounded text-white' onClick={()=>{ 
                        navigate("/game");
                    }}>
                        Play online
                    </button>
                </div>
                <button>

                </button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Landing;