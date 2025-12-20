import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyOrdersRequest } from "../services/orderService";

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.email) return;

        const res = await getMyOrdersRequest(user.email);

        if (res?.success && res.orders?.length > 0) {
          setOrders(res.orders); // ✅ SHOW ALL ORDERS
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) return <div className="p-4">Please login to view orders</div>;
  if (loading) return <div className="p-4">Loading orders...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => (
            <div
              key={o._id}
              className="border rounded-xl p-5 bg-white shadow-sm"
            >
              {/* HEADER */}
              <div className="flex flex-wrap justify-between gap-2 text-sm text-gray-600 border-b pb-3 mb-4">
                <p><b>Order ID:</b> {o._id}</p>
                <p>
                  <b>Order Date:</b>{" "}
                  {new Date(o.createdAt).toLocaleString()}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={`font-medium ${o.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-yellow-600"
                      }`}
                  >
                    {o.paymentStatus}
                  </span>
                </p>
              </div>

              {/* CUSTOMER INFO (EMAIL ONLY) */}
              <div className="text-sm text-gray-700 mb-3">
                <p><b>Email:</b> {o.userEmail}</p>
              </div>

              {/* ITEMS */}
              <div className="space-y-2 border-t pt-3 mt-3">
                {o.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <p>
                      {item.name || "Product"} × {item.qty}
                    </p>
                    <p>₹{item.price * item.qty}</p>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4 border-t pt-3">
                <p className="font-semibold text-lg">
                  Total: ₹{o.totalAmount}
                </p>

                <a
                  href={`${import.meta.env.VITE_API_URL}/api/orders/invoice/${o._id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Download Invoice
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
