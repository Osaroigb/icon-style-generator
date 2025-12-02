// Validate HEX color format
export function isValidHex(hex: string): boolean {
  const hexRegex = /^#?[0-9A-Fa-f]{6}$/;
  return hexRegex.test(hex);
}

// Convert HEX color to descriptive name
export function hexToColorName(hex: string): string {
  const colors: { [key: string]: string } = {
    // Reds
    'FF0000': 'red', 'FF6B6B': 'coral red', 'FF1744': 'bright red',
    'DC143C': 'crimson', 'CD5C5C': 'indian red',
    // Pinks
    'FF69B4': 'hot pink', 'FF6B9D': 'vibrant pink', 'FFC0CB': 'light pink',
    'FFB6C1': 'pastel pink', 'FF1493': 'deep pink',
    // Oranges
    'FFA500': 'orange', 'FF8C00': 'dark orange', 'FFB347': 'pastel orange',
    'FF7F50': 'coral', 'FF6347': 'tomato',
    // Yellows
    'FFFF00': 'yellow', 'FFD700': 'gold', 'FFF59D': 'light yellow',
    'FFFFE0': 'pale yellow', 'F0E68C': 'khaki',
    // Greens
    '00FF00': 'green', '4CAF50': 'grass green', '81C784': 'soft green',
    '90EE90': 'light green', '228B22': 'forest green', '98FB98': 'pale green',
    '00FA9A': 'spring green', '3CB371': 'sea green',
    // Blues
    '0000FF': 'blue', '2196F3': 'bright blue', '4A90E2': 'sky blue',
    '87CEEB': 'light blue', '1E90FF': 'dodger blue', '4169E1': 'royal blue',
    '00BFFF': 'deep sky blue', 'ADD8E6': 'powder blue',
    // Purples
    '800080': 'purple', '9C27B0': 'violet', 'BA68C8': 'lavender',
    'DDA0DD': 'plum', '9370DB': 'medium purple', '8A2BE2': 'blue violet',
    // Teals/Cyans
    '00CED1': 'dark turquoise', '40E0D0': 'turquoise', '48D1CC': 'medium turquoise',
    '00FFFF': 'cyan', '7FFFD4': 'aquamarine',
    // Browns
    'A52A2A': 'brown', 'D2691E': 'chocolate', 'CD853F': 'peru',
    'F4A460': 'sandy brown', '8B4513': 'saddle brown',
    // Grays
    'FFFFFF': 'white', '000000': 'black', 'A0A0A0': 'grey',
    '808080': 'gray', 'C0C0C0': 'silver', 'D3D3D3': 'light gray',
    '696969': 'dim gray'
  };

  if (!isValidHex(hex)) {
    throw new Error(`Invalid HEX color format: ${hex}`);
  }

  const cleanHex = hex.replace('#', '').toUpperCase();
  return colors[cleanHex] || hex;
}
