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

const UpdateWorkspace = async (id: number | null, dto: WorkspaceDto, token: string):Promise<WorkspaceDto | null> => {
  try {
    const response = await axios.patch<WorkspaceDto>(`${baseUrl}/workspaces/${id}`, dto, {
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

export default UpdateWorkspace;