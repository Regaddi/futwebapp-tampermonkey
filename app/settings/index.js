/* globals $ */
/* eslint-disable no-restricted-syntax */

import './index.scss';
import { analytics } from '../core';
import settingsPage from './html/index/settings.html';

function handleFieldChange(entry, setting, e) {
  const input = $(e.target);
  if (input.is(':checkbox')) {
    entry.changeValue(setting.key, e.target.checked);
  } else if (setting.type === 'checkbox') {
    entry.changeValue(setting.key, e.target.checked);
  } else {
    entry.changeValue(setting.key, e.target.value);
  }

  if (setting.callback) {
    setting.callback(e.target.value);
  }
  if (setting.subsettings && setting.subsettings.length > 0) {
    $(`[data-parent-feature-setting-id='${entry.id}:${setting.key}']`).toggle();
  }
  if (setting.groupedSettings && setting.groupedSettings.length > 0) {
    $(`[data-parent-feature-setting-id='${entry.id}:${setting.key}']`).toggle();
  }
}

function renderSettingsEntry(entry) {
  const checked = entry.isActive ? 'checked="checked"' : '';
  return `<h3 class="main-setting">
    <input type="checkbox" id="${entry.id}" data-feature-id="${entry.id}" ${checked} />
    <label for="${entry.id}">${entry.name}</label>
  </h3>`;
}

function renderInput(setting, entry, inputId) {
  return `<input
    type="${setting.type}"
    id="${inputId}"
    data-feature-setting-id="${entry.id}:${setting.key}"
    value="${setting.value}"
    ${setting.type === 'checkbox' && setting.value.toString() === 'true' ? 'checked' : ''}
  />`;
}

function renderLabel(setting, inputId, isCheckbox) {
  return isCheckbox ? `<label for="${inputId}">${setting.label}</label>` : '';
}

function renderSubsetting(setting, entry) {
  const inputId = `${entry.id}:${setting.key}`;
  return `<div class="setting">
    ${renderLabel(setting, inputId, setting.type !== 'checkbox')}
    ${renderInput(setting, entry, inputId)}
    ${renderLabel(setting, inputId, setting.type === 'checkbox')}
  </div>`;
}

function renderGroupedSettings(group, entry) {
  const items = group.map((item) => {
    const inputId = `${entry.id}:${item.key}`;
    return `<div class="setting-group-item">
      ${renderLabel(item, inputId, item.type !== 'checkbox')}
      ${renderInput(item, entry, inputId)}
      ${renderLabel(item, inputId, item.type === 'checkbox')}
    </div>`;
  });
  return `<div class="setting setting-group">
    ${items.join('')}
  </div>`;
}

function renderSubsettings(entry) {
  let settingsFields = '';
  for (const setting of entry.settings) {
    if (setting.subsettings.length > 0 || setting.groupedSettings.length > 0) {
      settingsFields += renderSubsetting(setting, entry);

      const settingActive = setting.value ? 'block' : 'none';
      settingsFields += `<div data-parent-feature-setting-id="${entry.id}:${setting.key}" style="display: ${settingActive}">`;
      for (const subsetting of setting.subsettings) {
        settingsFields += renderSubsetting(subsetting, entry);
      }
      for (const group of setting.groupedSettings) {
        settingsFields += renderGroupedSettings(group, entry);
      }
      settingsFields += '</div>';
    } else {
      settingsFields += renderSubsetting(setting, entry);
    }
  }
  const featureActive = entry.isActive ? 'block' : 'none';
  const panel = $(`<div class="feature-settings"><div data-feature-settings="${entry.id}" style="display: ${featureActive};">${settingsFields}</div></div>`);
  for (const setting of entry.settings) {
    $(`[data-feature-setting-id='${entry.id}:${setting.key}']`, panel).on('change', (e) => {
      handleFieldChange(entry, setting, e);
    });
    for (const subsetting of setting.subsettings) {
      $(`[data-feature-setting-id='${entry.id}:${subsetting.key}']`, panel).on('change', (e) => {
        handleFieldChange(entry, subsetting, e);
      });
    }
    for (const group of setting.groupedSettings) {
      for (const item of group) {
        $(`[data-feature-setting-id='${entry.id}:${item.key}']`, panel).on('change', (e) => {
          handleFieldChange(entry, item, e);
        });
      }
    }
  }
  return panel;
}

export default (settings) => {
  const html = settingsPage;

  $('body').prepend(html);

  const settingsPanel = $('.futsettings #settingspanel');

  for (const entry of settings.getEntries()) {
    settingsPanel.append(renderSettingsEntry(entry));
    if (entry.settings && entry.settings.length > 0) {
      settingsPanel.append(renderSubsettings(entry));
    } else {
      settingsPanel.append('<div class="feature-settings-empty"></div>');
    }

    $(`[data-feature-id='${entry.id}']`).on('click', () => {
      settings.toggleEntry(entry.id);
      $(`[data-feature-settings='${entry.id}']`).toggle();
    });
  }

  $('.futsettings-toggle').click(() => {
    analytics.trackEvent('Settings', 'Toggle settings', $('.futsettings').is(':visible'));
    $('.futsettings').toggle();
  });
};
