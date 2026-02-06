import { socials } from "@/constants";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="flex justify-between text-3xl gap-7 w-[80%] mx-auto border-t border-dark-4 py-11 max-sm:flex-col max-sm:items-center max-sm:text-base max-sm:gap-4 max-sm:py-8 max-sm:w-[90%] max-sm:px-2 overflow-hidden">
      <div className="flex flex-wrap max-sm:justify-center max-sm:gap-1">
        <Link className="footer-link" to="" onClick={handleScrollToTop}>
          ^
        </Link>
        <span className="max-sm:hidden"> •</span>
        <Link
          className="footer-link max-sm:mx-2"
          to={socials.github}
          target="_blank"
        >
          {" "}
          github
        </Link>
        <span className="max-sm:hidden"> •</span>
        <Link
          className="footer-link max-sm:mx-2"
          to={socials.twitter}
          target="_blank"
        >
          {" "}
          twitter
        </Link>
        <span className="max-sm:hidden"> •</span>
        <Link
          className="footer-link max-sm:mx-2"
          to={socials.linkedin}
          target="_blank"
        >
          {" "}
          linkedin
        </Link>
        <span className="max-sm:hidden"> •</span>
        <Link
          className="footer-link max-sm:mx-2"
          to={socials.instagram}
          target="_blank"
        >
          {" "}
          instagram
        </Link>
      </div>
      <p className="footer-text max-sm:text-base max-sm:text-zinc-500">© {new Date().getFullYear()} Clarence Franklin</p>
    </footer>
  );
};

export default Footer;
