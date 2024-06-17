import { http } from "@/http-client";

export const createCourse = async (title: string, description: string, authorId: string) => {
  const response = await http.post("/courses", {
    title,
    description,
    authorId
  });
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await http.delete(`/courses/${ courseId }`);
  return response.status;
};

export const getCourseRequests = async (courseId: string, status: string) => {
  const response = await http.get(`/courses/${ courseId }/requests?status=${ status }`);
  return response.data;
};

export const getCourseRequest = async (courseId: string, requestId: string) => {
  const response = await http.get(`/courses/${ courseId }/requests/${ requestId }`);
  return response.data;
};

export const postCourseRequest = async (courseId: string, requestId: string) => {
  const response = await http.post(`/courses/${ courseId }/requests/${ requestId }`);
  return response.status;
};

export const deleteCourseRequest = async (courseId: string, requestId: string) => {
  const response = await http.delete(`/courses/${ courseId }/requests/${ requestId }`);
  return response.status;
};

export const updateCourseRequest = async (courseId: string, requestId: string, status: string) => {
  const response = await http.put(`/courses/${ courseId }/requests/${ requestId }`, {
    status
  });
  return response.data;
};