/* global
window
document
$
*/

import validTypes from './config';

import { BaseScript } from '../core';
import { PriceManagerSettings } from './settings-entry';

export class PriceManager extends BaseScript {
  constructor() {
    super(PriceManagerSettings.id);
  }

  activate(state) {
    super.activate(state);
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const obsConfig = {
      childList: true,
      characterData: true,
      attributes: false,
      subtree: true,
    };
    this.observer = new MutationObserver(this._mutationHandler.bind(this));
    this.observer.observe(document, obsConfig);

    this.clubDetailObserver = new MutationObserver(this._clubMutationHandler.bind(this));
    this.clubDetailObserver.observe(document, {
      attributes: true,
      subtree: true,
    });
  }

  _mutationHandler(mutationRecords) {
    mutationRecords.forEach((mutation) => {
      const target = $(mutation.target);
      if (
        target.hasClass('DetailView') &&
        target.find('.QuickListPanel .panelActions .bidSpinner').length
      ) {
        this._fillPrices();
      }
    });
  }

  _clubMutationHandler(mutationRecords) {
    mutationRecords.forEach((mutation) => {
      const target = $(mutation.target);
      if (
        target.hasClass('panelActions') &&
        target.hasClass('open')
      ) {
        this._fillPrices();
      }
    });
  }

  onScreenRequest(screenId) {
    super.onScreenRequest(screenId);
  }

  deactivate(state) {
    super.deactivate(state);
    this.observer.disconnect();
    this.clubDetailObserver.disconnect();
  }

  _fillPrices() {
    const settings = this.getSettings();

    if (!settings.isActive) return;

    const quicklistPanel = getAppMain().getRootViewController()
      .getPresentedViewController()
      .getCurrentViewController()
      .getCurrentController()
      ._rightController._currentController._quickListPanel;

    const item = quicklistPanel._item;

    const type = Object.keys(validTypes)
      .find(key => settings[key] && validTypes[key].itemValidator(item));

    if (item && type) {
      const { bid, bin } = settings[type];
      // sets the values when the quicklistpanel hasn't been initialized
      const auction = quicklistPanel._item._auction;
      if (auction.tradeState !== 'active') {
        auction.startingBid = bid;
        auction.buyNowPrice = bin;
        quicklistPanel._item.setAuctionData(auction);
      }
      quicklistPanel._view._bidNumericStepper.value = bid;
      quicklistPanel._view._buyNowNumericStepper.value = bin;
    }
  }
}
