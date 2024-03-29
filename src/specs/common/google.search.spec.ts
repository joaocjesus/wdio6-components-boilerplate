import { navigate } from '../../lib/utils';
import GooglePage from '../../page-objects/Google.page';

const SEARCH_QUERY = 'Nutrimprove';

describe('Google Search', () => {
  const page = new GooglePage();

  before(() => {
    navigate();
    page.dialogAgreeButton().click();
  });

  it('logo is displayed', () => {
    expect(page.logo().isVisible()).toEqual(true);
  });

  it('search input is displayed', () => {
    expect(page.searchInput().isVisible()).toEqual(true);
  });

  it(`returns results when 'Google Search' button is clicked`, () => {
    page.searchInput().setValue(SEARCH_QUERY);
    browser.keys('Enter');
    expect(page.resultStats().getText()).toMatch(/About .* results \(.* seconds\)/)
  });

  it(`all listed results contain query '${SEARCH_QUERY}'`, () => {
    expect(page.resultsTitles().elementsContainText(SEARCH_QUERY));
  })
});
