import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThumbsUp, Trash2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './layoutpage';
import { GetServerSideProps } from 'next';
interface Comment {
  _id: string;
  name: string;
  surname: string;
  comment: string;
  star: string;
  like: number;
  createdAt: string;
}

const Yorumlar = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get('https://serap.alwaysdata.net/comment');
      setComments(response.data);
    } catch (error:unknown) {
      console.log(error)
      toast.error('Yorumlar yüklenirken hata oluştu!');
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://serap.alwaysdata.net/comment/${id}`);
      toast.success('Yorum başarıyla silindi');
      fetchComments(); // Şimdi fetchComments'e erişebilir
    } catch (error:unknown) {
      console.log(error)
      toast.error('Yorum silinirken hata oluştu!');
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-4">Yorumlar</h1>
        <div className="grid gap-4">
          {comments.map((comment) => (
            <div key={comment._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold">
                    {comment.name} {comment.surname}
                  </h2>
                  <p className="text-gray-600 text-sm">{comment.comment}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <div className="flex items-center mr-4">
                      <ThumbsUp size={14} className="mr-1" />
                      {comment.like}
                    </div>
                    <div>⭐ {comment.star}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                {new Date(comment.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;
  
    const token = req.cookies[`accessToken`];
  
    if (!token) {
        return {
            redirect: {
                destination: '/seraphairstudio-panel',
                permanent: false,
            },
        };
    }
  
    try {
        await axios.get('https://serap.alwaysdata.net/verify-token', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
  
        return {
            props: {
                user: { name: 'User Name' },
            },
        };
    } catch (error) {
        console.log('Access token expired or invalid:', error);
  
        return {
            redirect: {
                destination: '/seraphairstudio-panel',
                permanent: false,
            },
        };
    }
  };
  
export default Yorumlar;