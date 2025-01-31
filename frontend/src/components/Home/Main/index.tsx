"use client"
import React, { FormEvent, useEffect, useState } from 'react';
import Loading from '@/app/loading';
import axios from 'axios';
import { CiStar } from "react-icons/ci";
import {  ThumbsUp } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';
interface Item {
  idj: number;
  foto: string;
  Videolarımız: string;
  vd1: string;
  vd2: string;
  vd3: string;
  vd4: string;
}

interface GaleriItem {
  _id: string;
  resimUrl: string;
  createdAt: Date;
}

interface fetchveri {
  _id: string,
  name: string,
  surname: string,
  comment: string,
  star: string,
  like:number
  createdAt: string
}

const Anasayfa: React.FC = () => {

  const startveri = (star:string) => {
    if (star == `1`) {
      return (<span>⭐</span>)
    }
    else if (star == `2`) {
      return (<span>⭐⭐</span>)

    }
    else if (star == `3`) {
      return (<span>⭐⭐⭐</span>)

    }
    else if (star == `4`) {
      return (<span>⭐⭐⭐⭐</span>)

    }
    else {
      return (<span>⭐⭐⭐⭐⭐</span>)
    }
  }
  const [data, setData] = useState<Item | null>(null);
  const [galeriItems, setGaleriItems] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState(``)
  const [surname, setSurname] = useState(``)
  const [comment, setComment] = useState(``)
  const [star, setStar] = useState(0)
  const [like] = useState(0)
  const [datacomment, setDatacomment] = useState<fetchveri[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/data.json');
        const result = await response.json();
        setData(result[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchData2 = async () => {
      try {
        const response = await axios.get('https://serap-hair-studio.onrender.com/api/comment');
        setDatacomment(response.data)


      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };


    const fetchGaleri = async () => {
      try {
        const response = await axios.get('https://serap-hair-studio.onrender.com/api/galeri');
        setGaleriItems(response.data);
      } catch (error) {
        console.error('Galeri yüklenirken hata:', error);
      }
    };



    fetchData();
    fetchData2()
    fetchGaleri();

  }, []);
  const userComment = async (e:FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('https://serap-hair-studio.onrender.com/api/comment', { 
        name, 
        surname, 
        comment, 
        star, 
        like
      });
      toast.success('Yorum başarıyla Eklendi');

      console.log('Successful');
    } catch (error) {
      toast.error('Yorum eklenirken bir hata oluştu!');
      console.log(error);
    }
  };

  const handleLike = async (commentId: string) => {
    try {
      await axios.post(`https://serap-hair-studio.onrender.com/api/comment/${commentId}/like`);
      // Yorumları yeniden yükle
      const updatedComments = await axios.get('https://serap-hair-studio.onrender.com/api/comment');
      setDatacomment(updatedComments.data);
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  if (loading) {
    return <Loading />
  }

  if (!data) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className='bgsss font-thin tracking-widest'>
      <ToastContainer />
      <section>
        <div className='text-center text-5xl text-white py-[5rem] max-sm:text-3xl'>
          <h1>{data.foto}</h1>
        </div>
        <div className='flex flex-wrap justify-center pb-[10rem] w-full max-lg:gap-5'>
          {galeriItems.map((item: GaleriItem) => (
            <Image
              key={item._id}
              src={item.resimUrl}
              alt="Galeri Resmi"
              className="pr-3 hover:opacity-60 max-sm:w-[20rem] max-sm:h-[25rem]"
              width={350}
            />
          ))}
        </div>
      </section>
      <section>
        <div className='text-center text-5xl text-white py-[5rem] max-sm:text-3xl'>
          <h1>{data.Videolarımız}</h1>
        </div>
        <div className='flex flex-wrap justify-center pb-[5rem] max-lg:gap-5 '>
          <video src={data.vd1} className='pr-3 max-sm:w-[20rem] max-sm:h-[30rem]' width={350} height={0} controls></video>
          <video src={data.vd2} className='pr-3 max-sm:w-[20rem] max-sm:h-[30rem]' width={350} height={0} controls></video>
          <video src={data.vd3} className='pr-3 max-sm:w-[20rem] max-sm:h-[30rem]' width={350} height={0} controls></video>
          <video src={data.vd4} className='pr-3 max-sm:w-[20rem] max-sm:h-[30rem]' width={350} height={0} controls></video>
        </div>

      </section>
      <div className='mb-[3rem]'>
        <h1 className='text-5xl text-white text-center'>Yorumlar</h1>
      </div>

      <section className='flex justify-center'>
        <form onSubmit={userComment} className="flex flex-wrap    gap-3 bg-[rgb(30,30,30)] p-3 rounded-md shadow-md ">
          <div className="w-24">
            <label htmlFor="inputName" className="text-white text-xs font-semibold block mb-1">Ad:</label>
            <input
              type="text"
              id="inputName"
              onChange={(e) => { setName(e.target.value) }}
              className="w-full text-xs p-2 bg-gray-200 text-gray-900 rounded-md border-0 h-8 shadow-sm focus:ring focus:ring-blue-400"
              placeholder="Ad"
              required
            />
          </div>

          <div className="w-24">
            <label htmlFor="inputSurname" className="text-white text-xs font-semibold block mb-1">Soyad:</label>
            <input
              type="text"
              id="inputSurname"
              onChange={(e) => { setSurname(e.target.value) }}
              className="w-full text-xs p-2 bg-gray-200 text-gray-900 rounded-md border-0 h-8 shadow-sm focus:ring focus:ring-blue-400"
              placeholder="Soyad"
              required
            />
          </div>

          <div className="w-28">
            <label htmlFor="inputMessage" className="text-white text-xs font-semibold block mb-1">Yorumunuz:</label>
            <input
              id="inputMessage"
              onChange={(e) => { setComment(e.target.value) }}
              className="w-full text-xs p-2 bg-gray-200 text-gray-900 rounded-md border-0 shadow-sm h-8 focus:ring focus:ring-blue-400"
              placeholder="Mesaj..."
              required
            />

          </div>
          <div className='flex flex-col text-white'>
            <span>5/{star}</span>
            <button type='button'><CiStar className='w-6 h-6 hover:text-yellow-500' onClick={() => { if (star < 5) setStar(star + 1) }} /></button>
          </div>
          <button className="text-white inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 border border-[#aaaa] transition duration-700 ease-in-out hover:border-[#a44246] hover:bg-[#a44246]  dark:border-[#aaaa]     dark:hover:text-slate-50 h-4 font-semilight p-7 w-[5rem]   bg-transparent " type="submit">Gönder</button>
        </form>



      </section>
      <section className="w-full max-w-2xl mx-auto space-y-3 p-3">
        {datacomment.map((item) => (
          <div 
            key={item._id}
            className="bg-zinc-900 rounded-md p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-800 hover:border-zinc-700"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  {item.name.charAt(0)}
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-white font-semibold text-sm">
                    {item.name} {item.surname}
                  </h3>
                  <div className="flex items-center">
                    {startveri(item.star)}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-400">
                {item.createdAt}
              </span>
            </div>

            <div className="text-gray-200 text-xs leading-relaxed mb-2">
              {item.comment}
            </div>

            <div className="flex items-center pt-2 border-t border-zinc-800">
              <div>
                <button 
                  onClick={() => handleLike(item._id)} 
                  className="flex items-center space-x-1 text-white hover:text-red-800 transition-colors duration-200 text-xs"
                >
                  <ThumbsUp size={12} />
                  <span>Beğen {item.like}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Anasayfa;
