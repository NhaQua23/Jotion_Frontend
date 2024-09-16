import axios from "axios";

const baseUrl = 'http://localhost:8080/api';

interface UserDto {
  email: string;
  password: string;
}

interface AuthDto {
  token: string;
  authenticated: boolean;
}

const AuthService = async (dto: UserDto): Promise<AuthDto | null> => {
  try {
    const response = await axios.post<AuthDto>(`${baseUrl}/login`, dto, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    return error.response ? error.response.data : error.message;
  }
};

export default AuthService;
