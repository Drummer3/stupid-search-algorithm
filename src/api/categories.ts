import http from ".";

export const getCategories = () => {
  return http.get("categories.json");
};
