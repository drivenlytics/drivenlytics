import frameworkData from './bav-48-framework.json';

export interface BAVAttribute {
  name: string;
  description: string;
  weights: Record<string, number>;
}

export interface BAVFramework {
  attributes: BAVAttribute[];
  archetypes: string[];
}

export interface ArchetypeScore {
  archetype: string;
  score: number;
}

/**
 * Calculates archetypal scores based on selected brand attributes.
 * @param selectedAttributes List of brand imagery attributes chosen by the user.
 * @returns Sorted list of archetype scores descending.
 */
export function calculateArchetypeProfile(selectedAttributes: string[]): ArchetypeScore[] {
  const framework = frameworkData as unknown as BAVFramework;
  const scores: Record<string, number> = {};

  // Initialize scores
  framework.archetypes.forEach((arch) => {
    scores[arch] = 0;
  });

  // Calculate weights
  selectedAttributes.forEach((selectedName) => {
    const attribute = framework.attributes.find(
      (attr) => attr.name.toLowerCase() === selectedName.toLowerCase().trim()
    );

    if (attribute) {
      Object.entries(attribute.weights).forEach(([archetype, weight]) => {
        if (scores.hasOwnProperty(archetype)) {
          scores[archetype] += weight;
        }
      });
    }
  });

  // Convert to sorted array
  return Object.entries(scores)
    .map(([archetype, score]) => ({ archetype, score }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

/**
 * Helper to get primary and secondary archetypes.
 */
export function getArchetypeSummary(selectedAttributes: string[]) {
  const results = calculateArchetypeProfile(selectedAttributes);
  return {
    primary: results[0] || null,
    secondary: results.slice(1, 3),
    fullProfile: results,
  };
}
