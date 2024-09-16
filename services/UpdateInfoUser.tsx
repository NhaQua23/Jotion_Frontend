import axios from "axios";

const baseUrl = 'http://localhost:8080/api';

interface UserDto {
  id: number;
  username: string;
  email: string;
  password: string;
}

const UpdateInfoUser = async (id: number, dto: UserDto, token: string):Promise<UserDto | null> => {
  try {
    const response = await axios.patch<UserDto>(`${baseUrl}/users/${id}`, dto, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    return error.response ? error.response.data : error.message;
  }
};

export default UpdateInfoUser;