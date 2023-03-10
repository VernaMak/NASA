import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [data, setData] = useState();

  const apiKey = "aj2KTDrWlTFvxGUCrGEHxImju5btAlaHW4GGSbmg";
  const url = `https://api.nasa.gov/techtransfer/patent/?q=10&engine&api_key=${apiKey}`
  const getTechTransferData = async () => {
    const res = await axios.get(url);
    const info = await res.data;
    console.log(info);
    setData(info)
  }

  useEffect(() => {
    getTechTransferData();
  },[])

  return (
    <>
      <Head>
        <title>Polychromatic</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.polychromatic}>
        <Link href="/polychromatic">Polychromatic</Link>
        </div>
       {
        data && data.results.map((tech, index) => {
          return(
            <div key={index} className={styles.imgbox}>
              {
                tech && tech.map((t, ind) => {
                  if(ind === 10) {
                    return(
                      <div >
                      <Image src={t} alt={t} key={ind} width={200} height={200} className={styles.img}/>
                      </div>
                    )
                  }
                })
              }
            </div>
          )
        })
       }
      </main>
    </>
  )
}
