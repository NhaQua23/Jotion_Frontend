import axios from "axios";

const baseUrl = 'http://localhost:8080/api';

interface BlockNoteDto {
  id: number;
  content: string;
  pageId: number;
  createdById: number;
}

const GetNoteByPage = async (id: number, token: string):Promise<BlockNoteDto | null> => {
  try {
    const response = await axios.get<BlockNoteDto>(`${baseUrl}/pages/${id}/notes`, {
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

export default GetNoteByPage;