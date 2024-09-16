import axios from "axios";

const baseUrl = 'http://localhost:8080/api';

interface UserResponse {
  username: string;
  email: string;
  role: string;
}

const GetUserById = async (id: number, token: string): Promise<UserResponse | null> => {
  try {
    const response = await axios.get<UserResponse>(`${baseUrl}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    return null;
  }
};

export default GetUserById;
