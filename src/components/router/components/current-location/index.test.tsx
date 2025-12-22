import { render, screen } from '@testing-library/react';
import { CurrentLocation } from '.';
import { Route, Routes } from 'react-router-dom';
import { MockRouter } from '../../utils/test/components';

describe(CurrentLocation.name, () => {
  test('text content should be current route', () => {
    const testPath = '/test';
    render(
      <MockRouter initialEntries={[testPath]}>
        <Routes>
          <Route path={testPath} element={<CurrentLocation />} />
        </Routes>
      </MockRouter>
    );
    expect(screen.getByTestId(CurrentLocation.testId)).toHaveTextContent(
      testPath
    );
  });
});
