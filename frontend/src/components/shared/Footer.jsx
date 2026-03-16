import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link className="flex-shrink-0" to="/">
            <h1 className="font-bold text-2xl tracking-tight">
              Cổng Việc <span className="text-[#F83002]">Làm</span>
            </h1>
          </Link>

          <div className="flex items-center gap-6">
            <a
              aria-label="Facebook"
              className="text-gray-400 hover:text-white transition-colors"
              href="https://facebook.com"
              rel="noreferrer"
              target="_blank"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              aria-label="Twitter"
              className="text-gray-400 hover:text-white transition-colors"
              href="https://twitter.com"
              rel="noreferrer"
              target="_blank"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-white transition-colors"
              href="https://www.linkedin.com"
              rel="noreferrer"
              target="_blank"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Cổng Việc Làm. Bảo lưu mọi quyền.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
