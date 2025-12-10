import { useSelector } from 'react-redux';
import { selectCommentPostQuery } from '../../../../config/redux/slice/comments/selector';

export function useCommentPostQuery() {
  return useSelector(selectCommentPostQuery);
}
