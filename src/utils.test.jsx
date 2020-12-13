import React from 'react';

import { render } from '@testing-library/react';

import { get, highlight } from './utils';

import { emphasisColor } from './styles/colors';

describe('utils', () => {
  test('get', () => {
    const object = {
      name: 'Kim',
    };

    const getName = get('name');

    expect(getName(object)).toBe('Kim');
  });

  describe('highlight', () => {
    const sentence = '사과가 너무너무 사과하다';
    const word = '사과';

    it('renders highlited words', () => {
      const { getAllByText } = render(
        <>
          {highlight({ sentence, word })}
        </>,
      );

      getAllByText(word).forEach((element) => {
        expect(element).toHaveStyle(`color: ${emphasisColor}`);
      });
    });

    it('renders nothing with null sentence', () => {
      expect(highlight({
        sentence: null,
      })).toEqual(['']);
    });
  });
});
