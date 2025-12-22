import { DeepPartial } from '@reduxjs/toolkit';
import { getFulfilledState } from '../../../../thunk';
import { getEmptyState as getOffersEmptyState } from '../../../offers/state';
import { getEmptyState as getCitiesEmptyState } from '../../state';
import { State } from '../../../..';
import { getOffersMetaMocks } from '../../../../../../components/offer/mocks/get-offers-meta-mocks';

export function getCitiesMockState() {
  const offers = getOffersMetaMocks();
  return {
    cities: getCitiesEmptyState(),
    offers: { ...getOffersEmptyState(), offers: getFulfilledState(offers) },
  } satisfies DeepPartial<State>;
}
