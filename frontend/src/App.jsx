import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Dashboard from "./pages/Dashboard"
import LoginPage from "./auth/authpages/LoginPage"
import SignupPage from "./auth/authpages/SignupPage"
import toast, { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "./lib/axios"
import CreateBudget from "./pages/CreateBudget"
import AddExpense from "./pages/AddExpense"
import ExpenseList from "./pages/ExpenseList"
import AddExpensePage from "./pages/AddExpensePage"
import ProfilePage from "./pages/ProfilePage"

function App() {

  const { data: authUser , isLoading} = useQuery({
    queryKey: ["authUser"],
    queryFn: async() => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (err) {
        if(err.response && err.response.status === 401){
          return null;
        }
        toast.error(err.response.data.message || "Something gose wrong");
      }
    }
  })

  if(isLoading) return null;
 
  return (
   <Layout>
    <Routes>
      <Route path="/" element={authUser ?  <Dashboard /> : <Navigate to={"/login"} />  } />
      <Route path="/login" element={!authUser ?  <LoginPage /> : <Navigate to={"/"} /> } />
      <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to={"/"} />} />
      <Route path="/create-budget" element={authUser ?  <CreateBudget /> : <Navigate to={"/login"} />  } />
      <Route path="/add-expense" element={authUser ?  <AddExpensePage /> : <Navigate to={"/login"} />  } />
      <Route path="/expense-list" element={authUser ?  <ExpenseList /> : <Navigate to={"/login"} />  } />
      <Route path="/profile/:username" element={ authUser ? <ProfilePage /> : <Navigate to={"/login"} /> } />
    </Routes>
    <Toaster />
   </Layout>
  )
}

export default App
