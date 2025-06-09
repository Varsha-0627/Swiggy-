import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function Cart() {
    const data = useSelector((state) => state.cartStore);
    const [noContact, setNoContact] = useState(false);
    const [suggestion, setSuggestion] = useState("");

    const deliveryFee = data.length > 0 ? 95 : 0;
    const gst = data.length > 0 ? 47.03 : 0;
    const itemTotal = data.reduce((sum, item) => sum + item.cost, 0);
    const grandTotal = (itemTotal + deliveryFee + gst).toFixed(2);

    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.restaurant]) {
            acc[item.restaurant] = {
                area: item.area,
                items: [],
            };
        }
        acc[item.restaurant].items.push(item);
        return acc;
    }, {});

    function handlePayment() {
        if (data.length === 0) {
            alert("Cart is empty. Please add items before paying.");
            return;
        }
        console.log("Paying:", grandTotal);
        const options = {
            key:import.meta.env.VITE_RAZORPAY_KEY, 
            amount:Math.round(Number(grandTotal) * 100), 
            currency: "INR",
            handler: function (response) {
                alert("Payment ID: " + response.razorpay_payment_id);
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }



    return (
        <div className="cart">
            {Object.keys(groupedData).length === 0 ? (
                <div className="empty-cart">
                    <h2>Your cart is empty.</h2>
                    <div className="bill-box">
                        <h3>Bill Details</h3>
                        <div className="bill-line">
                            <span>Item Total</span>
                            <span><i className="bi bi-currency-rupee"></i>0</span>
                        </div>
                        <div className="bill-line">
                            <span>Delivery Fee</span>
                            <span><i className="bi bi-currency-rupee"></i>0</span>
                        </div>
                        <div className="bill-line">
                            <span>GST & Other Charges</span>
                            <span><i className="bi bi-currency-rupee"></i>0</span>
                        </div>
                        <hr />
                        <div className="bill-total">
                            <strong>TO PAY</strong>
                            <strong><i className="bi bi-currency-rupee"></i> 0.00</strong>
                        </div>
                        <div className="cart-btn">
                            <button className="pay-btn" disabled>Pay Now</button>
                        </div>
                    </div>
                </div>
            ) : (
                Object.entries(groupedData).map(([restaurant, group], index) => {
                    const groupTotal = group.items.reduce((sum, item) => sum + item.cost, 0);
                    const toPay = (groupTotal + deliveryFee + gst).toFixed(2);

                    return (
                        <div key={index} className="cart-sec">
                            <div className="cart-head">
                                <h2><i className="bi bi-fork-knife"></i> {restaurant}</h2>
                                <h4><i className="bi cart-hicon bi-geo-alt-fill"></i> {group.area}</h4>
                                <hr style={{ margin: "0" }} />
                            </div>

                            <div className="cart-scroller">
                                {group.items.map((x, i) => (
                                    <div key={i} className="cart-flex">
                                        <h3>{x.name}</h3>
                                        <h3><i className="bi bi-currency-rupee"></i>{x.cost}</h3>
                                    </div>
                                ))}

                                <div className="delivery-box">
                                    <textarea
                                        className="text-area"
                                        placeholder="Any suggestions? We will pass it on..."
                                        value={suggestion}
                                        onChange={(e) => setSuggestion(e.target.value)}
                                    ></textarea>

                                    <label className="no-contact-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={noContact}
                                            onChange={() => setNoContact(!noContact)}
                                        />
                                        <span>
                                            <strong>Opt in for No-contact Delivery </strong>
                                            Unwell, or avoiding contact? Please select no-contact
                                            delivery. Partner will safely place the order outside your
                                            door (not for COD).
                                        </span>
                                    </label>
                                </div>

                                <div className="bill-box">
                                    <h3>Bill Details</h3>
                                    <div className="bill-line">
                                        <span>Item Total</span>
                                        <span><i className="bi bi-currency-rupee"></i>{groupTotal}</span>
                                    </div>
                                    <div className="bill-line">
                                        <span>Delivery Fee</span>
                                        <span><i className="bi bi-currency-rupee"></i>{deliveryFee}</span>
                                    </div>
                                    <div className="bill-line">
                                        <span>GST & Other Charges</span>
                                        <span><i className="bi bi-currency-rupee"></i>{gst}</span>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div className="bill-total">
                                <strong>TO PAY</strong>
                                <strong><i className="bi bi-currency-rupee"></i> {toPay}</strong>
                            </div>

                            <div className="cart-btn">
                                <button className="pay-btn" onClick={handlePayment}>Pay Now</button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default Cart;
