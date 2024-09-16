const GetToken = () => {
  return localStorage.getItem('jwtToken');
}

export default GetToken;