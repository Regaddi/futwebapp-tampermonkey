const validTypes = {
  'pm-bronze-player-contract': {
    itemValidator: item => (item.isPlayerContract() && item.isBronzeRating() && !item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Bronze Player Contract',
  },
  'pm-bronze-player-contract-rare': {
    itemValidator: item => (item.isPlayerContract() && item.isBronzeRating() && item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Bronze Rare Player Contract',
  },
  'pm-silver-player-contract': {
    itemValidator: item => (item.isPlayerContract() && item.isSilverRating() && !item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Silver Player Contract',
  },
  'pm-silver-player-contract-rare': {
    itemValidator: item => (item.isPlayerContract() && item.isSilverRating() && item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Silver Rare Player Contract',
  },
  'pm-gold-player-contract': {
    itemValidator: item => (item.isPlayerContract() && item.isGoldRating() && !item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Gold Player Contract',
  },
  'pm-gold-player-contract-rare': {
    itemValidator: item => (item.isPlayerContract() && item.isGoldRating() && item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Gold Rare Player Contract',
  },
  'pm-bronze-manager-contract': {
    itemValidator: item => (item.isManagerContract() && item.isBronzeRating() && !item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Bronze Manager Contract',
  },
  'pm-bronze-manager-contract-rare': {
    itemValidator: item => (item.isManagerContract() && item.isBronzeRating() && item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Bronze Rare Manager Contract',
  },
  'pm-silver-manager-contract': {
    itemValidator: item => (item.isManagerContract() && item.isSilverRating() && !item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Silver Manager Contract',
  },
  'pm-silver-manager-contract-rare': {
    itemValidator: item => (item.isManagerContract() && item.isSilverRating() && item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Silver Rare Manager Contract',
  },
  'pm-gold-manager-contract': {
    itemValidator: item => (item.isManagerContract() && item.isGoldRating() && !item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Gold Manager Contract',
  },
  'pm-gold-manager-contract-rare': {
    itemValidator: item => (item.isManagerContract() && item.isGoldRating() && item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Gold Rare Manager Contract',
  },
  'pm-bronze-player-fitness': {
    itemValidator: item => (item.isFitness() && item.isBronzeRating() && !item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Bronze Player Fitness',
  },
  'pm-silver-player-fitness': {
    itemValidator: item => (item.isFitness() && item.isSilverRating() && !item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Silver Player Fitness',
  },
  'pm-gold-player-fitness': {
    itemValidator: item => (item.isFitness() && item.isGoldRating() && !item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Gold Player Fitness',
  },
  'pm-bronze-team-fitness': {
    itemValidator: item => (item.isFitness() && item.isBronzeRating() && item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Bronze Team Fitness',
  },
  'pm-silver-team-fitness': {
    itemValidator: item => (item.isFitness() && item.isSilverRating() && item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Silver Team Fitness',
  },
  'pm-gold-team-fitness': {
    itemValidator: item => (item.isFitness() && item.isGoldRating() && item.isRare()),
    bid: 150,
    bin: 200,
    label: 'Gold Team Fitness',
  },
};

export default validTypes;
