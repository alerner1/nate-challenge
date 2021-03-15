import React from 'react';
import ReactDOM from 'react-dom';
import Result from '../Result';

import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

it("renders the results in a table", () => {
  const dummyResults = [
    ['tell', 2],
    ['the', 1],
    ['audience', 0],
    ['what', 2],
    [`you're`, 1],
    ['going', 1],
    ['to', 1],
    ['say', 2],
    ['it', 1],
    ['then', 1],
    ['them', 1],
    [`you've`, 1],
    ['said', 1]
  ]

  const {getByTestId} = render(<Result processedText={dummyResults} />)
  for(const result of dummyResults) {
    expect(getByTestId(`${result[0]}-word`)).toHaveTextContent(result[0])
    expect(getByTestId(`${result[0]}-count`)).toHaveTextContent(result[1])
  }
})