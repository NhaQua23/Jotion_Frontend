import axios from "axios";

const baseUrl = 'http://localhost:8080/api';

interface BlockNoteDto {
  id: number;
  content: string;
  pageId: number;
  createdById: number;
}

const UpdateNote = async (id: number, dto: BlockNoteDto, token: string):Promise<BlockNoteDto | null> => {
  try {
    const response = await axios.patch<BlockNoteDto>(`${baseUrl}/notes/${id}`, dto, {
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

export default UpdateNote;