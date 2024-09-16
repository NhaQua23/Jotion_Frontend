import { jwtDecode } from 'jwt-decode';

interface DecodedTokenResponse {
  sub: string;
  id: number;
  scope: string;
}

const GetUserIdFromToken = (token: string): DecodedTokenResponse | null => {
  try {
    const decoded = jwtDecode<DecodedTokenResponse>(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export default GetUserIdFromToken;