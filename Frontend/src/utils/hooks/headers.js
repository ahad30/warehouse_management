import { useToken } from "./useToken";

const token = useToken();

export const headers = {
  Authorization: `Bearer ${token}`,
};
