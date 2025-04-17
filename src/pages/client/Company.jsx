import React, { useEffect, useState } from "react";
import { Loading } from "../../components/share/Loading";
import ApiService from "../../service/api";
import { TopCompanyItem } from "../../components/client/home/TopCompanyItem";
import { Pagination } from "../../components/share/Pagination";

export const Company = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pages: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiService.callFetchCompany(
          `page=${pageInfo.page}&size=12&sort=updatedAt,desc`
        );
        if (res.data.statusCode === 200) {
          const data = res.data.data;
          setCompanies(data.result);
          setPageInfo({
            page: data.meta.page,
            pages: data.meta.pages,
          });
          console.log("fetch all company", res);
          setIsLoading(false);
        } else {
          console.error(res.statusText);
        }
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
  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-14 pt-5">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div>
          {companies.length > 0 ? (
            <>
              <div className="w-full h-full grid grid-cols-4 gap-4 mb-4">
                {companies.map((company, index) => {
                  return <TopCompanyItem key={index} company={company} />;
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
                Không có công ty nào được tìm thấy!
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
