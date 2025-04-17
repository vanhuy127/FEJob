import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayoutClient } from "./layout/client";
import { LayoutAdmin } from "./layout/admin";
import { AlertProvider } from "./provider/AlertProvider";
import { PopUpCVProvider } from "./provider/PopUpCVProvider";
import { PopUpProvider } from "./provider/PopUpProvider";
import { useEffect } from "react";
import { useUserStore } from "./store/UserStore";
import ApiService from "./service/api";
// Pages - Auth
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ChangePassword } from "./pages/auth/ChangePassword";

// Pages - Client
import { Home } from "./pages/client/Home";

// Pages - Admin
import { DashBoard } from "./pages/admin/DashBoard";
import { Users } from "./pages/admin/user";
import { CreateUser } from "./pages/admin/user/Create";
import { EditUser } from "./pages/admin/user/Edit";
import { Companies } from "./pages/admin/company";
import { CreateCompany } from "./pages/admin/company/Create";
import { EditCompany } from "./pages/admin/company/Edit";
import { Jobs } from "./pages/admin/job";
import { CreateJob } from "./pages/admin/job/Create";
import { EditJob } from "./pages/admin/job/Edit";
import { Skills } from "./pages/admin/skill";
import { CreateSkill } from "./pages/admin/skill/Create";
import { EditSkill } from "./pages/admin/skill/Edit";
import { Resumes } from "./pages/admin/resume";
import { EditResume } from "./pages/admin/resume/Edit";
import { Permissions } from "./pages/admin/permission";
import { Roles } from "./pages/admin/role";
import { CreateRole } from "./pages/admin/role/Create";
import { EditRole } from "./pages/admin/role/Edit";

// Shared Components
import { ProtectedRoute } from "./components/share/ProtectedRoute";
import { NoPage } from "./pages/NoPage";
import { NoPermission } from "./pages/NoPermission";
// Client Pages
import { Company } from "./pages/client/Company";
import { Job } from "./pages/client/Job";
import { DetailsCompany } from "./pages/client/DetailsCompany";
import { DetailsJob } from "./pages/client/DetailsJob";

// Danh sách các route trong admin
const adminRoutes = [
  { path: "", element: <DashBoard /> },
  { path: "user", element: <Users />, permission: "Get users with pagination" },
  { path: "user/create", element: <CreateUser />, permission: "Create a user" },
  {
    path: "user/edit/:userId",
    element: <EditUser />,
    permission: "Update a user",
  },
  {
    path: "company",
    element: <Companies />,
    permission: "Get companies with pagination",
  },
  {
    path: "company/create",
    element: <CreateCompany />,
    permission: "Create a company",
  },
  {
    path: "company/edit/:companyId",
    element: <EditCompany />,
    permission: "Update a company",
  },
  { path: "job", element: <Jobs />, permission: "Get jobs with pagination" },
  { path: "job/create", element: <CreateJob />, permission: "Create a job" },
  { path: "job/edit/:jobId", element: <EditJob />, permission: "Update a job" },
  { path: "skill", element: <Skills /> },
  { path: "skill/create", element: <CreateSkill /> },
  { path: "skill/edit/:skillId", element: <EditSkill /> },
  {
    path: "resume",
    element: <Resumes />,
    permission: "Get resumes with pagination",
  },
  {
    path: "resume/edit/:resumeId",
    element: <EditResume />,
    permission: "Update a resume",
  },
  {
    path: "permission",
    element: <Permissions />,
    permission: "Get permissions with pagination",
  },
  {
    path: "role",
    element: <Roles />,
    permission: "Get roles with pagination",
  },
  { path: "role/create", element: <CreateRole />, permission: "Create a role" },
  {
    path: "role/edit/:roleId",
    element: <EditRole />,
    permission: "Update a role",
  },
];

function App() {
  const { setCurrentUser } = useUserStore();
  const isAuthenticated = !!localStorage.getItem("accessToken"); // Kiểm tra nếu có accessToken

  useEffect(() => {
    const fetchUser = async () => {
      const user = await ApiService.callFetchAccount();
      if (user.status === 200) {
        console.log("fetch current user");

        setCurrentUser(user.data.data.user);
      } else {
        setCurrentUser({});
      }
    };
    if (isAuthenticated) {
      fetchUser();
    }
  }, []);

  return (
    <AlertProvider>
      <PopUpProvider>
        <PopUpCVProvider>
          <BrowserRouter
            future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
          >
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/change-password" element={<ChangePassword />} />

              {/* Public Routes */}
              <Route element={<LayoutClient />}>
                <Route index element={<Home />} />
                <Route path="/company" element={<Company />} />
                <Route path="/job" element={<Job />} />
                <Route
                  path="/company/:companyId"
                  element={<DetailsCompany />}
                />
                <Route path="/job/:jobId" element={<DetailsJob />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/" element={<LayoutAdmin />}>
                {adminRoutes.map(({ path, element, permission }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <ProtectedRoute requiredPermission={permission}>
                        {element}
                      </ProtectedRoute>
                    }
                  />
                ))}
              </Route>

              {/* 404 Page */}
              <Route path="*" element={<NoPage />} />
              <Route path="/no-permission" element={<NoPermission />} />
            </Routes>
          </BrowserRouter>
        </PopUpCVProvider>
      </PopUpProvider>
    </AlertProvider>
  );
}

export default App;
