import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getRandomItem } from '../../../../utils/array';
import RouterPaths from '../../../router/constants/router-paths';
import { Loader } from '../../../ui/components/loader';
import defaultCity from '../../constants/default-city';
import { useCitiesQuery } from '../../hooks/use-cities-query';

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
      to={RouterPaths.city({ city: pickedCity.name })}
      className={className}
      data-testid="random-city-link"
    >
      <span>{pickedCity.name}</span>
    </Link>
  );
}
