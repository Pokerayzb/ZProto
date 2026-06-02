import coinIcon from './assets/coin.svg';
import experienceIcon from './assets/experience.svg';
import reputationIcon from './assets/reputation.svg';

/** Resource icons for {@link ValueBadge}. Add new assets here as needed. */
export const resourceIcons = {
  coin: coinIcon,
  reputation: reputationIcon,
  experience: experienceIcon,
} as const;

export { coinIcon, experienceIcon, reputationIcon };
