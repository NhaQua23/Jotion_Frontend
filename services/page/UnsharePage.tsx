import axios from "axios";

const baseUrl = 'http://localhost:8080/api';

interface SharedPageDto {
  id: number;
  role: string;
  email: string;
  pageId: number;
  emailAuthor: string | null;
}

const UnsharePage = async (dto: SharedPageDto, token: string): Promise<SharedPageDto | null> => {
  try {
    const response = await axios.post<SharedPageDto>(`${baseUrl}/pages/unshare`, dto, {
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

export default UnsharePage;