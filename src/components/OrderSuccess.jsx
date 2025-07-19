import { useLocation, Link } from "react-router-dom";
import { FiCheck, FiPackage, FiMail } from "react-icons/fi";

const OrderSuccess = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-30 px-6 md:px-12 pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#326287] mb-4">No order information found.</p>
          <Link
            to="/products"
            className="text-[#D59C8C] font-semibold underline hover:text-[#B3746E]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-30 px-6 md:px-12 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-[#D59C8C] rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="w-10 h-10 text-white" />
          </div>

          {/* Success Message */}
          <h2 className="text-3xl font-bold text-[#326287] mb-4">
            Order Confirmed!
          </h2>
          <p className="text-[#326287] mb-8">
            Thank you for your order. We'll send you a confirmation email
            shortly.
          </p>

          {/* Order Details */}
          <div className="border border-gray-200 rounded-lg p-6 mb-8 text-left">
            <div className="flex items-center gap-2 mb-4">
              <FiPackage className="text-[#D59C8C]" />
              <h3 className="font-semibold text-[#326287]">Order Details</h3>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-[#326287]">
                <span className="font-bold text-[#326287]">Order ID:</span>{" "}
                {orderData.orderId}
              </p>
              <p className="text-[#326287]">
                <span className="font-bold text-[#326287]">Total:</span>{" "}
                {orderData.total.toFixed(2)} €
              </p>
              <p className="text-[#326287]">
                <span className="font-bold text-[#326287]">Items:</span>{" "}
                {orderData.items.reduce(
                  (total, item) => total + (item.quantity || 1),
                  0
                )}
              </p>
            </div>

            <div className="border-t  border-gray-200 pt-4">
              <h4 className="font-bold text-[#326287] mb-2">Items Ordered:</h4>
              <ul className="space-y-2">
                {orderData.items.map((item) => (
                  <li
                    key={item.id}
                    className="text-[#326287]  flex justify-between"
                  >
                    <span className="text-[#326287] ">
                      {item.title} (x{item.quantity || 1})
                    </span>
                    <span className="font-medium">
                      {(parseFloat(item.price) * (item.quantity || 1)).toFixed(
                        2
                      )}{" "}
                      €
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <FiMail className="text-[#e8b09e]" />
              <h3 className="font-semibold text-[#326287] ">What's Next?</h3>
            </div>
            <ul className="text-left text-[#326287] space-y-2">
              <li>• You'll receive an email confirmation within 5 minutes</li>
              <li>• Your order will be processed within 1-2 business days</li>
              <li>• Shipping typically takes 3-5 business days</li>
              <li>• You'll receive tracking information once shipped</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to="/products"
              className="w-full bg-[#D59C8C] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#B3746E] transition-colors inline-block"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="w-full border border-[#326287] text-[#326287] font-semibold py-3 px-6 rounded-lg hover:bg-[#326287] hover:text-white transition-colors inline-block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
