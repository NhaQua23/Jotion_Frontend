import axios from "axios";

const baseUrl = 'http://localhost:8080/api';

interface Workspace {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  editable: boolean;
}

const GetAllWorkspacesByUser = async (id: number, token: string):Promise<Workspace[] | null> => {
  try {
    const response = await axios.get<Workspace[]>(`${baseUrl}/users/${id}/workspaces`, {
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

export default GetAllWorkspacesByUser;