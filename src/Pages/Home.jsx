import React, { useContext, useEffect, useRef, useState } from "react";
import Categories from "../Components/Categories";
import InfiniteScroll from "react-infinite-scroll-component";
import News from "../Components/News";
import Loader from "../Components/Loader";
import { CategoryContext } from "../Contexts/CategoryContext";
import { SearchContext } from "../Contexts/SearchContext";
import LoadingSpinner from "../Components/LoadingSpinner";
import {
  netlifyFetchFilteredNews,
  netlifyFetchNews,
} from "../../netlify/function/news";

export default function Home() {
  const [category] = useContext(CategoryContext);
  const [news, setNews] = useState([]);
  const [newsPage, setNewsPage] = useState(1);
  const [filteredNewsPage, setFilteredNewsPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [headlinesFilter, setHeadlinesFilter] = useState(false);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  const [openSearch] = useContext(SearchContext);

  function fetchNews() {
    // return fetch(
    //   `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=10&apiKey=${
    //     import.meta.env.VITE_NEWS_API_KEY
    //   }`
    // )
    //   .then((res) => res.json())
    //   .then((data) => data.articles);

    return netlifyFetchNews(category).then(
      (res) => JSON.parse(res.body).articles
    );
  }

  function fetchFilteredNews() {
    // return fetch(
    //   `https://newsapi.org/v2/everything?q=${searchQuery
    //     .trim()
    //     .toLowerCase()}&pageSize=10&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => data.articles)
    //   .catch((err) => {
    //     console.log("Error fetching news according to headline: ", err);
    //     return err;
    //   });

    return netlifyFetchFilteredNews(searchQuery).then(
      (res) => JSON.parse(res.body).articles
    );
  }

  useEffect(() => {
    searchRef?.current.focus();
  }, [openSearch, filteredNews]);

  useEffect(() => {
    setNews([]);
    fetchNews().then((data) => setNews(data ?? []));
    setNewsPage(1);
  }, [category]);

  useEffect(() => {
    fetchNews().then((data) => {
      setNews((prev) => [...prev, ...(data ?? [])]);
    });
  }, [newsPage]);

  useEffect(() => {
    fetchFilteredNews().then((data) =>
      setFilteredNews((prev) => [...prev, ...(data ?? [])])
    );
  }, [filteredNewsPage]);

  useEffect(() => {
    if (!searchQuery) {
      setHeadlinesFilter(false);
      return;
    }

    const debounceNewsSearch = setTimeout(() => {
      setFilteredNews([]);
      setHeadlinesFilter(true);
      setLoading(true);
      fetchFilteredNews()
        .then((filteredNews) => {
          setLoading(false);
          setFilteredNews(filteredNews);
        })
        .catch((err) => {
          setLoading(false);
          setFilteredNews([<h1>Error while fetching filtered news</h1>]);
          console.log("Error while fetching filtered news: ", err);
        });
    }, 600);

    return () => clearTimeout(debounceNewsSearch);
  }, [searchQuery]);

  return (
    <div>
      {!headlinesFilter ? (
        <main className="mx-auto w-[calc(100%-16px)] sm:w-[calc(100%-32px)] mt-42 md:mt-45">
          <div
            className={`${
              openSearch ? "h-[11] p-2" : "h-0 p-0"
            } transition-all max-w-[900px] mx-auto sticky top-[135px] z-2 bg-slate-200 shadow-xl rounded-4xl flex justify-center outline-none items-center mb-3`}
          >
            <input
              type="text"
              placeholder="Search headlines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`px-4 rounded-2xl w-full text-lg focus:outline-none focus:ring-0 focus-visible:ring-0 ${
                openSearch ? "h-[11]" : "h-0"
              }`}
              ref={searchRef}
            />
          </div>
          <InfiniteScroll
            dataLength={news.length}
            hasMore={true}
            loader={<Loader />}
            next={() => setNewsPage((prevState) => prevState + 1)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:gap-x-15">
              {news.map((article, ind) => (
                <News article={article} key={ind} ind={ind} />
              ))}
            </div>
          </InfiniteScroll>
        </main>
      ) : (
        <main className="mx-auto w-[calc(100%-16px)] sm:w-[calc(100%-32px)] mt-42 md:mt-45">
          <div
            className={`${
              openSearch ? "h-[11] p-2" : "h-0 p-0"
            } transition-all max-w-[900px] mx-auto sticky top-[135px] z-2 bg-slate-200 shadow-xl rounded-4xl flex justify-center outline-none items-center mb-3`}
          >
            <input
              type="text"
              placeholder="Search headlines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`px-4 rounded-2xl w-full text-lg focus:outline-none focus:ring-0 focus-visible:ring-0 ${
                openSearch ? "h-[11]" : "h-0"
              }`}
              ref={searchRef}
            />
          </div>
          <InfiniteScroll
            dataLength={filteredNews?.length}
            hasMore={true}
            loader={<Loader />}
            next={() => setFilteredNewsPage((prevState) => prevState + 1)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:gap-x-15">
              {filteredNews?.map((article, ind) => (
                <News article={article} key={ind} ind={ind} />
              ))}
            </div>
          </InfiniteScroll>
        </main>
      )}
      {/* <Loader /> */}
    </div>
  );
}
