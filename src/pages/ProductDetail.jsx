import { useOutletContext, useParams } from "react-router-dom";
import styles from "./../css/ProductDetail.module.css";
import CartInput from "../components/CartInput.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: dataArray } = useOutletContext();
  const data = dataArray.filter((x) => x.id == id)[0];
  if (!data) {
    return (
      <div className={styles.alert}>
        <h1>Error: Invalid ID</h1>
        <a href="/"> Go to Home </a>
      </div>
    );
  }
  return (
    <>
      <div className={styles.singleCard}>
        <img src={data.image} alt={data.title + " Image"} />
        <div className={styles.productDetail}>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <p>
            <b>Price: </b>${data.price}
          </p>
          <CartInput id={id} />
        </div>
      </div>
    </>
  );
}
