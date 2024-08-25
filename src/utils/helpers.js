export const handleChange = (e, setFormData) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

export const errorHandle = (error, defaultMessage) => {
  if (error.response) {
    return  error.response.data?.message || defaultMessage;
  } else if (error.request) {
    return "تعذر الوصول إلى الخادم. تحقق من اتصال الإنترنت وحاول مرة أخرى.";
  } else {
    return "حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.";
  }
};
