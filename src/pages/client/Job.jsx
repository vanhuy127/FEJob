import React, { useEffect, useState } from "react";
import { Loading } from "../../components/share/Loading";
import ApiService from "../../service/api";
import { FeaturedJobItem } from "../../components/client/home/FeaturedJobItem";
import { Pagination } from "../../components/share/Pagination";
import { MultipleChoice } from "../../components/admin/MultipleChoice";
import {
  buildQueryString,
  parseQueryParams,
} from "../../utils/buildQueryString";
import { useLocation, useNavigate } from "react-router-dom";

const location = [
  {
    id: 1,
    name: "Hà Nội",
    label: "HANOI",
  },
  {
    id: 2,
    name: "Hồ Chí Minh",
    label: "HOCHIMINH",
  },
  {
    id: 3,
    name: "Đà Nẵng",
    label: "DANANG",
  },
  {
    id: 4,
    name: "Khác",
    label: "OTHER",
  },
];

export const Job = () => {
  const navigate = useNavigate();
  const locationHook = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pages: 0,
  });

  const [filter, setFilter] = useState({
    location: [],
    skill: [],
    level: "",
    minSalary: "",
    maxSalary: "",
  });

  useEffect(() => {
    if (skills.length > 0) {
      const { filter: parsedFilter, pageInfo } = parseQueryParams(
        locationHook.search,
        skills,
        location
      );
      // console.log("parse query: ", { filter: parsedFilter, pageInfo });

      setFilter(parsedFilter);
      setPageInfo((prev) => ({ ...prev, pageInfo }));
    }
  }, [skills]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = buildQueryString(filter, pageInfo);
        console.log("query", query);

        const [jobRes, skillRes] = await Promise.all([
          ApiService.callFetchJob(query),
          ApiService.callFetchAllSkill(`page=1&size=100&sort=updatedAt,desc`),
        ]);

        if (jobRes.data.statusCode === 200) {
          const data = jobRes.data.data;
          setJobs(data.result);
          setPageInfo({
            page: data.meta.page,
            pages: data.meta.pages,
          });
          console.log("fetch all jobs", jobRes);
        } else {
          console.error(jobRes.statusText);
        }

        if (skillRes.data.statusCode === 200) {
          const data = skillRes.data.data;
          setSkills(data.result);
          console.log("fetch all skills", skillRes);
        } else {
          console.error(skillRes.statusText);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [pageInfo.page]);

  const handlePageChange = (newPage) => {
    setPageInfo((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleSetLocation = (arr) => {
    setFilter((prev) => ({ ...prev, location: arr }));
  };

  const handleSetSkill = (arr) => {
    setFilter((prev) => ({ ...prev, skill: arr }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const query = buildQueryString(filter, pageInfo);
    console.log("query", query);
    navigate(`/job?${query}`);
    try {
      const jobRes = await ApiService.callFetchJob(query);

      if (jobRes.data.statusCode === 200) {
        const data = jobRes.data.data;
        setJobs(data.result);
        setPageInfo({
          page: data.meta.page,
          pages: data.meta.pages,
        });
      } else {
        console.error(jobRes.statusText);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("filter", filter);

  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-14 pt-5">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="mb-10 flex gap-4 items-center">
            <div className="flex-1">
              <div className=" flex gap-4 items-center mb-2">
                <MultipleChoice
                  label="Địa điểm"
                  list={location}
                  selected={filter.location}
                  setSelected={handleSetLocation}
                />
                <MultipleChoice
                  label="Kỹ năng"
                  list={skills}
                  selected={filter.skill}
                  setSelected={handleSetSkill}
                />
              </div>
              <div className="flex items-center gap-4">
                <select
                  name="level"
                  onChange={handleChange}
                  id="level"
                  value={filter.level}
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Chọn trình độ</option>
                  {[
                    { value: "INTERN", label: "INTERN" },
                    { value: "FRESHER", label: "FRESHER" },
                    { value: "JUNIOR", label: "JUNIOR" },
                    { value: "MIDDLE", label: "MIDDLE" },
                    { value: "SENIOR", label: "SENIOR" },
                  ].map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="minSalary"
                  id="minSalary"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Vui lòng nhập mức lương tối thiểu"
                  value={filter.minSalary}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="maxSalary"
                  id="maxSalary"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Vui lòng nhập mức lương tối đa"
                  value={filter.maxSalary}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-4 text-center  items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
          {jobs.length > 0 ? (
            <>
              <div className="flex flex-col gap-4 mb-4">
                {jobs.map((job, index) => {
                  return <FeaturedJobItem key={index} job={job} />;
                })}
              </div>
              <Pagination
                page={pageInfo.page}
                pages={pageInfo.pages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="text-2xl font-bold">
                Không có công việc nào được tìm thấy!
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
