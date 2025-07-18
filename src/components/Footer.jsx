const Footer = () => {
  return (
    <footer className="bg-white text-[#326287] mt-16 p-16 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">FAQ</h3>
          <ul className="space-y-2">
            <li>
              <a href="/faq#payment-methods" className="hover:underline">
                Payment Methods
              </a>
            </li>
            <li>
              <a href="/faq#shipping" className="hover:underline">
                Shipping & Delivery Services
              </a>
            </li>
            <li>
              <a href="/faq#returns" className="hover:underline">
                Returns & Refunds
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">About Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="/faq#payment-methods" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="/faq#shipping" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/faq#returns" className="hover:underline">
                Legal Notice
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Newsletter</h3>
          <form>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-3 py-2 rounded mb-2 text-[#326287] placeholder-[#3262879c] border-1 focus:outline-none focus:ring-1 focus:ring-[#264a66]"
            />
            <button
              type="submit"
              className="w-full bg-[#326287] hover:bg-[#264a66] px-3 py-2 transition text-white rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;