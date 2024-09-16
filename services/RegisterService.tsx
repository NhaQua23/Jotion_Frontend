import axios from "axios";

const baseUrl = 'http://localhost:8080/api';

interface UserDto {
  username: string;
  email: string;
  password: string;
}

const RegisterService = async (dto: UserDto): Promise<UserDto | null> => {
  try {
    const response = await axios.post<UserDto>(`${baseUrl}/signup`, dto, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    return error.response ? error.response.data : error.message;
  }
};

export default RegisterService;