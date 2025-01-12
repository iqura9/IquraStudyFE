import { useAuth } from "contexts/authContext";

export function useRole() {
  const { user } = useAuth();
  const isTeacher = user?.role === "Teacher";
  const isStudent = user?.role === "Student";
  return {
    isTeacher,
    isStudent,
  };
}
