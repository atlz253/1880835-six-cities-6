import { useEffect } from 'react';
import { useAppDispatch } from '../../../../config/redux/hooks/use-app-dispatch';
import { offerCommentsThunk } from '../../../../config/redux/slice/comments/action';
import { selectOfferCommentsQuery } from '../../../../config/redux/slice/comments/selector';
import { ThunkQuery } from '../../../../config/redux/thunk';
import { PostedComment } from '../../types';
import { State, useAppSelector } from '../../../../config/redux';

export function useOfferCommentsQuery(
  offerID?: string
): ThunkQuery<PostedComment[]> {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(offerCommentsThunk(offerID));
  }, [offerID, dispatch]);
  return useAppSelector((s: State) => selectOfferCommentsQuery(s, offerID));
}
