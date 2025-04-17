export const buildQueryString = (filter, pageInfo) => {
  const params = new URLSearchParams();

  params.append("page", pageInfo.page);
  params.append("size", 10);
  params.append("sort", "updatedAt,desc");

  if (filter.location.length > 0) {
    params.append(
      "location",
      filter.location.map((item) => item.label).join(",")
    );
  }

  if (filter.skill.length > 0) {
    params.append("skills", filter.skill.map((item) => item.id).join(","));
  }

  if (filter.level) {
    params.append("level", filter.level);
  }

  if (filter.minSalary) {
    params.append("minSalary", filter.minSalary);
  }

  if (filter.maxSalary) {
    params.append("maxSalary", filter.maxSalary);
  }

  return params.toString();
};

export const parseQueryParams = (search, skills, locationArr) => {
  const params = new URLSearchParams(search);

  const location =
    params
      .get("location")
      ?.split(",")
      .map((item) => locationArr.find((sItem) => sItem.label == item)) || [];

  const skill =
    params
      .get("skills")
      ?.split(",")
      .map((item) => skills.find((sItem) => sItem.id == item)) || [];
  const level = params.get("level") || "";
  const minSalary = params.get("minSalary") || "";
  const maxSalary = params.get("maxSalary") || "";
  const page = params.get("page") || 1;
  const size = params.get("size") || 10;
  const sort = params.get("sort") || "updatedAt,desc";

  return {
    filter: {
      location,
      skill,
      level,
      minSalary,
      maxSalary,
    },
    pageInfo: {
      page,
      size,
      sort,
    },
  };
};
