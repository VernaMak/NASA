import { useEffect, useState } from "react"
import axios from "axios";
import Image from "next/image";
import styles from "styles/Home.module.css"

export default function Polychromatic() {
    const [image, setImage] = useState([]);
    const [images, setImages] = useState([]);
    const [time, setTime] = useState('Loading');
    const [date, setDate] = useState('');
    const [coords, setCoords] = useState({});

    const apiKey = "aj2KTDrWlTFvxGUCrGEHxImju5btAlaHW4GGSbmg";
    const url = `https://epic.gsfc.nasa.gov/api/natural?api_key=${apiKey}`

    const getPolychromaticData = async () => {
            const res = await axios.get(url);
            const data = await res.data;
            console.log(data);

            const caption = data[0].caption;
            const date = data[0].date.split(" ") [0];

            const date_formatted = date.replaceAll("-","/")
            console.log(date_formatted);

            let times = [];
            let images = [];

            for(let i = 0; i < data.length; i++) {
                let time = data[i].date.split(" ")[1];
                let coords = data[i].centroid_coordinates;
                let imagePath = data[i].image;
                let image = `https://epic.gsfc.nasa.gov/archive/natural/${date_formatted}/png/${imagePath}.png`

                times.push(time);
                images.push({
                    image: image,
                    time: time,
                    coords: coords
                })
            }

            setDate(date);
            setImages(images);

            setImage(images[0].image);
            setTime(time[0])
            setCoords([images[0].coords.lat, images[0].coords.lon])

            console.log(image)
    }

    useEffect(() => {
        getPolychromaticData();
    }, [])


    return(
        <>
        <div className={styles.p_bg}>
        <div className={styles.p_title}>
        Polychromatic
        </div>
        <div className={styles.p_img_cnt}>
        <Image src={image} alt={image} width={200} height={200} className={styles.p_img} />
        </div>
        <div className={styles.tr_p}>{time}</div>
        <div className={styles.tr_p}>{coords[0]},{coords[1]}</div>
        <div className={styles.p_img_cnt}>
        <table className={styles.tr_text}>
            <thead>
                <tr >
                    <th>Time</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Image</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    images.map((e, i) => {
                        return(
                     
                            <tr key={i}>
                                <td>{e.time}</td>
                                <td>{e.coords.lat}</td>
                                <td>{e.coords.lon}</td>
                                <td><Image src={e.image} alt={i} width={200} height={200} className={styles.p_small_img}/></td>
                                <td>
                                    <button onClick={() => {
                                        setImage(e.image);
                                        setTime(e.time);
                                        setCoords([e.coords.lat, e.coords.lon])
                                        console.log(images[i].image)
                                        document.body.scrollIntoView();
                                    }} className={styles.p_bnt}>View</button>
                                </td>
                            </tr>
                      
                        )
                    })
                }
            </tbody>
        </table>
        </div>
        </div>
        </>
        
    )
}