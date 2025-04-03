"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaBoxOpen } from "react-icons/fa";
import { Button } from "../components/ui/Button";
import LoadingSpinner from "../components/ui/loading";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface Order {
  _id: string;
  customerName: string;
  address: string;
  pickupDate: string;
  wasteType: string;
  contactNumber: string;
  timeSlot: string;
  status: string;
}

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/scheduled-orders`);
        setOrders(response.data);
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          console.error("Error fetching orders:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error fetching orders:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (id: string, newStatus: string) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/update-status/${id}`, { status: newStatus });

      if (response.status === 200) {
        setOrders(orders.map(order => order._id === id ? { ...order, status: newStatus } : order));
        toast.success(`Order status updated to ${newStatus}`);
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error("Error updating order status:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error updating order status:", error);
      }
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/delete/${id}`);
      if (response.status === 200) {
        setOrders(orders.filter(order => order._id !== id));
        toast.success("Order deleted successfully");
      }
    } catch (error: unknown) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    }
  };

  return (
    <div className="p-6 mt-20 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Scheduled Orders</h1>

      {loading ? (
        <LoadingSpinner />
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 w-full bg-white shadow-md rounded-lg p-6">
          <FaBoxOpen className="text-gray-400 text-5xl mb-2" />
          <p className="text-gray-500 text-lg font-semibold">No orders yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {orders.map((order) => (
            <div key={order._id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 transition-transform transform hover:scale-105">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">{order.customerName}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2"><strong>Address:</strong> {order.address}</p>
              <p className="text-gray-600 dark:text-gray-300"><strong>Pickup Date:</strong> {new Date(order.pickupDate).toLocaleDateString()}</p>
              <p className="text-gray-600 dark:text-gray-300"><strong>Waste Type:</strong> {order.wasteType}</p>
              <p className="text-gray-600 dark:text-gray-300"><strong>Contact:</strong> {order.contactNumber}</p>
              <p className="text-gray-600 dark:text-gray-300"><strong>Time Slot:</strong> {order.timeSlot}</p>
              <p className="text-gray-600 dark:text-gray-300"><strong>Status:</strong>
                <span className={`ml-2 px-2 py-1 text-sm rounded ${order.status === "Completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}>
                  {order.status}
                </span>
              </p>

              <div className="mt-4 flex space-x-2">
                {order.status !== "Completed" && (
                  <Button
                    onClick={() => updateOrderStatus(order._id, "Completed")}
                    className="bg-green-500 hover:bg-green-600 text-white w-full"
                  >
                    Mark as Completed
                  </Button>
                )}
                {order.status !== "Scheduled" && (
                  <Button
                    onClick={() => updateOrderStatus(order._id, "Scheduled")}
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full"
                  >
                    Mark as Scheduled
                  </Button>
                )}
                <Button
                  onClick={() => deleteOrder(order._id)}
                  className="bg-red-500 hover:bg-red-600 text-white w-full"
                >
                  Delete Order
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
