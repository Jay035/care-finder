"use client";
import { lazy } from "react";
import { sortByDate } from "@/utils/index";
import { useBlogContext } from "@/context/BlogContext";
import PostLoader from "@/components/PostLoader";
import { Navbar } from "@/components/Navbar";

const BlogPost = lazy(() => import("@/components/Blog/BlogPost"));

export default function Blog() {
  const { blogs } = useBlogContext();

  return (
    <div className="">
      <Navbar />
      <div
        id="healthCenter"
        className="px-[9.5vw] mt-10 mb-[97px] text-center flex flex-col items-center"
      >
        <h1 className="text-[#14532D] font-semibold lg:text-lg">
          OUR HEALTH CENTER
        </h1>
        <h2 className="text-[28px] md:text-[32px] w-full lg:text-5xl max-w-screen-md leading-10 mt-3 mb-[47px] font-bold tracking-tight">
          Read our latest medical and lifestyle articles
        </h2>
        {blogs ? blogs.length > 0 ? (
          <section className="grid gap-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 w-full ">
            {blogs?.map((post: any, index: number) => (
              <BlogPost post={post} key={index} />
            ))}
          </section>
        ) : (
          <PostLoader />
        ) : <p>Sorry...No blogs at the moment. Kindly check back later</p>}
      </div>
    </div>
  );
}
