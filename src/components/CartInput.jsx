import styles from "../css/CartInput.module.css";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useOutletContext} from "react-router-dom";

export default function CartInput({id}) {
    const {cart, setCart} = useOutletContext();
    

    const [cartItem, setCartItem] = useState({
        quantity: parseInt(cart[id] ?? 0),
        inCart: cart[id] >= 1,
    });

    const toggleInCart = () => {
        setCartItem((prev) => ({inCart: !prev.inCart, quantity: prev.inCart ? 0 : 1}));
    };

    const handleQuantityChange = (event) => {
        const quantity = parseInt(event.target.value);
        setCartItem((prev) => ({...prev, quantity}));
        
        if (!cartItem.inCart && quantity > 0) {
            toggleInCart();
        }
    };

    useEffect(() => {
        setCart(prev => ({...prev, [id]: cartItem.quantity}));
    }, [cartItem]);

    return (
        <div className={styles.cartContainer}>
            <input
                type="number"
                onInput={handleQuantityChange}
                value={cartItem.quantity}
                min={0}
                disabled={!cartItem.inCart}
            />
            <button
                onClick={toggleInCart}
                className={cartItem.inCart ? styles.inCartButton : undefined}
            >
                {cartItem.inCart ? "In Cart" : "Add to Cart"}
            </button>
        </div>
    );
}

CartInput.propTypes = {
    id: PropTypes.any.isRequired,
};
