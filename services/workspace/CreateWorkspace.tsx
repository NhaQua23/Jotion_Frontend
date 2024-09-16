import axios from "axios";

const baseUrl = 'http://localhost:8080/api';

interface WorkspaceDto {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  editable: boolean;
}

const CreateWorkspace = async (dto: WorkspaceDto, token: string):Promise<WorkspaceDto | null> => {
  try {
    const response = await axios.post<WorkspaceDto>(`${baseUrl}/workspaces`, dto, {
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

export default CreateWorkspace;