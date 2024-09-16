import axios from "axios";

const baseUrl = 'http://localhost:8080/api';

interface StaticNoteDto {
  id: number;
  content: string;
  pageId: number;
  userId: number;
}

const GetStaticNote = async (pageId: number, token: string):Promise<StaticNoteDto | null> => {
  try {
    const response = await axios.get<StaticNoteDto>(`${baseUrl}/pages/${pageId}/statics`, {
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

export default GetStaticNote;