import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for hyper-food', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be hyper-food', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('hyper-food');
    })
  });

  it('navbar-brand should be hyper-food@0.1.10',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('hyper-food@0.1.10');
  });

  
    it('Product component should be loadable',() => {
      page.navigateTo('/Product');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Product');
    });

    it('Product table should have 11 columns',() => {
      page.navigateTo('/Product');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(11); // Addition of 1 for 'Action' column
      });
    });

  
    it('Audit component should be loadable',() => {
      page.navigateTo('/Audit');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Audit');
    });

    it('Audit table should have 6 columns',() => {
      page.navigateTo('/Audit');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  

});
