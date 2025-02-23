// import logo from "../assets/images/logo (1).png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r container mx-auto font-lato from-green-400 to-blue-400 text-white py-10 px-5">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="text-4xl font-semibold mb-6 md:mb-0 text-black">JobXplore</div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 font-semibold text-sm">
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul>
                <li>
                  <a href="#" className="hover:underline">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Graphic Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Content Writing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul>
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul>
                <li>
                  <a href="#" className="hover:underline">
                    Forums
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t font-semibold text-sm border-gray-300 mt-8 pt-5 flex flex-col md:flex-row justify-between items-center text-gray-200">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Affiliate Program
            </a>
            <a href="#" className="hover:underline">
              Cookie Policy
            </a>
          </div>
          <div>Copyright JobXplore, Inc. 2023. All Rights Reserved.</div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-200 hover:text-white">
              YouTube
            </a>
            <a href="#" className="text-gray-200 hover:text-white">
              LinkedIn
            </a>
            <a href="#" className="text-gray-200 hover:text-white">
              Instagram
            </a>
            <a href="#" className="text-gray-200 hover:text-white">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
