import { TransPoolPage } from './app.po';

describe('trans-pool App', () => {
  let page: TransPoolPage;

  beforeEach(() => {
    page = new TransPoolPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
