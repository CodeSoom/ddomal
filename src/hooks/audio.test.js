import { fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useAudio } from './audio';

const mockPause = jest.fn();
const mockPlay = jest.fn();

global.HTMLAudioElement.prototype.pause = mockPause;
global.HTMLAudioElement.prototype.play = mockPlay;

test('useAudio', () => {
  const { result } = renderHook(() => useAudio(''));

  expect(mockPause).toBeCalled();

  const [playing, toggle] = result.current;

  expect(playing).toBe(false);

  act(() => {
    toggle();
  });

  expect(mockPlay).toBeCalled();
});
