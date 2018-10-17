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
  }

  toggle() {
    super.toggle();

    if (this.isActive) {
      this._onActivate();
    } else {
      this._onDeactivate();
    }
  }

  _onActivate() {
    this.featurePanel.append(this._render());

    this.pmSelect = this.featurePanel.find('.pm-select');
    this.pmList = this.featurePanel.find('.pm-list');

    this._renderList();

    this.featurePanel.removeClass('feature-settings-empty').addClass('feature-settings');
  }

  _onDeactivate() {
    this.featurePanel.html('').addClass('feature-settings-empty').removeClass('feature-settings');
  }

  customSettingsUIHandler = (featurePanel) => {
    this.featurePanel = featurePanel;

    this.featurePanel.on('click', '.pm-add-btn', this._handleClickAdd);
    this.featurePanel.on('click', '.pm-remove-btn', this._handleClickRemove);
    this.featurePanel.on('change', '.pm-bid', this._handleChangeBid);
    this.featurePanel.on('change', '.pm-bin', this._handleChangeBin);

    if (this.isActive) {
      this._onActivate();
    }
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

    if (!settings.isActive) return '';

    delete settings.isActive;

    return `
    <em>Here you can configure automatic transfer market prices. Add the consumables you want to manage using the dropdown and the "Add" button.</em>
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

    if (!settings.isActive) return;

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
