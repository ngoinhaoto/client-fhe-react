import microserviceService from "./microserviceService";

const faceMicroserviceService = {
  registerFace: async (imageBlob, userId) => {
    try {
      if (!imageBlob || imageBlob.size < 1000) {
        throw new Error(
          "Image too small or invalid. Please try again with a clearer photo.",
        );
      }
      const formData = new FormData();
      formData.append("file", imageBlob, "register-face.jpg");
      formData.append("user_id", userId);

      const response = await microserviceService.post(
        "/register-face/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          timeout: 60000,
        },
      );
      return response.data;
    } catch (error) {
      // Handle and rethrow with user-friendly messages
      if (error.response) {
        const status = error.response.status;
        const detail = error.response.data?.detail || "Unknown error";
        if (status === 400 && detail.includes("No face detected")) {
          throw new Error(
            "No face detected. Please ensure your face is clearly visible.",
          );
        }
        throw new Error(detail);
      }
      throw new Error("Connection error. Please try again.");
    }
  },

  verifyFace: async (imageBlob, sessionId) => {
    try {
      const formData = new FormData();
      formData.append("file", imageBlob, "verify.jpg");
      if (sessionId) formData.append("session_id", sessionId);

      const response = await microserviceService.post(
        "/verify-face/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          timeout: 60000,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error in FHE face verification:", error);
      throw error;
    }
  },
};

export default faceMicroserviceService;
