import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayoutClient } from "./layout/client";
import { LayoutAdmin } from "./layout/admin";
import { AlertProvider } from "./provider/AlertProvider";
import { PopUpProvider } from "./provider/PopUpProvider";

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

// Shared Components
import { ProtectedRoute } from "./components/share/ProtectedRoute";
import { NoPage } from "./pages/NoPage";
import { NoPermission } from "./pages/NoPermission";
//
import { useEffect } from "react";
import { useUserStore } from "./store/UserStore";
import ApiService from "./service/api";

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
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/change-password" element={<ChangePassword />} />

            {/* Public Routes */}
            <Route element={<LayoutClient />}>
              <Route index element={<Home />} />
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
      </PopUpProvider>
    </AlertProvider>
  );
}

export default App;
