import { Database } from './db';

export class SettingsEntry {
  constructor(id, name) {
    const settings = Database.getJson(`settings:${id}`, {});

    this.id = id;
    this.name = name;
    this.isActive = settings.isActive ? settings.isActive : false;
    this.settings = [];
  }

  toggle() {
    this.isActive = !this.isActive;

    const settings = Database.getJson(`settings:${this.id}`, {});
    settings.isActive = this.isActive;
    Database.setJson(`settings:${this.id}`, settings);
  }

  addSetting(label, key, defaultValue, type, cb) {
    const settings = Database.getJson(`settings:${this.id}`, {});

    settings[key] = key in settings ? settings[key] : defaultValue;
    Database.setJson(`settings:${this.id}`, settings);

    this.settings.push({
      label,
      key,
      type,
      value: key in settings ? settings[key] : defaultValue,
      callback: cb,
      groupedSettings: [],
      subsettings: [],
    });
  }

  addSettingUnder(underKey, label, key, defaultValue, type, cb) {
    const settings = Database.getJson(`settings:${this.id}`, {});
    settings[key] = key in settings ? settings[key] : defaultValue;
    Database.setJson(`settings:${this.id}`, settings);

    const setting = this.settings.find(s => s.key === underKey);
    setting.subsettings.push({
      label,
      key,
      type,
      value: key in settings ? settings[key] : defaultValue,
      callback: cb,
    });
  }

  addGroupedSettingsUnder(underKey, groupItems, cb) {
    const settings = Database.getJson(`settings:${this.id}`, {});
    const setting = this.settings.find(s => s.key === underKey);

    setting.groupedSettings.push(groupItems.map((a) => {
      const label = a[0];
      const key = a[1];
      const defaultValue = a[2];
      settings[key] = key in settings ? settings[key] : defaultValue;
      return {
        label,
        key,
        type: a[3],
        value: key in settings ? settings[key] : defaultValue,
        callback: cb,
      };
    }));

    Database.setJson(`settings:${this.id}`, settings);
  }

  changeValue(key, value) {
    const settings = Database.getJson(`settings:${this.id}`, {});

    settings[key] = value;

    Database.setJson(`settings:${this.id}`, settings);
  }
}
