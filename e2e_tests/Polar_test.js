Feature('사용자는 문제를 풀기 위해 예/아니오 버튼을 누를 수 있다.');

Scenario('Play question', ({ I }) => {
  // Given - 예 / 아니오 문제 페이지에서
  I.amOnPage('/yesno');
  I.seeElement('svg');
  I.see('버튼을 누르면 문제가 나와요');
  // When - 재생 아이콘을 누르면
  I.click('svg');
  // Then - 문제가 재생된다
  I.see('잘 듣고 정답을 골라보세요');
});

// Feature('사용자는 문제를 다시 확인하기 위해 버튼을 눌러 문제를 다시 들을 수 있다.');

// Scenario('Replay question', ({ I }) => {
//   // Given - 예 / 아니오 문제 페이지에서
//   I.amOnPage('/yesno');
//   // When - 재생 아이콘을 누르면
//   I.click('svg');
//   // Then - 또 재생 아이콘을 누를 수 있다.
//   I.click('svg');
// });

Feature('사용자는 문제를 풀기 위해 예/아니오 버튼을 누를 수 있다.');

Scenario('Click yes', ({ I }) => {
  // Given - 예 / 아니오 문제 페이지에서
  I.amOnPage('/yesno');
  // When - 재생버튼을 누르면
  I.click('svg');
  // Then - 맞아요 버튼을 누를 수 있다.
  I.click('맞아요');
});

Scenario('Click no', ({ I }) => {
  // Given - 예 / 아니오 문제 페이지에서
  I.amOnPage('/yesno');
  // When - 재생버튼을 누르면
  I.click('svg');
  // Then - 아니에요 버튼을 누를 수 있다.
  I.click('아니에요');
});

Feature('사용자는 정확히 무엇이 틀렸고 맞았는지 확인하기 위해 문자로 된 문제와 고른 답을 확인 할 수 있다.');
