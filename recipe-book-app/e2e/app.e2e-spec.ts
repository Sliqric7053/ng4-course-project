import { RecipeBookAppPage } from './app.po';

describe('recipe-book-app App', () => {
  let page: RecipeBookAppPage;

  beforeEach(() => {
    page = new RecipeBookAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
