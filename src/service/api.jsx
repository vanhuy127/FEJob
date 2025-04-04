import axiosInstance from "./axios-custom";
class ApiService {
  // static getHeader() {
  //   // const token = localStorage.getItem("token");
  //   const token =
  //     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJockBnbWFpbC5jb20iLCJwZXJtaXNzaW9uIjpbIlJPTEVfVVNFUl9DUkVBVEUiLCJST0xFX1VTRVJfVVBEQVRFIl0sImV4cCI6MTc1MTk2MjQzNiwiaWF0IjoxNzQzMzIyNDM2LCJ1c2VyIjp7ImlkIjo0LCJlbWFpbCI6ImhyQGdtYWlsLmNvbSIsIm5hbWUiOiJTb24gVHJhbiJ9fQ.5be4djnLumnu_eJsrdsqTD2tDs346gYUnCsKqpj-QC_3qGqw_2UZhviMPBl2Y2fx6dI2ndWxQzbrn5yJK3fQ3w";
  //   return {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   };
  // }

  /** Module Auth */
  static callRegister(name, email, password, age, gender, address) {
    return axiosInstance.post("/api/v1/auth/register", {
      name,
      email,
      password,
      age,
      gender,
      address,
    });
  }

  static callLogin(username, password) {
    return axiosInstance.post("/api/v1/auth/login", { username, password });
  }

  static callFetchAccount() {
    return axiosInstance.get("/api/v1/auth/account");
  }

  static callRefreshToken() {
    return axiosInstance.get("/api/v1/auth/refresh");
  }

  static callLogout() {
    return axiosInstance.post("/api/v1/auth/logout");
  }

  /** Upload single file */
  static callUploadSingleFile(file, folderType) {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    bodyFormData.append("folder", folderType);

    return axiosInstance.post(`/api/v1/files`, bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
  }

  /** Module Company */
  static callCreateCompany(name, address, description, logo) {
    return axiosInstance.post(`/api/v1/companies`, {
      name,
      address,
      description,
      logo,
    });
  }

  static callUpdateCompany(id, name, address, description, logo) {
    return axiosInstance.put(`/api/v1/companies`, {
      id,
      name,
      address,
      description,
      logo,
    });
  }

  static callDeleteCompany(id) {
    return axiosInstance.delete(`/api/v1/companies/${id}`);
  }

  static callFetchCompany(query) {
    if (query === "") {
      return axiosInstance.get(`/api/v1/companies`);
    }

    return axiosInstance.get(`/api/v1/companies?${query}`);
  }

  static callFetchCompanyById(id) {
    return axiosInstance.get(`/api/v1/companies/${id}`);
  }

  /** Module Skill */
  static callCreateSkill(name) {
    return axiosInstance.post(`/api/v1/skills`, { name });
  }

  static callUpdateSkill(id, name) {
    return axiosInstance.put(`/api/v1/skills`, { id, name });
  }

  static callDeleteSkill(id) {
    return axiosInstance.delete(`/api/v1/skills/${id}`);
  }

  static callFetchAllSkill(query) {
    if (query === "") {
      return axiosInstance.get(`/api/v1/skills`);
    }
    return axiosInstance.get(`/api/v1/skills?${query}`);
  }

  /** Module User */
  static callCreateUser(user) {
    return axiosInstance.post(`/api/v1/users`, { ...user });
  }

  static callUpdateUser(user) {
    return axiosInstance.put(`/api/v1/users`, { ...user });
  }

  static callDeleteUser(id) {
    return axiosInstance.delete(`/api/v1/users/${id}`);
  }

  static callFetchUser(query) {
    return axiosInstance.get(`/api/v1/users?${query}`);
  }

  static callFetchUserById(id) {
    return axiosInstance.get(`/api/v1/users/${id}`);
  }

  /** Module Job */
  static callCreateJob(job) {
    return axiosInstance.post(`/api/v1/jobs`, job);
  }

  static callUpdateJob(job) {
    return axiosInstance.put(`/api/v1/jobs`, job);
  }

  static callDeleteJob(id) {
    return axiosInstance.delete(`/api/v1/jobs/${id}`);
  }

  static callFetchJob(query) {
    return axiosInstance.get(`/api/v1/jobs?${query}`);
  }

  static callFetchJobById(id) {
    return axiosInstance.get(`/api/v1/jobs/${id}`);
  }

  /** Module Resume */
  static callCreateResume(url, jobId, email, userId) {
    return axiosInstance.post(`/api/v1/resumes`, {
      email,
      url,
      status: "PENDING",
      user: { id: userId },
      job: { id: jobId },
    });
  }

  static callUpdateResumeStatus(id, status) {
    return axiosInstance.put(`/api/v1/resumes`, { id, status });
  }

  static callDeleteResume(id) {
    return axiosInstance.delete(`/api/v1/resumes/${id}`);
  }

  static callFetchResume(query) {
    return axiosInstance.get(`/api/v1/resumes?${query}`);
  }

  static callFetchResumeById(id) {
    return axiosInstance.get(`/api/v1/resumes/${id}`);
  }

  /** Module Permission */
  static callCreatePermission(permission) {
    return axiosInstance.post("/api/v1/permissions", permission);
  }

  static callUpdatePermission(permission, id) {
    return axiosInstance.put("/api/v1/permissions", { id, ...permission });
  }

  static callDeletePermission(id) {
    return axiosInstance.delete(`/api/v1/permissions/${id}`);
  }

  static callFetchPermission(query) {
    return axiosInstance.get(`/api/v1/permissions?${query}`);
  }

  static callFetchPermissionById(id) {
    return axiosInstance.get(`/api/v1/permissions/${id}`);
  }

  /** Module Role */
  static callCreateRole(role) {
    return axiosInstance.post("/api/v1/roles", role);
  }

  static callUpdateRole(role, id) {
    return axiosInstance.put("/api/v1/roles", { id, ...role });
  }

  static callDeleteRole(id) {
    return axiosInstance.delete(`/api/v1/roles/${id}`);
  }

  static callFetchRole(query) {
    return axiosInstance.get(`/api/v1/roles?${query}`);
  }

  static callFetchRoleById(id) {
    return axiosInstance.get(`/api/v1/roles/${id}`);
  }

  /** Module Subscribers */
  static callCreateSubscriber(subs) {
    return axiosInstance.post(`/api/v1/subscribers`, subs);
  }

  static callGetSubscriberSkills() {
    return axiosInstance.post("/api/v1/subscribers/skills", {});
  }

  static callUpdateSubscriber(subs) {
    return axiosInstance.put("/api/v1/subscribers", subs);
  }

  static callDeleteSubscriber(id) {
    return axiosInstance.delete(`/api/v1/subscribers/${id}`);
  }

  static callFetchSubscriber(query) {
    return axiosInstance.get(`/api/v1/subscribers?${query}`);
  }

  static callFetchSubscriberById(id) {
    return axiosInstance.get(`/api/v1/subscribers/${id}`);
  }

  /** Fetch jobs by company */
  static async callFetchJobsByCompanyId(companyId) {
    try {
      const res = await fetch(`/api/v1/companies/${companyId}/jobs`);
      return await res.json();
    } catch (error) {
      console.error("Lỗi lấy danh sách jobs:", error);
      return null;
    }
  }
}

export default ApiService;
