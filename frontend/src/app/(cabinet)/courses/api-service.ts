import http from "@/http-client";

export const createCourse = async (title: string, description: string, authorId: string) => {
  try {
    const response = await http.post("/courses", {
      title,
      description,
      authorId
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    const response = await http.delete(`/courses/${ courseId }`);
    return response.status;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCourseRequests = async (courseId: string, status: string) => {
  try {
    const response = await http.get(`/courses/${ courseId }/requests?status=${ status }`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCourseRequest = async (courseId: string, requestId: string) => {
  try {
    const response = await http.get(`/courses/${ courseId }/requests/${ requestId }`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postCourseRequest = async (courseId: string, requestId: string) => {
  try {
    const response = await http.post(`/courses/${ courseId }/requests/${ requestId }`);
    return response.status;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCourseRequest = async (courseId: string, requestId: string) => {
  try {
    const response = await http.delete(`/courses/${ courseId }/requests/${ requestId }`);
    return response.status;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCourseRequest = async (courseId: string, requestId: string, status: string) => {
  try {
    const response = await http.put(`/courses/${ courseId }/requests/${ requestId }`, {
      status
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};