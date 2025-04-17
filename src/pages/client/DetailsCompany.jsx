import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/api";
import { Loading } from "../../components/share/Loading";
import parse from "html-react-parser";
import { FeaturedJobItem } from "../../components/client/home/FeaturedJobItem";

export const DetailsCompany = () => {
  const { companyId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiService.callFetchJobsByCompanyId(companyId);
        if (res.status === 200) {
          console.log("jobRelationRes", res);
          setCompany(res.data.data.company);
          setJobs(res.data.data.jobs);
        } else {
          console.error(res.statusText);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [companyId]);

  return (
    <div className="max-w-screen-xl py-10 px-5 mx-auto ">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="flex gap-10">
            <div className="w-full">
              <h1 className="text-4xl font-bold">{company.name}</h1>
              <div className="flex gap-5 mt-4">
                <div className="flex items-center gap-2">
                  Địa chỉ: {company.address}
                </div>
              </div>
              <div className="text-gray-500 mt-4">
                {parse(company.description)}
              </div>
            </div>
            <img
              className="w-40 h-40 rounded-lg object-cover"
              src={`${import.meta.env.VITE_IMAGE_URL}${company.logo}`}
              alt=""
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 my-5">
              Danh sách công việc của công ty
            </h2>
            <div className="flex flex-col gap-4">
              {jobs &&
                jobs.slice(0, 5).map((job, index) => {
                  return <FeaturedJobItem key={index} job={job} />;
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
