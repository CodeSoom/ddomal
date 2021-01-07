Feature('Application elments');

Scenario('Main Page', ({ I }) => {
  I.amOnPage('/');
  I.see('시작 하기');
  I.click('시작 하기');
  I.see('무엇을 연습해 볼까요?');
});

Scenario('Select Page', ({ I }) => {
  I.amOnPage('/select');
  I.see('무엇을 연습해 볼까요?');
  I.see('문장 만들기');
  I.see('듣고 이해하기');
  I.click('문장 만들기');
  I.see('시작하기');
  I.click('시작하기');
  I.see('문장을 소리내어 말해보세요');
});

Scenario('Sentence Page', ({ I }) => {
  I.amOnPage('/sentence');
  I.see('문장을 소리내어 말해보세요');
  I.see('다음 문제');
  I.click('다음 문제');
  I.click('다음 문제');
  I.click('종료');
  I.see('오늘 말해본 문장');
});

Scenario('Answers Page', ({ I }) => {
  I.amOnPage('/answers');
  I.see('오늘 말해본 문장');
  I.see('처음으로');
  I.click('처음으로');
  I.see('시작 하기');
});
