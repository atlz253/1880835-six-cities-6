import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentCity } from '../use-current-city';
import { useCitiesQuery } from '../use-cities-query';
import { setCurrentCity } from '../../features/setCurrentCity';
import ROUTES from '../../../router/constants/ROUTES';

export function useCurrentCityFromParams() {
  const { city: cityParamsName } = useParams<{ city: string | undefined }>();
  const { data: cities, isFetched: isCitiesFetched } = useCitiesQuery();
  const currentCity = useCurrentCity();
  const navigate = useNavigate();
  useEffect(() => {
    const cityParams = cities?.find((c) => c.name === cityParamsName);
    if (cityParams !== undefined) {
      if (currentCity?.name !== cityParams.name) {
        setCurrentCity(cityParams);
      }
    } else if (cityParamsName !== undefined && isCitiesFetched) {
      navigate(ROUTES.notFound);
    }
  }, [cityParamsName, cities, currentCity, navigate, isCitiesFetched]);
}
