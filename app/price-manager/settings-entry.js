import { SettingsEntry } from '../core';

export class PriceManagerSettings extends SettingsEntry {
  static id = 'price-manager';
  constructor() {
    super('price-manager', 'Price Manager for consumables');

    this.addSetting('Bronze items', 'pm-bronze', true, 'checkbox');
    this.addGroupedSettingsUnder('pm-bronze', [
      ['Player contract', 'pm-bronze-player-contract', true, 'checkbox'],
      ['Min. Bid Price', 'pm-bronze-player-contract-bid', 150, 'number'],
      ['BIN Price', 'pm-bronze-player-contract-bin', 200, 'number'],
      ['Rare player contract', 'pm-bronze-player-contract-rare', true, 'checkbox'],
      ['Min. Bid Price', 'pm-bronze-player-contract-rare-bid', 150, 'number'],
      ['BIN Price', 'pm-bronze-player-contract-rare-bin', 200, 'number'],
    ]);
    this.addGroupedSettingsUnder('pm-bronze', [
      ['Manager contract', 'pm-bronze-manager-contract', true, 'checkbox'],
      ['Min. Bid Price', 'pm-bronze-manager-contract-bid', 150, 'number'],
      ['BIN Price', 'pm-bronze-manager-contract-bin', 200, 'number'],
      ['Rare manager contract', 'pm-bronze-manager-contract-rare', true, 'checkbox'],
      ['Min. Bid Price', 'pm-bronze-manager-contract-rare-bid', 150, 'number'],
      ['BIN Price', 'pm-bronze-manager-contract-rare-bin', 200, 'number'],
    ]);
    this.addGroupedSettingsUnder('pm-bronze', [
      ['Player Fitness', 'pm-bronze-player-fitness', true, 'checkbox'],
      ['Min. Bid Price', 'pm-bronze-player-fitness-bid', 150, 'number'],
      ['BIN Price', 'pm-bronze-player-fitness-bin', 200, 'number'],
      ['Team Fitness', 'pm-bronze-team-fitness', true, 'checkbox'],
      ['Min. Bid Price', 'pm-bronze-team-fitness-bid', 700, 'number'],
      ['BIN Price', 'pm-bronze-team-fitness-bin', 750, 'number'],
    ]);

    this.addSetting('Silver items', 'pm-silver', true, 'checkbox');
    this.addGroupedSettingsUnder('pm-silver', [
      ['Player contract', 'pm-silver-player-contract', true, 'checkbox'],
      ['Min. Bid Price', 'pm-silver-player-contract-bid', 150, 'number'],
      ['BIN Price', 'pm-silver-player-contract-bin', 200, 'number'],
      ['Rare player contract', 'pm-silver-player-contract-rare', true, 'checkbox'],
      ['Min. Bid Price', 'pm-silver-player-contract-rare-bid', 150, 'number'],
      ['BIN Price', 'pm-silver-player-contract-rare-bin', 200, 'number'],
    ]);
    this.addGroupedSettingsUnder('pm-silver', [
      ['Manager contract', 'pm-silver-manager-contract', true, 'checkbox'],
      ['Min. Bid Price', 'pm-silver-manager-contract-bid', 150, 'number'],
      ['BIN Price', 'pm-silver-manager-contract-bin', 200, 'number'],
      ['Rare manager contract', 'pm-silver-manager-contract-rare', true, 'checkbox'],
      ['Min. Bid Price', 'pm-silver-manager-contract-rare-bid', 150, 'number'],
      ['BIN Price', 'pm-silver-manager-contract-rare-bin', 200, 'number'],
    ]);
    this.addGroupedSettingsUnder('pm-silver', [
      ['Player Fitness', 'pm-silver-player-fitness', true, 'checkbox'],
      ['Min. Bid Price', 'pm-silver-player-fitness-bid', 150, 'number'],
      ['BIN Price', 'pm-silver-player-fitness-bin', 200, 'number'],
      ['Team Fitness', 'pm-silver-team-fitness', true, 'checkbox'],
      ['Min. Bid Price', 'pm-silver-team-fitness-bid', 950, 'number'],
      ['BIN Price', 'pm-silver-team-fitness-bin', 1000, 'number'],
    ]);

    this.addSetting('Gold items', 'pm-gold', true, 'checkbox');
    this.addGroupedSettingsUnder('pm-gold', [
      ['Player contract', 'pm-gold-player-contract', true, 'checkbox'],
      ['Min. Bid Price', 'pm-gold-player-contract-bid', 150, 'number'],
      ['BIN Price', 'pm-gold-player-contract-bin', 200, 'number'],
      ['Rare player contract', 'pm-gold-player-contract-rare', true, 'checkbox'],
      ['Min. Bid Price', 'pm-gold-player-contract-rare-bid', 150, 'number'],
      ['BIN Price', 'pm-gold-player-contract-rare-bin', 200, 'number'],
    ]);
    this.addGroupedSettingsUnder('pm-gold', [
      ['Manager contract', 'pm-gold-manager-contract', true, 'checkbox'],
      ['Min. Bid Price', 'pm-gold-manager-contract-bid', 150, 'number'],
      ['BIN Price', 'pm-gold-manager-contract-bin', 200, 'number'],
      ['Rare manager contract', 'pm-gold-manager-contract-rare', true, 'checkbox'],
      ['Min. Bid Price', 'pm-gold-manager-contract-rare-bid', 150, 'number'],
      ['BIN Price', 'pm-gold-manager-contract-rare-bin', 200, 'number'],
    ]);
    this.addGroupedSettingsUnder('pm-gold', [
      ['Player Fitness', 'pm-gold-player-fitness', true, 'checkbox'],
      ['Min. Bid Price', 'pm-gold-player-fitness-bid', 150, 'number'],
      ['BIN Price', 'pm-gold-player-fitness-bin', 200, 'number'],
      ['Team Fitness', 'pm-gold-team-fitness', true, 'checkbox'],
      ['Min. Bid Price', 'pm-gold-team-fitness-bid', 950, 'number'],
      ['BIN Price', 'pm-gold-team-fitness-bin', 1000, 'number'],
    ]);
  }
}
