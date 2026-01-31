/*
"use client"
import axios from 'axios';
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Layout from "../../src/components/Layout/Layout";
import Loading from "@/app/loading";


interface Item {
    _id: string;
    baslik: string;
    aciklama: string;
    resimUrl: string;
    createdAt: Date;
}

interface Props {
    hizmetler: Item[];
}

const Hizmetler: NextPage<Props> = ({ hizmetler }) => {

    if (!hizmetler) {
        return <Loading />;
    }

    return (
        <Layout>
            <div className="bgsss text-white">

                <section>
                    <div className="flex flex-col md:flex-row">
                        <div className="order-2 md:order-1 w-full md:w-1/2 flex justify-center items-center p-4 md:p-8">
                            <div>
                                <div className="text-center">
                                    <h2 className="text-3xl md:text-5xl font-thin pb-3">
                                        <span><strong>{hizmetler[0]?.baslik}</strong></span>
                                    </h2>
                                    <p className="text-xl md:text-2xl font-light">Fiyat Listesi</p>
                                </div>

                                <div className="flex flex-wrap justify-center">
                                    <ul className="font-extralight space-y-2 w-full max-w-md bg-[rgb(30,30,30)] rounded-lg p-6 shadow-lg">
                                        {hizmetler[0]?.aciklama?.split('\n').map((item, index) => {
                                            const parts = item.split(/\.+/);
                                            if (parts.length >= 2) {
                                                const service = parts[0].trim();
                                                const price = parts[parts.length - 1].trim();
                                                return (
                                                    <li key={index} className="flex justify-between items-center border-b border-gray-600 border-dotted pb-1">
                                                        <span>{service}</span>
                                                        <span>{price}</span>
                                                    </li>
                                                );
                                            }
                                            return null;
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await axios.get('https://serap.alwaysdata.net/hizmetler');
        return {
            props: {
                hizmetler: response.data
            }
        };
    } catch (error) {
        console.error('Veri çekme hatası:', error);
        return {
            notFound: true
        };
    }
};

export default Hizmetler;
*/
