import { renderHook, act } from '@testing-library/react-hooks';

import { useAudio } from './audio';

const mockPlay = jest.fn();

global.HTMLAudioElement.prototype.play = mockPlay;

test('useAudio', () => {
  const { result } = renderHook(() => useAudio(''));

  const play = result.current;

  act(() => {
    play();
  });

  expect(mockPlay).toBeCalled();
});
