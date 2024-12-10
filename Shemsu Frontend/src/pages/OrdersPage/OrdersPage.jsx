import { React, useState, useEffect } from "react";
import styles from "./OrdersPageStyle.module.css";
import { csrfToken } from "../LoginPage/LoginPage.jsx";
import NavBar from "../../NavBar/Navbar";
import ThemeSwitch from "../../ThemeSwitch/ThemeSwitch";
import MessageHandler from "../../MessageHandler/MessageHandler";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [messageIcon, setMessageIcon] = useState("");
  const apiUrl = import.meta.env.VITE_API;

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch(`${apiUrl}/auth/check`, {
        method: "GET",
        credentials: "include",
        headers: {
          "x-csrf-token": csrfToken,
        },
      });
      if (!response.ok) {
        setMessage("No User Signed In");
        setMessageIcon("Error");
      }
    };
    checkAuth();
  }, [apiUrl]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`${apiUrl}/order/history`, {
        method: "GET",
        headers: {
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        setMessage("Failed to fetch orders");
        setMessageIcon("Error");
      }
    };
    fetchOrders();
  }, []);

  const handleFinishOrder = async (orderId) => {
    const response = await fetch(`${apiUrl}/order/finish/${orderId}`, {
      method: "PATCH",
      headers: {
        "x-csrf-token": csrfToken,
      },
      credentials: "include",
    });

    if (response.ok) {
      setMessage("Order Finished Successfully");
      setMessageIcon("Success");
      navigate("/orders");
    } else {
      setMessage("Failed to finish order");
      setMessageIcon("Error");
    }
  };

  const handleCancelOrder = async (orderId) => {
    const response = await fetch(`${apiUrl}/order/cancel/${orderId}`, {
      method: "PATCH",
      headers: {
        "x-csrf-token": csrfToken,
      },
      credentials: "include",
    });

    if (response.ok) {
      setMessage("Order Cancelled Successfully");
      setMessageIcon("Success");
      navigate("/orders");
    } else {
      setMessage("Failed to cancel order");
      setMessageIcon("Error");
    }
  };

  return (
    <div className={styles.ordersPage}>
      <NavBar />
      <div className={styles.mainContent}>
        <ThemeSwitch />
        <h1 className={styles.orderPageTitle}>Orders</h1>
        <div className={styles.ordersCatalog}>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div className={`${styles.orderCard}`} key={order._id}>
                <img
                  src={order.ProductImageURL}
                  alt={order.ProductName}
                  className={`${styles.orderImage}`}
                />
                <div className={`${styles.orderDetails}`}>
                  <h2 className={`${styles.orderProductName}`}>
                    {order.ProductName}
                  </h2>
                  <p className={`${styles.orderBuyer}`}>Buyer: {order.Buyer}</p>
                  <p className={`${styles.orderBuyerPhone}`}>
                    Buyer Phone: {order.BuyerPhone}
                  </p>
                  <p className={`${styles.orderQuantity}`}>
                    {order.Quantity} Ordered
                  </p>
                  <p className={`${styles.orderDate}`}>
                    Date of Order: {order.OrderDate}
                  </p>
                  <p className={`${styles.orderStatus}`}>
                    Order Status: {order.OrderStatus}
                  </p>
                  <p className={`${styles.orderPrice}`}>
                    {`Birr ${order.Price.toFixed(2)}`}
                  </p>
                </div>
                <div className={`${styles.orderActions}`}>
                  <button
                    type="button"
                    className={`${styles.finishOrderBtn} ${styles.orderBtn}`}
                    onClick={() => handleFinishOrder(order._id)}
                  >
                    Finish
                  </button>
                  <button
                    type="button"
                    className={`${styles.cancelOrderBtn} ${styles.orderBtn}`}
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2>No Orders</h2>
          )}
        </div>
      </div>
      {message && (
        <MessageHandler
          message={message}
          redirect="login"
          setMessage={setMessage}
          messageIcon={messageIcon}
        />
      )}
    </div>
  );
}

export default OrdersPage;
