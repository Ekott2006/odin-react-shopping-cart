import styles from "./../css/Shop.module.css";
import {Link, useOutletContext} from "react-router-dom";
import CartInput from "../components/CartInput.jsx";

export default function Shop() {
    const {data} = useOutletContext()

    return (
        <div>
            <h2 className={styles.h2}> All Products </h2>

            <ul className={styles.cardContainer}>
                {data.map((x) => (
                    <li className={styles.card} key={x.id}>
                        <img src={x.image} alt={x.title + " Image"} className={styles.cardImg}/>
                        <div className={styles.cardDetails}>
                            <Link to={`/products/${x.id}`} className={styles.cardLink}>
                                {x.title}
                            </Link>
                            <p>${x.price}</p>
                            {data && <CartInput id={x.id}/>}
                        </div>
                    </li>))}
            </ul>
        </div>
    );
}
