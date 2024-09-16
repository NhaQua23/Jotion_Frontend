import axios from "axios";
import { log } from "console";

const baseUrl = 'http://localhost:8080/api';

interface PageDto {
  id: number;
  title: string;
  background: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: number;
  authorId: number;
}

const GetPageById = async (id: number, token: string):Promise<PageDto | null> => {
  try {
    const response = await axios.get<PageDto>(`${baseUrl}/pages/${id}`, {
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

export default GetPageById;