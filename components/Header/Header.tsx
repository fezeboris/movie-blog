import Link from "next/link";
import Image from "next/image";
import smallLogo from "../../public/rmdb-logo-small.svg";
import largeLogo from "../../public/rmdb-logo.svg";
import SearchInput from "../SearchInput/SearchInput";
import { useRouter } from "next/router";
// components
type Props = {
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
};

const Header = ({ setQuery }: Props) => {
  const { locale, locales, push } = useRouter();
  // console.log("locales==", locale, locales);
  const handleClick = (l: string) => {
    // console.log(l);
    push("/", undefined, { locale: l });
  };
  return (
    <div className="sticky flex top-0 z-40 w-full h-20 bg-zinc-900 p-2">
      <div className="flex justify-between w-full m-auto h-full max-w-7xl px-4">
        <Link href="/">
          <div className="flex items-center cursor-pointer ">
            <div className="invisible md:visible ">
              <Image width={150} height={50} src={largeLogo} alt="" />
            </div>
            <div className="absolute md:invisible pt-2">
              <Image width={150} height={42} src={smallLogo} alt="" />
            </div>
          </div>
        </Link>
        {setQuery ? (
          <div className="relative flex items-center">
            <SearchInput setQuery={setQuery} />
          </div>
        ) : null}
      </div>
      {locales?.map((l) => (
        // <button
        //   onClick={(e) => {
        //     handleClick(l);
        //   }}
        //   key={l}
        //   className="bg-slate-300 h-5 w-5 m-auto rounded "
        // >
        //   {l}

        // </button>
        <button key={l} className="bg-slate-300 h-5 w-5 m-auto rounded ">
          <Link href={"/"} locale={l}>
            {l}
          </Link>
        </button>
      ))}
    </div>
  );
};

export default Header;
