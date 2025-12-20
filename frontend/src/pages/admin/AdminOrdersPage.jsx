import React, { useEffect, useState, useMemo } from "react";
import api from "../../services/apiClient";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        // normalize status casing to lowercase for consistent UI handling
        const list = (res.data.orders || []).map(o => ({
          ...o,
          status: o.status ? o.status.toLowerCase() : "pending"
        }));
        setOrders(list);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = 
        (o._id && o._id.toLowerCase().includes(search.toLowerCase())) ||
        (o.shippingAddress && o.shippingAddress.toLowerCase().includes(search.toLowerCase()));
      const orderStatus = o.status ? o.status.toLowerCase() : "pending";
      // By default hide cancelled orders from the main list unless explicitly filtering for them
      const matchesStatus = filterStatus === "all" ? orderStatus !== "cancelled" : orderStatus === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, filterStatus]);

  const updateStatus = async (orderId, newStatus) => {
    // Status workflow validation
    const currentOrder = orders.find(o => o._id === orderId);
    const currentStatus = (currentOrder?.status || "pending").toLowerCase();
    const normalizedNewStatus = newStatus.toLowerCase();

    const validTransitions = {
      "pending": ["processing", "cancelled"],
      "processing": ["shipped", "cancelled"],
      "shipped": ["delivered", "cancelled"],
      "delivered": [],
      "cancelled": []
    };

    const allowed = validTransitions[currentStatus]?.includes(normalizedNewStatus);
    if (!allowed) {
      const proceed = window.confirm(
        `This transition from ${currentStatus} → ${normalizedNewStatus} is not the normal workflow. Do you want to force it?`
      );
      if (!proceed) {
        setStatusMessage({
          type: "error",
          text: `Transition cancelled: ${currentStatus} → ${normalizedNewStatus}`
        });
        setTimeout(() => setStatusMessage(null), 3000);
        return;
      }
    }

    const confirm = window.confirm(`Update order status from ${currentStatus} to ${normalizedNewStatus}?`);
    if (!confirm) return;

    setUpdatingOrderId(orderId);
    try {
      await api.put(`/orders/${orderId}`, { status: normalizedNewStatus });
        // refresh orders from server to ensure authoritative state
        const refreshed = await api.get('/orders');
        const list = (refreshed.data.orders || []).map(o => ({
          ...o,
          status: o.status ? o.status.toLowerCase() : 'pending'
        }));
        // Keep all orders in state (including cancelled) so stats reflect accurately;
        // the filtered view will hide cancelled orders by default.
        setOrders(list);
      setStatusMessage({
        type: "success",
        text: `Order status updated to ${normalizedNewStatus.charAt(0).toUpperCase() + normalizedNewStatus.slice(1)}`
      });
      setTimeout(() => setStatusMessage(null), 2000);
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: "Failed to update order status: " + (err.response?.data?.message || err.message)
      });
      setTimeout(() => setStatusMessage(null), 3000);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      "pending": "bg-yellow-100 text-yellow-800",
      "processing": "bg-blue-100 text-blue-800",
      "shipped": "bg-purple-100 text-purple-800",
      "delivered": "bg-green-100 text-green-800",
      "cancelled": "bg-red-100 text-red-800"
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    const icons = {
      "pending": "⏳",
      "processing": "🔄",
      "shipped": "📦",
      "delivered": "✅",
      "cancelled": "❌"
    };
    return icons[status?.toLowerCase()] || "📋";
  };

  const getStatusDescription = (status) => {
    const descriptions = {
      "pending": "Awaiting processing",
      "processing": "Being prepared for shipment",
      "shipped": "On the way to customer",
      "delivered": "Successfully delivered",
      "cancelled": "Order cancelled"
    };
    return descriptions[status?.toLowerCase()] || "";
  };

  const getValidNextStatuses = (currentStatus) => {
    const normalized = (currentStatus || "pending").toLowerCase();
    const transitions = {
      "pending": ["processing", "cancelled"],
      "processing": ["shipped", "cancelled"],
      "shipped": ["delivered", "cancelled"],
      "delivered": [],
      "cancelled": []
    };
    return transitions[normalized] || [];
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => (o.status || "").toLowerCase() === "pending").length,
    delivered: orders.filter(o => (o.status || "").toLowerCase() === "delivered").length,
    cancelled: orders.filter(o => (o.status || "").toLowerCase() === "cancelled").length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  const statuses = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage all customer orders with smart status workflows</p>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className={`mb-6 p-4 rounded-lg font-semibold ${
            statusMessage.type === "success" 
              ? "bg-green-50 text-green-700 border border-green-200" 
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {statusMessage.type === "success" ? "✓" : "✕"} {statusMessage.text}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-medium">Delivered</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.delivered}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-red-500">
            <p className="text-gray-600 text-sm font-medium">Cancelled</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{stats.cancelled}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
              <input
                type="text"
                placeholder="Search by Order ID or Address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status Filter</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Orders" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-gray-600 font-semibold">No orders found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const validNextStatuses = getValidNextStatuses(order.status);
              return (
                <div key={order._id} className="bg-white rounded-2xl shadow hover:shadow-lg transition">
                  
                  {/* Order Header - Always Visible */}
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition text-left"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-lg font-semibold text-gray-900">Order #{order._id?.slice(-8)}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1 ${getStatusBadgeColor(order.status)}`}>
                          {getStatusIcon(order.status)} {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                        </span>
                      </div>
                      <div className="flex gap-6 text-sm text-gray-600">
                        <span>📍 {order.shippingAddress || "N/A"}</span>
                        <span>💰 ₹{order.totalAmount || 0}</span>
                        <span>📦 {order.items?.length || 0} items</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={`text-2xl transition ${expandedOrder === order._id ? "rotate-180" : ""}`}>
                        ▼
                      </span>
                    </div>
                  </button>

                  {/* Order Details - Expandable */}
                  {expandedOrder === order._id && (
                    <>
                      <div className="border-t border-gray-200"></div>
                      <div className="px-6 py-4 space-y-4">
                        
                        {/* Order Items */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                            {order.items && order.items.length > 0 ? (
                              order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm">
                                  <span className="text-gray-700">
                                    {item.name} <span className="text-gray-500">× {item.quantity}</span>
                                  </span>
                                  <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500 text-sm">No items</p>
                            )}
                          </div>
                        </div>

                        {/* Order Details Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 font-medium">Payment Method</p>
                            <p className="text-lg font-semibold text-gray-900 mt-1">{order.paymentMethod || "UPI"}</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 font-medium">Total Amount</p>
                            <p className="text-lg font-semibold text-green-600 mt-1">₹{order.totalAmount || 0}</p>
                          </div>
                        </div>

                        {/* Customer Info */}
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-white p-4 rounded-lg border">
                            <p className="text-sm text-gray-600">Customer Name</p>
                            <p className="font-semibold text-gray-900">{order.userName || order.customerName || '—'}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border">
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-semibold text-gray-900">{order.userEmail || order.email || '—'}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border">
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="font-semibold text-gray-900">{order.phone || order.contact || order.contactNumber || '—'}</p>
                          </div>
                        </div>

                        {/* Status Update Section */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <span>📋</span> Update Status
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => updateStatus(order._id, "processing")}
                              disabled={updatingOrderId === order._id || order.status?.toLowerCase() === "processing"}
                              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                              {updatingOrderId === order._id ? "Updating..." : "🔄 Processing"}
                            </button>
                            <button
                              onClick={() => updateStatus(order._id, "shipped")}
                              disabled={updatingOrderId === order._id || order.status?.toLowerCase() === "shipped"}
                              className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                              {updatingOrderId === order._id ? "Updating..." : "📦 Shipped"}
                            </button>
                            <button
                              onClick={() => updateStatus(order._id, "delivered")}
                              disabled={updatingOrderId === order._id || order.status?.toLowerCase() === "delivered"}
                              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                              {updatingOrderId === order._id ? "Updating..." : "✅ Delivered"}
                            </button>

                            <button
                              onClick={() => updateStatus(order._id, "cancelled")}
                              disabled={updatingOrderId === order._id || order.status?.toLowerCase() === "cancelled"}
                              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                              {updatingOrderId === order._id ? "Updating..." : "✖ Cancel Order"}
                            </button>
                          </div>
                        </div>

                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Summary */}
        {filteredOrders.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-4 mt-6 text-center text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredOrders.length}</span> of <span className="font-semibold">{orders.length}</span> orders
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminOrdersPage;
