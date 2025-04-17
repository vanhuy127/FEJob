import React, { use, useEffect, useState } from "react";
import { Banner } from "../../components/client/home/Banner";
import { FeaturedJob } from "../../components/client/home/FeaturedJob";
import { FeaturedCategory } from "../../components/client/home/FeaturedCategory";
import { TopCompany } from "../../components/client/home/TopCompany";
import ApiService from "../../service/api";
import { Loading } from "../../components/share/Loading";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyRes, jobRes] = await Promise.all([
          ApiService.callFetchCompany(`page=1&size=8&sort=updatedAt,desc`),
          ApiService.callFetchJob(`page=1&size=5&sort=updatedAt,desc`),
        ]);

        if (companyRes.data.statusCode === 200) {
          const data = companyRes.data.data;
          setCompanies(data.result);
          // console.log("company res", companyRes);
        } else {
          console.error(res.statusText);
        }

        if (jobRes.data.statusCode === 200) {
          const data = jobRes.data.data;
          setJobs(data.result);
          // console.log("jobs res", jobRes);
        } else {
          console.error(res.statusText);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <Banner />
          <FeaturedJob list={jobs} />
          <TopCompany list={companies} />
        </>
      )}
    </>
  );
};
