import { masteryLevels } from '$lib/constants/masteryLevel';
import type { MasteryLevel } from '$lib/types/MasteryLevel';

export const getMasteryLevelFromLabel = (label: string): MasteryLevel | undefined => {
  return masteryLevels.find((masteryLevel) => masteryLevel.label == label);
};

export const getMasteryLevelFromLevel = (level: string): MasteryLevel | undefined => {
  return masteryLevels.find((masteryLevel) => masteryLevel.value == level);
};
