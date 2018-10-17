/* global
window
document
$
*/

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
    const quicklistPanel = getAppMain().getRootViewController()
      .getPresentedViewController()
      .getCurrentViewController()
      .getCurrentController()
      ._rightController._currentController._quickListPanel;

    const item = quicklistPanel._item;
    let bid = 0;
    let bin = 0;

    const states = ['bronze', 'silver', 'gold'];

    states.forEach((state) => {
      if (settings[`pm-${state}`]) {
        if (settings[`pm-${state}-player-contract`] && PriceManager._isPlayerContract(item, state)) {
          bid = parseInt(settings[`pm-${state}-player-contract-bid`], 10);
          bin = parseInt(settings[`pm-${state}-player-contract-bin`], 10);
        }
        if (settings[`pm-${state}-player-contract-rare`] && PriceManager._isPlayerContract(item, `${state}-rare`)) {
          bid = parseInt(settings[`pm-${state}-player-contract-rare-bid`], 10);
          bin = parseInt(settings[`pm-${state}-player-contract-rare-bin`], 10);
        }
        if (settings[`pm-${state}-manager-contract`] && PriceManager._isManagerContract(item, state)) {
          bid = parseInt(settings[`pm-${state}-manager-contract-bid`], 10);
          bin = parseInt(settings[`pm-${state}-manager-contract-bin`], 10);
        }
        if (settings[`pm-${state}-manager-contract-rare`] && PriceManager._isManagerContract(item, `${state}-rare`)) {
          bid = parseInt(settings[`pm-${state}-manager-contract-rare-bid`], 10);
          bin = parseInt(settings[`pm-${state}-manager-contract-rare-bin`], 10);
        }
        if (settings[`pm-${state}-player-fitness`] && PriceManager._isFitnessCard(item, state)) {
          bid = parseInt(settings[`pm-${state}-player-fitness-bid`], 10);
          bin = parseInt(settings[`pm-${state}-player-fitness-bin`], 10);
        }
        if (settings[`pm-${state}-player-fitness`] && PriceManager._isFitnessCard(item, `${state}-rare`)) {
          bid = parseInt(settings[`pm-${state}-team-fitness-bid`], 10);
          bin = parseInt(settings[`pm-${state}-team-fitness-bin`], 10);
        }
      }
    });

    if (item && bid && bin) {
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

  static _isPlayerContract(item, color) {
    if (item.subtype !== 201) return false; // player contract cards
    const data = item._staticData;
    const {
      bronzeBoost: b,
      silverBoost: s,
      goldBoost: g,
    } = data;
    switch (color) {
      case 'bronze':
        return item.type === 'contract' && b === 8 && s === 2 && g === 1;
      case 'bronze-rare':
        return item.type === 'contract' && b === 15 && s === 6 && g === 3;
      case 'silver':
        return item.type === 'contract' && b === 10 && s === 10 && g === 8;
      case 'silver-rare':
        return item.type === 'contract' && b === 20 && s === 24 && g === 18;
      case 'gold':
        return item.type === 'contract' && b === 15 && s === 11 && g === 13;
      case 'gold-rare':
        return item.type === 'contract' && b === 28 && s === 24 && g === 28;
      default:
        return false;
    }
  }

  static _isManagerContract(item, color) {
    if (item.subtype !== 202) return false; // manager contract cards
    const data = item._staticData;
    const {
      bronzeBoost: b,
      silverBoost: s,
      goldBoost: g,
    } = data;
    switch (color) {
      case 'bronze':
        return item.type === 'contract' && b === 8 && s === 2 && g === 1;
      case 'bronze-rare':
        return item.type === 'contract' && b === 15 && s === 6 && g === 3;
      case 'silver':
        return item.type === 'contract' && b === 8 && s === 10 && g === 8;
      case 'silver-rare':
        return item.type === 'contract' && b === 18 && s === 24 && g === 18;
      case 'gold':
        return item.type === 'contract' && b === 11 && s === 11 && g === 13;
      case 'gold-rare':
        return item.type === 'contract' && b === 24 && s === 24 && g === 28;
      default:
        return false;
    }
  }

  static _isFitnessCard(item, color) {
    switch (color) {
      case 'bronze':
        return item.type === 'health' && item._staticData.amount === 20 && item.rating === 55;
      case 'bronze-rare':
        return item.type === 'health' && item._staticData.amount === 10 && item.rating === 55;
      case 'silver':
        return item.type === 'health' && item._staticData.amount === 40 && item.rating === 70;
      case 'silver-rare':
        return item.type === 'health' && item._staticData.amount === 20 && item.rating === 70;
      case 'gold':
        return item.type === 'health' && item._staticData.amount === 60 && item.rating === 80;
      case 'gold-rare':
        return item.type === 'health' && item._staticData.amount === 30 && item.rating === 80;
      default:
        return false;
    }
  }
}
