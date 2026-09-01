import WavyFooterDecoration from "@/components/createPost/WavyFooterDecoration";
import { FaGithub, FaInstagram } from "react-icons/fa6";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/rainndev",
    icon: FaGithub,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/_rainngp/",
    icon: FaInstagram,
  },
];

/**
 * Landing page footer: wavy decoration edge, brand mark, creator credit,
 * and social links — all in the sketch/neubrutalist language.
 */
const Footer = () => {
  return (
    <footer className="relative mt-10 flex w-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 pb-8 text-center md:px-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="grid size-10 place-items-center rounded-full border-2 border-[#1f1c14] bg-white text-[#1f1c14] shadow-[3px_3px_0_#1f1c14] transition-all duration-100 hover:-rotate-6 hover:bg-[#a3e635] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  <Icon className="text-lg" />
                </a>
              );
            })}
          </div>
        </div>

        <p className="font-kalam text-xs font-bold text-[#1f1c14]/40">
          © {new Date().getFullYear()} Bulong · created by{" "}
          <span className="text-[#1f1c14] underline decoration-[#65a30d] decoration-2 underline-offset-4">
            Rainier Sison
          </span>
        </p>
      </div>

      {/* wavy decorative edge — full width, flush to the viewport bottom */}
      <WavyFooterDecoration />
    </footer>
  );
};

export default Footer;
