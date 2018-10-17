/* global
$
*/

import { Database, SettingsEntry } from '../core';
import validTypes from './config';

export class PriceManagerSettings extends SettingsEntry {
  static id = 'price-manager';
  constructor() {
    super('price-manager', 'Price Manager for consumables');

    this.validTypes = validTypes;

    // this.addSetting('Bronze items', 'pm-bronze', true, 'checkbox');
    // this.addGroupedSettingsUnder('pm-bronze', [
    //   ['Player contract', 'pm-bronze-player-contract', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-bronze-player-contract-bid', 150, 'number'],
    //   ['BIN Price', 'pm-bronze-player-contract-bin', 200, 'number'],
    //   ['Rare player contract', 'pm-bronze-player-contract-rare', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-bronze-player-contract-rare-bid', 150, 'number'],
    //   ['BIN Price', 'pm-bronze-player-contract-rare-bin', 200, 'number'],
    // ]);
    // this.addGroupedSettingsUnder('pm-bronze', [
    //   ['Manager contract', 'pm-bronze-manager-contract', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-bronze-manager-contract-bid', 150, 'number'],
    //   ['BIN Price', 'pm-bronze-manager-contract-bin', 200, 'number'],
    //   ['Rare manager contract', 'pm-bronze-manager-contract-rare', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-bronze-manager-contract-rare-bid', 150, 'number'],
    //   ['BIN Price', 'pm-bronze-manager-contract-rare-bin', 200, 'number'],
    // ]);
    // this.addGroupedSettingsUnder('pm-bronze', [
    //   ['Player Fitness', 'pm-bronze-player-fitness', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-bronze-player-fitness-bid', 150, 'number'],
    //   ['BIN Price', 'pm-bronze-player-fitness-bin', 200, 'number'],
    //   ['Team Fitness', 'pm-bronze-team-fitness', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-bronze-team-fitness-bid', 700, 'number'],
    //   ['BIN Price', 'pm-bronze-team-fitness-bin', 750, 'number'],
    // ]);

    // this.addSetting('Silver items', 'pm-silver', true, 'checkbox');
    // this.addGroupedSettingsUnder('pm-silver', [
    //   ['Player contract', 'pm-silver-player-contract', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-silver-player-contract-bid', 150, 'number'],
    //   ['BIN Price', 'pm-silver-player-contract-bin', 200, 'number'],
    //   ['Rare player contract', 'pm-silver-player-contract-rare', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-silver-player-contract-rare-bid', 150, 'number'],
    //   ['BIN Price', 'pm-silver-player-contract-rare-bin', 200, 'number'],
    // ]);
    // this.addGroupedSettingsUnder('pm-silver', [
    //   ['Manager contract', 'pm-silver-manager-contract', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-silver-manager-contract-bid', 150, 'number'],
    //   ['BIN Price', 'pm-silver-manager-contract-bin', 200, 'number'],
    //   ['Rare manager contract', 'pm-silver-manager-contract-rare', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-silver-manager-contract-rare-bid', 150, 'number'],
    //   ['BIN Price', 'pm-silver-manager-contract-rare-bin', 200, 'number'],
    // ]);
    // this.addGroupedSettingsUnder('pm-silver', [
    //   ['Player Fitness', 'pm-silver-player-fitness', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-silver-player-fitness-bid', 150, 'number'],
    //   ['BIN Price', 'pm-silver-player-fitness-bin', 200, 'number'],
    //   ['Team Fitness', 'pm-silver-team-fitness', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-silver-team-fitness-bid', 950, 'number'],
    //   ['BIN Price', 'pm-silver-team-fitness-bin', 1000, 'number'],
    // ]);

    // this.addSetting('Gold items', 'pm-gold', true, 'checkbox');
    // this.addGroupedSettingsUnder('pm-gold', [
    //   ['Player contract', 'pm-gold-player-contract', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-gold-player-contract-bid', 150, 'number'],
    //   ['BIN Price', 'pm-gold-player-contract-bin', 200, 'number'],
    //   ['Rare player contract', 'pm-gold-player-contract-rare', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-gold-player-contract-rare-bid', 150, 'number'],
    //   ['BIN Price', 'pm-gold-player-contract-rare-bin', 200, 'number'],
    // ]);
    // this.addGroupedSettingsUnder('pm-gold', [
    //   ['Manager contract', 'pm-gold-manager-contract', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-gold-manager-contract-bid', 150, 'number'],
    //   ['BIN Price', 'pm-gold-manager-contract-bin', 200, 'number'],
    //   ['Rare manager contract', 'pm-gold-manager-contract-rare', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-gold-manager-contract-rare-bid', 150, 'number'],
    //   ['BIN Price', 'pm-gold-manager-contract-rare-bin', 200, 'number'],
    // ]);
    // this.addGroupedSettingsUnder('pm-gold', [
    //   ['Player Fitness', 'pm-gold-player-fitness', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-gold-player-fitness-bid', 150, 'number'],
    //   ['BIN Price', 'pm-gold-player-fitness-bin', 200, 'number'],
    //   ['Team Fitness', 'pm-gold-team-fitness', true, 'checkbox'],
    //   ['Min. Bid Price', 'pm-gold-team-fitness-bid', 950, 'number'],
    //   ['BIN Price', 'pm-gold-team-fitness-bin', 1000, 'number'],
    // ]);
  }

  customSettingsUIHandler = (featurePanel) => {
    featurePanel.append(this._render());

    this.pmSelect = featurePanel.find('.pm-select');
    this.pmList = featurePanel.find('.pm-list');

    this._renderList();

    featurePanel.on('click', '.pm-add-btn', this._handleClickAdd);
    featurePanel.on('click', '.pm-remove-btn', this._handleClickRemove);
    featurePanel.on('change', '.pm-bid', this._handleChangeBid);
    featurePanel.on('change', '.pm-bin', this._handleChangeBin);

    featurePanel.removeClass('feature-settings-empty').addClass('feature-settings');
  }

  _handleClickAdd = () => {
    const key = this.pmSelect.val();
    if (key) {
      this._addType(key);
      this._renderList();
    }
  }

  _handleClickRemove = (ev) => {
    const key = $(ev.currentTarget).closest('.pm-setting').data('key');
    if (key) {
      this._removeType(key);
      this._renderList();
    }
  }

  _handleChangeBid = (ev) => {
    const key = $(ev.currentTarget).closest('.pm-setting').data('key');
    if (key) {
      this._setBid(key, ev.currentTarget.value);
    }
  }

  _handleChangeBin = (ev) => {
    const key = $(ev.currentTarget).closest('.pm-setting').data('key');
    if (key) {
      this._setBin(key, ev.currentTarget.value);
    }
  }

  _setBid(key, bid) {
    if (!Object.keys(this.validTypes).includes(key)) return;
    const settings = Database.getJson(`settings:${this.id}`, {});
    if (!(key in settings)) return;
    settings[key].bid = bid;
    Database.setJson(`settings:${this.id}`, settings);
  }

  _setBin(key, bin) {
    if (!Object.keys(this.validTypes).includes(key)) return;
    const settings = Database.getJson(`settings:${this.id}`, {});
    if (!(key in settings)) return;
    settings[key].bin = bin;
    Database.setJson(`settings:${this.id}`, settings);
  }

  _addType(key) {
    if (!Object.keys(this.validTypes).includes(key)) return;
    const type = this.validTypes[key];
    const settings = Database.getJson(`settings:${this.id}`, {});

    if (key in settings) return;

    settings[key] = {
      bid: type.bid,
      bin: type.bin,
    };

    Database.setJson(`settings:${this.id}`, settings);

    this.pmSelect.find(`option[value="${key}"]`).attr('disabled', 'disabled');
    this.pmSelect.val('');
  }

  _removeType(key) {
    if (!Object.keys(this.validTypes).includes(key)) return;
    const settings = Database.getJson(`settings:${this.id}`, {});

    if (!(key in settings)) return;

    delete settings[key];

    Database.setJson(`settings:${this.id}`, settings);

    this.pmSelect.find(`option[value="${key}"]`).removeAttr('disabled');
  }

  _render() {
    const settings = Database.getJson(`settings:${this.id}`, {});

    delete settings.isActive;

    return `
    <div class="pm-add">
      <select class="pm-select" name="type">
        <option value="">Select</option>
        ${Object.keys(this.validTypes).map(key => `
        <option value="${key}" ${key in settings ? 'disabled' : ''}>${this.validTypes[key].label}</option>
        `)}
      </select>
      <button class="pm-add-btn btn-standard call-to-action">Add</button>
    </div>
    <div class="pm-list"></div>
    `;
  }

  _renderList() {
    const settings = Database.getJson(`settings:${this.id}`, {});

    delete settings.isActive;

    this.pmList.html(this._listMarkup(settings));
  }

  _listMarkup(configs) {
    const settings = Object.keys(configs).map((key) => {
      const config = configs[key];
      return `
        <div class="pm-setting" data-key="${key}">
          <span class="pm-setting-label">${this.validTypes[key].label}</span>
          <input type="number" class="pm-bid" name="${key}.bid" value="${config.bid}" min="150" step="50" placeholder="Bid Price" />
          <input type="number" class="pm-bin" name="${key}.bin" value="${config.bin}" min="200" step="50" placeholder="Buy Now Price" />
          <button class="pm-remove-btn btn-standard"></button>
        </div>
      `;
    });
    return settings.join('');
  }
}
