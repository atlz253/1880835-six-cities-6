import { useNavigate } from 'react-router-dom';

export function Page404() {
  const navigate = useNavigate();
  return (
    <>
      <h1>404 Not Found</h1>
      <a
        onClick={(event) => {
          event.preventDefault();
          navigate('/');
        }}
      >
        Main page
      </a>
    </>
  );
}
