import { DeepPartial } from '@reduxjs/toolkit';
import { getOffersMetaMocks } from '../../../../../../domain/offer/mocks/get-offers-meta-mocks';
import { getFulfilledState } from '../../../../thunk';
import { getEmptyState as getOffersEmptyState } from '../../../offers/state';
import { getEmptyState as getCitiesEmptyState } from '../../state';
import { State } from '../../../..';

export function getCitiesMockState() {
  const offers = getOffersMetaMocks();
  return {
    cities: getCitiesEmptyState(),
    offers: { ...getOffersEmptyState(), offers: getFulfilledState(offers) },
  } satisfies DeepPartial<State>;
}
