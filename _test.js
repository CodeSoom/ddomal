Feature('Application elments');

Scenario('Main Page', ({ I }) => {
  I.amOnPage('/');
  I.see('문장 만들기');
  I.see('시작하기');
  I.click('시작하기');
  I.see('제시어를 보고 문장을 만들어 보세요');
});

Scenario('Sentence Page', ({ I }) => {
  I.amOnPage('/sentence');
  I.see('제시어를 보고 문장을 만들어 보세요');
  I.see('문장을 소리내어 말해보세요');
  I.see('다음 문제');
  I.click('다음 문제');
  I.click('다음 문제');
  I.click('다음 문제');
  I.click('다음 문제');
  I.click('종료');
  I.see('결과 확인');
});

Scenario('Answers Page', ({ I }) => {
  I.amOnPage('/answers');
  I.see('결과 확인');
  I.see('처음으로');
  I.click('처음으로');
  I.see('문장 만들기');
});
