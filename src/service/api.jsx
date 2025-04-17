import axiosInstance from "./axios-custom";
class ApiService {
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

  static callFetchJobCount() {
    return axiosInstance.get(`/api/v1/jobs/count`);
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

  static callFetchResumeByUser() {
    return axiosInstance.post(`/api/v1/resumes/by-user`);
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

  static callUpdateRole(role) {
    return axiosInstance.put("/api/v1/roles", { ...role });
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
  static callFetchJobsByCompanyId(companyId) {
    return axiosInstance.get(`/api/v1/companies/${companyId}/jobs`);
  }

  static callCreateReview = async (companyId, content, rating) => {
    const reviewData = { companyId, content, rating };

    return axiosInstance.post("/api/reviews", reviewData);
  };

  static callFetchReviewsByCompany = (companyId) => {
    return axiosInstance.get(`/api/reviews/company/${companyId}`);
  };

  // Module Favourite Job
  static callAddToFavorite = (jobId, userId) => {
    return axiosInstance.post(`/api/favorites/${jobId}?userId=${userId}`);
  };

  static callGetFavoriteJobs = (userId) => {
    return axiosInstance.get(`/api/favorites?userId=${userId}`);
  };
  static callRemoveFromFavorite = (jobId, userId) => {
    return axiosInstance.delete(`/api/favorites/${jobId}?userId=${userId}`);
  };

  //Module CV
  /**
   * Tạo CV mới
   */
  static callCreateNewCV = async (cvData) => {
    return axiosInstance.post("/api/v1/gencv/create", cvData, {
      withCredentials: true,
    });
  };

  static callExportCV = async (cvId) => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error(" Không tìm thấy access_token");
        return;
      }
      const response = await axiosInstance.get(`/api/v1/gencv/export/${cvId}`, {
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true, // Thêm withCredentials để gửi cookie
      });

      // Kiểm tra nếu response là JSON (error message)
      const contentType = response.headers["content-type"];
      if (contentType && contentType.includes("application/json")) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorJson = JSON.parse(reader.result);
            console.error(" Server error:", errorJson); // Log chi tiết lỗi từ server
            alert(` ${errorJson.message || "Lỗi khi tải file CV PDF!"}`);
          } catch (e) {
            console.error(" Error parsing JSON:", e);
            alert("⚠️ Lỗi khi tải file CV PDF!");
          }
        };
        reader.readAsText(response.data);
        return;
      }

      // Nếu là PDF, xử lý tải xuống
      if (!contentType || !contentType.includes("application/pdf")) {
        console.error(" Invalid content type:", contentType);
        throw new Error("Invalid response format. Expected PDF.");
      }

      // Tạo blob từ response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Tạo URL cho blob
      const url = window.URL.createObjectURL(blob);

      // Tạo link để download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `cv_${cvId}.pdf`);

      // Thêm link vào DOM và click
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(" Lỗi tải PDF:", error);

      if (error.response?.status === 403) {
        console.error(" Forbidden error details:", error.response.data);
        // "Bạn không có quyền tải CV này hoặc phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại."

        return;
      }

      // Xử lý error response từ server
      if (error.response?.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorJson = JSON.parse(reader.result);
            console.error("Server error response:", errorJson);
          } catch (e) {
            console.error(" Error parsing error response:", e);
          }
        };
        reader.readAsText(error.response.data);
      } else {
        console.error(" Unknown error:", error);
      }
    }
  };

  static callPreviewCV = (cvId) => {
    return axiosInstance.get(`/api/v1/gencv/preview/${cvId}`);
  };

  static callDownloadCV = async (cvId) => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error(" Không tìm thấy access_token");
        return;
      }
      const response = axiosInstance.get(`/api/v1/gencv/download/${cvId}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/pdf",
        },
      });

      // Tạo blob từ response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Tạo URL cho blob
      const url = window.URL.createObjectURL(blob);

      // Tạo link để download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `cv_${cvId}.pdf`);

      // Thêm link vào DOM và click
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Lỗi tải PDF:", error);
      alert("⚠️ Lỗi khi tải file CV PDF! Vui lòng thử lại sau.");
    }
  };

  /**
   * Get all active subscription packages
   */
  static callGetActivePackages = () => {
    return axiosInstance.get("/api/v1/packages");
  };

  /**
   * Get subscription package by ID
   */
  static callGetPackageById = (id) => {
    return axiosInstance.get(`/api/v1/packages/${id}`);
  };

  /**
   * Purchase a subscription package
   */
  static callPurchaseSubscription = (data) => {
    return axiosInstance.post("/api/v1/employer/subscribe", data);
  };

  /**
   * Get active subscriptions for an employer
   */
  static callGetActiveSubscriptions = (userId) => {
    return axiosInstance.get(`/api/v1/employer/${userId}/subscriptions`);
  };

  /**
   * Get subscription status for an employer and company
   */
  static callGetSubscriptionStatus = (userId, companyId) => {
    return axiosInstance.get(
      `/api/v1/employer/${userId}/company/${companyId}/status`
    );
  };

  /**
   * Create VNPay payment for subscription package
   */
  static callCreateVNPayPayment = (data) => {
    // Đảm bảo returnUrl trỏ về frontend
    const updatedData = {
      ...data,
      // Điều chỉnh returnUrl để đảm bảo nó trỏ về frontend thay vì backend
      returnUrl: `${window.location.origin}/subscription/payment-result`,
    };

    console.log("Gọi API tạo VNPay payment, request data:", updatedData);

    return axiosInstance.post("/api/v1/payments/create", updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "text", // Thay đổi responseType thành 'text' vì backend trả về chuỗi URL trực tiếp
      transformResponse: [
        (responseData) => {
          // Xử lý response gốc từ backend
          console.log("VNPay API raw response:", responseData);

          try {
            // Kiểm tra xem response có phải là URL VNPay không
            if (
              responseData &&
              typeof responseData === "string" &&
              (responseData.startsWith("http") ||
                responseData.includes("vnpayment.vn"))
            ) {
              // Trả về đúng định dạng mà frontend đang mong đợi
              return {
                paymentUrl: responseData.trim(),
              };
            }

            // Nếu không phải URL trực tiếp, thử parse JSON
            return JSON.parse(responseData);
          } catch (error) {
            console.log("Error parsing VNPay response:", error);
            // Nếu không parse được JSON và có vẻ là URL, trả về trực tiếp
            if (
              responseData &&
              typeof responseData === "string" &&
              (responseData.startsWith("http") ||
                responseData.includes("vnpayment.vn"))
            ) {
              return {
                paymentUrl: responseData.trim(),
              };
            }
            return {
              error: true,
              message: responseData,
            };
          }
        },
      ],
      timeout: 15000, // Tăng timeout lên 15 giây
    });
  };

  /**
   * Lấy danh sách gói VIP đang hoạt động của user
   */
  static callGetUserSubscriptions = (userId) => {
    return axiosInstance.get(`/api/v1/payments/user/${userId}/subscriptions`);
  };

  // Subscription Package Management APIs
  static callGetAllPackages = () => {
    return axiosInstance.get("/api/v1/packages");
  };

  static callCreatePackage = (data) => {
    return axiosInstance.post("/api/v1/packages", data);
  };

  static callUpdatePackage = (id, data) => {
    return axiosInstance.put(`/api/v1/packages/${id}`, data);
  };

  static callDeletePackage = (id) => {
    return axiosInstance.delete(`/api/v1/packages/${id}`);
  };

  // Promotion Management APIs

  static callGetAllPromotions = () => {
    return axiosInstance.get("/api/v1/promotions");
  };

  static callGetPromotionById = (id) => {
    return axiosInstance.get(`/api/v1/promotions/${id}`);
  };

  static callCreatePromotion = (data) => {
    return axiosInstance.post("/api/v1/promotions", data);
  };

  static callUpdatePromotion = (id, data) => {
    return axiosInstance.put(`/api/v1/promotions/${id}`, data);
  };

  static callDeletePromotion = (id) => {
    return axiosInstance.delete(`/api/v1/promotions/${id}`);
  };

  static callGetPromotionsByPackage = (packageId) => {
    return axiosInstance.get(`/api/v1/promotions/package/${packageId}`);
  };

  static callGetActivePromotions = () => {
    return axiosInstance.get("/api/v1/promotions/active");
  };

  static callGetPackagePriceWithDiscount = (packageId) => {
    return axiosInstance.get(
      `/api/v1/packages/${packageId}/price-with-discount`
    );
  };

  // Admin Statistics APIs
  static callGetAllStatistics = () => {
    return axiosInstance.get("/api/v1/admin/statistics");
  };

  static callGetJobStatistics = () => {
    return axiosInstance.get("/api/v1/admin/statistics/jobs");
  };

  static callGetUserStatistics = () => {
    return axiosInstance.get("/api/v1/admin/statistics/users");
  };

  static callGetCompanyStatistics = () => {
    return axiosInstance.get("/api/v1/admin/statistics/companies");
  };

  static callGetCVStatistics = () => {
    return axiosInstance.get("/api/v1/admin/statistics/cvs");
  };

  static callGetAllCVs = () => {
    return axiosInstance.get("/api/v1/admin/cvs");
  };

  static callDeleteCV = (id) => {
    return axiosInstance.delete(`/api/v1/admin/cvs/${id}`);
  };

  // API thống kê doanh thu
  // export interface RevenueStatisticsDTO {
  //   totalRevenue: number;
  //   todayRevenue: number;
  //   lastWeekRevenue: number;
  //   lastMonthRevenue: number;
  //   revenueByPackage: {
  //     packageName: string;
  //     revenue: number;
  //     count: number;
  //   }[];
  //   revenueByCompany: {
  //     companyName: string;
  //     revenue: number;
  //     count: number;
  //   }[];
  //   revenueByMonth: {
  //     month: number;
  //     revenue: number;
  //   }[];
  //   transactionCountByStatus: {
  //     status: string;
  //     count: number;
  //   }[];
  //   dailyRevenueLastWeek: {
  //     date: string;
  //     revenue: number;
  //   }[];
  //   growthRateLastWeek: number | null;
  //   growthRateLastMonth: number | null;
  //   totalTransactions: number;
  //   successfulTransactions: number;
  //   failedTransactions: number;
  //   successRate: number;
  // }

  static callGetRevenueStatistics = () => {
    return axiosInstance.get("/api/v1/admin/statistics/revenue");
  };

  static callGetRevenueStatisticsByDateRange = (startDate, endDate) => {
    return axiosInstance.get(
      `/api/v1/admin/statistics/revenue/date-range?startDate=${startDate}&endDate=${endDate}`
    );
  };
}

export default ApiService;
