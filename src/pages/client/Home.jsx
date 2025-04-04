import React from "react";
import { Banner } from "../../components/client/home/Banner";
import { FeaturedJob } from "../../components/client/home/FeaturedJob";
import { FeaturedCategory } from "../../components/client/home/FeaturedCategory";

export const Home = () => {
  return (
    <>
      <Banner />
      <FeaturedCategory />
      <FeaturedJob />
    </>
  );
};
