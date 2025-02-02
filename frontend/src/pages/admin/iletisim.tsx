import axios from "axios";
import { GetServerSideProps } from "next";
import Layout from "./layoutpage";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Contact {
    _id: string;
    name: string;
    surname: string;
    phone: number;
    email: string;
    message: string;
    createdAt: string;
}

const IletisimPage = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('https://serap.alwaysdata.net/contact');
            setContacts(response.data);
            setLoading(false);
        } catch (error:unknown) {
            console.error('Veri yükleme hatası:', error);
            toast.error('Veriler yüklenirken hata oluştu!');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <Layout>
            <div className="p-4">
                <ToastContainer />
                <h1 className="text-2xl font-bold mb-6">İletişim Talepleri</h1>
                <div className="grid gap-4">
                    {contacts.map((contact) => (
                        <div key={contact._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600 text-sm">İsim:</p>
                                    <p className="font-medium">{contact.name} {contact.surname}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Telefon:</p>
                                    <p className="font-medium">{contact.phone}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Email:</p>
                                    <p className="font-medium">{contact.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Tarih:</p>
                                    <p className="font-medium">{new Date(contact.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-600 text-sm">Mesaj:</p>
                                <p className="text-gray-800 mt-1">{contact.message}</p>
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

export default IletisimPage;