export interface StylePreset {
  id: 1 | 2 | 3 | 4 | 5;
  name: string;
  promptPrefix: string;
}

export const stylePresets: StylePreset[] = [
  {
    id: 1,
    name: "Bold Outlined Pastels",
    promptPrefix: "cute icon with bold dark purple outlines, pastel colors, flat cartoon style, simple clean design, light grey rounded square background"
  },
  {
    id: 2,
    name: "Circular Background with Dots",
    promptPrefix: "cute icon with thin dark brown outlines, bright primary colors, centered on pastel circular background with small scattered decorative dots in various colors around the circle, playful whimsical cartoon style"
  },
  {
    id: 3,
    name: "Cloud Background",
    promptPrefix: "icon with thin dark outlines, primary colors, teal mint green cloud background, white outlined clouds scattered around, small yellow stars, atmospheric sky setting"
  },
  {
    id: 4,
    name: "Glossy 3D",
    promptPrefix: "icon with glossy 3D gradient style, bright blue metallic finish, no outlines, smooth gradients creating depth, modern sleek professional appearance"
  },
  {
    id: 5,
    name: "Minimalist Silhouette",
    promptPrefix: "minimalist white silhouette icon on solid teal dark cyan circular background, negative space design, clean iconic monochromatic aesthetic"
  }
];

export function getStyleById(id: number): StylePreset | undefined {
  return stylePresets.find(style => style.id === id);
}
