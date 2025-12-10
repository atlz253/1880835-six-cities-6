import { useEffect } from 'react';
import { useAppDispatch } from '../../../../config/redux/hooks/useAppDispatch';
import { offerCommentsThunk } from '../../../../config/redux/slice/comments/action';
import { useSelector } from 'react-redux';
import { State } from '../../../../config/redux';
import { selectOfferCommentsQuery } from '../../../../config/redux/slice/comments/selector';
import { ThunkQuery } from '../../../../config/redux/thunk';
import { PostedComment } from '../../types';

export function useOfferCommentsQuery(
  offerID?: string
): ThunkQuery<PostedComment[]> {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(offerCommentsThunk(offerID));
  }, [offerID, dispatch]);
  return useSelector((s: State) => selectOfferCommentsQuery(s, offerID));
}
