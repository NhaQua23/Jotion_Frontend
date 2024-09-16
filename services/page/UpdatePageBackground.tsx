import axios from "axios";

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

const UpdatePageBackground = async (id: number, dto: PageDto, token: string):Promise<PageDto | null> => {
  try {
    const response = await axios.patch<PageDto>(`${baseUrl}/pages/${id}/background`, dto, {
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

export default UpdatePageBackground;