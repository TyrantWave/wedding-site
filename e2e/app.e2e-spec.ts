import { WeddingSitePage } from './app.po';

describe('wedding-site App', () => {
  let page: WeddingSitePage;

  beforeEach(() => {
    page = new WeddingSitePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
