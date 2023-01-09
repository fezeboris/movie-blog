import React from "react";
import Image from "next/image";
// Helpers
import { calcTime, convertMoney } from "../../helpers";
// components
import { Thumb } from "../Thumb/Thumb";
import Pill from "../Pill/Pill";
// types
import { Crew } from "../../api/types";
// Translation
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";

type Props = {
  thumbUrl: string;
  backgroundImgUrl: string;
  title: string;
  year: string;
  summary: string;
  rating: string;
  directors: Crew[];
  time: number;
  budget: number;
  revenue: number;
};
export const MovieInfo = ({
  backgroundImgUrl,
  budget,
  directors,
  rating,
  revenue,
  summary,
  thumbUrl,
  time,
  title,
  year,
}: Props) => {
  // const { t: translate } = useTranslation("details");
  return (
    <div className="relative w-full h-auto p-4">
      <div className="relative h-full min-h-128 flex flex-col md:flex-row max-w-7xl p-4 m-auto z-10 rounded-xl bg-zinc-800 bg-opacity-90">
        <div className="relative w-full h-96 md:h-auto md:w-1/3">
          <Thumb imgUrl={thumbUrl} />
          <div className="absolute top-4 left-4 rounded-full bg-white w-10 h-10 flex justify-center items-center text-black text-sm font-bold">
            {rating}
          </div>
        </div>
        <div className="text-white px-0 py-4 md:py-0 text-center md:text-left md:px-8 w-full md:w-2/3">
          <h2 className="text-2xl md:text-4xl font-bold pb-4 ">
            {" "}
            {title} ({year})
          </h2>
          <h3 className="text-lg font-bold">Summary</h3>
          {/* {translate("summary")} */}
          <p className="mb-8 text-sm md:text-lg"> {summary}</p>
          <div>
            <div>
              <h3 className="text-lg font-bold">
                {/* {translate("director")} */}
                Director
                {directors.length > 1 ? "s" : ""}
              </h3>
              <div>
                {directors.map((director) => (
                  <p key={director.credit_id}>{director.name}</p>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-bold">Movie data</h3>
              {/* {translate("data")} */}
              <Pill
                className="ml-0"
                text={`Running Time: ${calcTime(time)}`}
                // ${translate("running")}
              />
              <Pill text={`Budget: ${convertMoney(budget)}`} />
              {/* ${translate("budget")} */}
              <Pill
                text={`Revenue: ${convertMoney(revenue)}`}
                // ${translate("revenue")}
              />
            </div>
          </div>
        </div>
      </div>
      <Image
        priority
        placeholder="blur"
        blurDataURL="/placeholder.jpg"
        objectFit="cover"
        objectPosition="center"
        layout="fill"
        src={backgroundImgUrl}
        alt="thumb"
      />
    </div>
  );
};
// export const getStaticProps: GetStaticProps = async (context) => {
//   const locale = context.locale as string;
//   console.log("hello", locale);

//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["details"])),
//     },
//   };
// };
