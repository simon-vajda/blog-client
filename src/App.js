import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Layout } from "./components/Layout";
import { useEffect, useState } from "react";
import { UserContext } from "./utils/UserContext";
import PostList from "./pages/PostList";
import PostPage from "./pages/PostPage";
import PostEditor from "./pages/PostEditor";

export default function App() {
  const [currentUser, setCurrentUser] = useState(getUserFromStorage());

  // save user state to local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<PostList />} />
            <Route exact path="/login" element={<Login></Login>} />
            <Route exact path="/signup" element={<SignUp></SignUp>} />
            <Route exact path="/create" element={<PostEditor></PostEditor>} />
            <Route exact path="/post/:id" element={<PostPage></PostPage>} />
            <Route
              exact
              path="/post/:id/edit"
              element={<PostEditor></PostEditor>}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

function getUserFromStorage() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
