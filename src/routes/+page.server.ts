import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const repository = 's1lvax/route';
  let releaseVersion: string | null = null;

  // If we are unable to retrieve the release version for some reason, we can continue, and ensure that it's not
  // displayed in components by setting it to null and letting the components handle conditional rendering
  try {
    const response = await fetch(`https://api.github.com/repos/${repository}/releases`);
    if (response.ok) {
      releaseVersion = 'v' + (await response.json())[0].tag_name;
    }
  } catch {
    console.error(`Failed to fetch release info for ${repository}`);
  }

  return { releaseVersion };
};
