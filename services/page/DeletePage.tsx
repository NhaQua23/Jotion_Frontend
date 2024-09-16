import axios from "axios";

const baseUrl = 'http://localhost:8080/api';

const DeletePage = async (id: number, token: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/pages/${id}`, {
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

export default DeletePage;