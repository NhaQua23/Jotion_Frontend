import axios from "axios";

const baseUrl = 'http://localhost:8080/api';

interface StaticNoteDto {
  id: number;
  content: string;
  pageId: number;
  userId: number;
}

const CreateStaticNote = async (dto: StaticNoteDto, token: string): Promise<StaticNoteDto | null> => {
  try {
    const response = await axios.post<StaticNoteDto>(`${baseUrl}/statics`, dto, {
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

export default CreateStaticNote;