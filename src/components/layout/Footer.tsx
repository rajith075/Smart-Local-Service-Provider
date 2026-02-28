const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About SmartLocal</h3>
            <p className="text-gray-400 text-sm">
              Connecting you with trusted local service providers in your neighborhood.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">How It Works</a></li>
              <li><a href="#" className="hover:text-white">Become a Provider</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Home Cleaning</a></li>
              <li><a href="#" className="hover:text-white">Plumbing</a></li>
              <li><a href="#" className="hover:text-white">Electrical</a></li>
              <li><a href="#" className="hover:text-white">Painting</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📞 (555) 123-4567</li>
              <li>✉️ info@smartlocal.com</li>
              <li>📍 123 Main St, City, State</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} SmartLocal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;