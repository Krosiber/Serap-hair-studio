import React from 'react';
import Layout from "../../src/components/Layout/Layout";
import Image from 'next/image';
import { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';

interface Item {
    hakkimizda: string;
    altbaslik: string;
    imgUrl: string;
    createdAt: Date;
}

interface Props {
    kurumsal: Item;
}

const Kurumsal: NextPage<Props> = ({ kurumsal }) => {
    return (
        <Layout>
            <div className="bgsss min-h-screen text-gray-200">
                <div className="container mx-auto px-4 py-16 max-w-5xl">
                    <section className="bg-[rgb(30,30,30)] rounded-lg shadow-2xl overflow-hidden">
                        <div className="p-8 md:p-12">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
                                {kurumsal.hakkimizda}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                                {kurumsal.altbaslik}
                            </p>
                            <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                                <Image 
                                    src={kurumsal.imgUrl} 
                                    alt="Kurumsal Görsel" 
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await axios.get('https://serap-hair-studio.onrender.com/api/kurumsal');
        return {
            props: {
                kurumsal: response.data
            }
        };
    } catch (error) {
        console.error('Veri çekme hatası:', error);
        return {
            notFound: true
        };
    }
};

export default Kurumsal;