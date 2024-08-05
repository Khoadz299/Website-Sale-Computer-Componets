import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-10 mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p>
            We are a leading electronics components retailer, offering a wide
            range of products for all your tech needs. Quality and customer
            satisfaction are our top priorities.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>
            <strong>Email:</strong> support@electronicsstore.com
          </p>
          <p>
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p>
            <strong>Address:</strong> 123 Tech Street, San Francisco, CA
          </p>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p>
            Subscribe to our newsletter to get the latest updates and offers.
          </p>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 text-gray-800 rounded"
            />
            <button
              type="submit"
              className="mt-2 w-full bg-blue-600 p-2 rounded text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        <p>&copy; 2024 Electronics Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
