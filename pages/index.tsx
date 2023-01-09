import type { NextPage } from "next";
import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
// fetch hook

import { useFetchMovies } from "../api/fetchhooks";
import Head from "next/head";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Grid from "../components/Grid/Grid";
import Card from "../components/Card/Card";
import Spinner from "../components/Spinner/Spinner";

// Translation
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
// config
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "../config";
const Home: NextPage = () => {
  const [query, setQuery] = React.useState("");
  const { data, fetchNextPage, isLoading, isFetching, error } =
    useFetchMovies(query);
  // console.log(data);
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) fetchNextPage();
  };
  const { locale } = useRouter();
  // console.log("locales==", locale, locales);
  const { t: translate } = useTranslation("home");
  if (error)
    return (
      <div className="text-center mt-10 text-red-600">
        {" "}
        Something went wrong!
      </div>
    );

  return (
    <>
      <Head>
        <title>{translate("home")}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        onScroll={handleScroll}
        className="relative h-screen overflow-y-scroll"
      >
        <Header setQuery={setQuery} />
        {!query && data && data.pages ? (
          <Hero
            imgUrl={
              data?.pages[0].results[0]?.backdrop_path
                ? IMAGE_BASE_URL +
                  BACKDROP_SIZE +
                  data.pages[0].results[0]?.backdrop_path
                : "/no_image.jpg"
            }
            title={data.pages[0].results[0].title}
            text={data.pages[0].results[0].overview}
          />
        ) : null}
        <Grid
          className="p-4 max-w-7xl m-auto"
          title={
            query
              ? `${translate("searchR")}: ${data?.pages[0].total_results}`
              : `${translate("popular")}`
          }
        >
          {data && data.pages
            ? data.pages.map((page) =>
                page.results.map((movie) => (
                  <Link key={movie.id} href={`/${movie.id}`}>
                    <div className="cursor-pointer hover:opacity-80 duration-300">
                      <Card
                        imgUrl={
                          movie.poster_path
                            ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                            : "/no_image.jpg"
                        }
                        title={movie.original_title}
                      />
                    </div>
                  </Link>
                ))
              )
            : null}
        </Grid>

        {isLoading || isFetching ? <Spinner /> : null}
      </main>
    </>
  );
};
export default Home;
export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as string;
  // console.log("hello", locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["home"])),
    },
  };
};
