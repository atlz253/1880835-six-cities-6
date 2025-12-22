import { Link } from 'react-router-dom';
import { useCitiesQuery } from '../../hooks/use-cities-query';
import { Loader } from '../../../ui/components/Loader';
import { useMemo } from 'react';
import defaultCity from '../../constants/default-city';
import { getRandomItem } from '../../../../utils/array';
import ROUTES from '../../../router/constants/ROUTES';

export function RandomCityLink({ className }: { className?: string }) {
  const { data: cities, isLoading: isCitiesLoading } = useCitiesQuery();
  const pickedCity = useMemo(() => {
    if (!cities || cities.length === 0) {
      return defaultCity;
    } else {
      return getRandomItem(cities);
    }
  }, [cities]);

  if (isCitiesLoading) {
    return <Loader />;
  }

  return (
    <Link
      to={ROUTES.city({ city: pickedCity.name })}
      className={className}
      data-testid="random-city-link"
    >
      <span>{pickedCity.name}</span>
    </Link>
  );
}
