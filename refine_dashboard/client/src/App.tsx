import {
  Authenticated,
  AuthProvider,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayout,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { Title } from "./components/layout/title";
import { ThemedSider } from "./components/layout/sider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";
import React, { lazy, Suspense } from "react";
const Login = lazy(() => import("./pages/login").then(m => ({ default: m.Login })));
const Home = lazy(() => import("./pages/home"));
const Agents = lazy(() => import("./pages/agent"));
const MyProfile = lazy(() => import("./pages/my-profile"));
const PropertyDetails = lazy(() => import("./pages/property-details"));
const AllProperties = lazy(() => import("./pages/all-properties"));
const CreateProperty = lazy(() => import("./pages/create-property"));
const AgentProfile = lazy(() => import("./pages/agent-profile"));
const EditProperty = lazy(() => import("./pages/edit-property"));
const Reviews = lazy(() => import("./pages/review"));
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from "@mui/icons-material";
import { dataProvider } from "./providers/data";
import { parseJwt } from "./utils/parse-jwt";
import { API_URL } from "./providers/constants";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response = await fetch(`${API_URL}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          }),
        });

        const data = await response.json();

        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
            })
          );
        } else {
          return Promise.reject();
        }

        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        if (axios.defaults.headers.common) {
            delete axios.defaults.headers.common["Authorization"];
        }

        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                if (parsedUser.email) {
                    window.google?.accounts.id.revoke(parsedUser.email, () => {
                        return {};
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                  {
                    name: "properties",
                    list: "/properties",
                    create: "/properties/create",
                    edit: "/properties/edit/:id",
                    show: "/properties/show/:id",
                    meta: {
                      icon: <VillaOutlined />,
                    },
                  },
                  {
                    name: "agents",
                    list: "/agents",
                    show: "/agents/show/:id",
                    meta: {
                      icon: <PeopleAltOutlined />,
                    },
                  },
                  {
                    name: "reviews",
                    list: "/reviews",
                    meta: {
                      icon: <StarOutlineRounded />,
                    },
                  },
                  {
                    name: "messages",
                    list: "/messages",
                    meta: {
                      icon: <ChatBubbleOutline />,
                    },
                  },
                  {
                    name: "my_profile",
                    list: "/my-profile",
                    meta: {
                      label: "My Profile",
                      icon: <AccountCircleOutlined />,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "QYzXYD-sbQA8K-ADSbCG",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayout Header={Header} Title={({ collapsed }) => <Title collapsed={collapsed} />} Sider={ThemedSider}>
                          <Suspense fallback={<div>Loading...</div>}>
                            <Outlet />
                          </Suspense>
                        </ThemedLayout>
                      </Authenticated>
                    }
                  >
                    <Route index element={<Home />} />
                    <Route path="/properties">
                      <Route index element={<AllProperties />} />
                      <Route path="create" element={<CreateProperty />} />
                      <Route path="edit/:id" element={<EditProperty />} />
                      <Route path="show/:id" element={<PropertyDetails />} />
                    </Route>
                    <Route path="/agents">
                      <Route index element={<Agents />} />
                      <Route path="show/:id" element={<AgentProfile />} />
                    </Route>
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
