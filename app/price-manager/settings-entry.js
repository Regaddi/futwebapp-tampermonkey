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

    this.dragSrcEl = null;

    this.featurePanel.on('click', '.pm-add-btn', this._handleClickAdd);
    this.featurePanel.on('click', '.pm-remove-btn', this._handleClickRemove);
    this.featurePanel.on('change', '.pm-bid', this._handleChangeBid);
    this.featurePanel.on('change', '.pm-bin', this._handleChangeBin);
    this.featurePanel.on('mousedown', '.pm-setting-handle', this._handleMousdownHandle);
    this.featurePanel.on('dragstart', '.pm-setting', this._handleDragstartSetting);
    this.featurePanel.on('dragenter', '.pm-setting', this._handleDragenterSetting);
    this.featurePanel.on('dragover', '.pm-setting', this._handleDragoverSetting);
    this.featurePanel.on('dragleave', '.pm-setting', this._handleDragleaveSetting);
    this.featurePanel.on('drop', '.pm-setting', this._handleDropSetting);
    this.featurePanel.on('dragend', '.pm-setting', this._handleDragendSetting);

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

  _updatePositions() {
    const settings = Database.getJson(`settings:${this.id}`, {});
    this.pmList.find('.pm-setting').each((index, el) => {
      const key = $(el).data('key');
      if (!(key in settings)) return;
      settings[key].position = index;
    });
    Database.setJson(`settings:${this.id}`, settings);
  }

  _handleMousdownHandle = (ev) => {
    $(ev.currentTarget).closest('.pm-setting').attr('draggable', true);
  }

  _handleDragstartSetting = (ev) => {
    const el = ev.target;
    this.dragSrcEl = el;
    this.pmList.addClass('dragging');
    el.style.opacity = '0.4';
    ev.originalEvent.dataTransfer.effectAllowed = 'move'; // eslint-disable-line no-param-reassign
    ev.originalEvent.dataTransfer.setData('text/html', el.innerHTML);
  }

  _handleDragenterSetting = (ev) => {
    const target = $(ev.target);
    if (target.is('.pm-setting')) {
      target.addClass('pm-drag-over');
    }
  }

  _handleDragoverSetting = (ev) => {
    ev.preventDefault();
    ev.originalEvent.dataTransfer.dropEffect = 'move'; // eslint-disable-line no-param-reassign
    return false;
  }

  _handleDragleaveSetting = (ev) => {
    const target = $(ev.target);
    if (target.is('.pm-setting')) {
      target.removeClass('pm-drag-over');
    }
  }

  _handleDropSetting = (ev) => {
    if (this.dragSrcEl !== ev.target && $(ev.target).is('.pm-setting')) {
      const dragSrcKey = $(this.dragSrcEl).data('key');
      const targetKey = $(ev.target).data('key');
      this.dragSrcEl.innerHTML = ev.target.innerHTML;
      $(this.dragSrcEl).data('key', targetKey).attr('data-key', targetKey);
      ev.target.innerHTML = ev.originalEvent.dataTransfer.getData('text/html'); // eslint-disable-line no-param-reassign
      $(ev.target).data('key', dragSrcKey).attr('data-key', dragSrcKey);
    }
    this._updatePositions();
  }

  _handleDragendSetting = () => {
    this.featurePanel.find('.pm-setting').removeClass('pm-drag-over').css('opacity', '').removeAttr('draggable');
    this.pmList.removeClass('dragging');
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
      position: this.pmList.find('.pm-setting').length - 1,
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
    <em class="pm-info">Here you can configure automatic transfer market prices. Add the consumables you want to manage using the dropdown and the "Add" button.</em>
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
    const settings = Object.keys(configs).sort((a, b) => {
      const sA = configs[a];
      const sB = configs[b];
      if (sA.position > sB.position) {
        return 1;
      }
      if (sA.position < sB.position) {
        return -1;
      }
      return 0;
    }).map((key) => {
      const config = configs[key];
      return `
        <div class="pm-setting" data-key="${key}">
          <span class="pm-setting-handle" />
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
