export const getTagColor = (tag: string): { bg: string; text: string; border: string } => {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return {
    bg: `hsl(${hue}, 45%, 92%)`,
    text: `hsl(${hue}, 50%, 28%)`,
    border: `hsl(${hue}, 35%, 85%)`,
  };
};
