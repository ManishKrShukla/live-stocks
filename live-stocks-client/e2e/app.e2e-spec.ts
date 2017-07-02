import { LiveStocksPage } from './app.po';

describe('live-stocks App', () => {
  let page: LiveStocksPage;

  beforeEach(() => {
    page = new LiveStocksPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
