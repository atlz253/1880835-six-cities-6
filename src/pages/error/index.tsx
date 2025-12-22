import { useNavigate } from 'react-router-dom';
import { useError } from '../../components/error/hooks/use-error';

export function Error() {
  const navigate = useNavigate();
  const { message } = useError();
  return (
    <>
      <h1>App error :(</h1>
      {message && <p>{message}</p>}
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
