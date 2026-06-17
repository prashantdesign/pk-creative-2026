export function getIconForText(text: string): string {
  if (!text) return 'check-circle-2';
  
  const lowerText = text.toLowerCase();
  
  const keywordMap: Record<string, string> = {
    // Industries / Who We Help
    'hotel': 'building',
    'resort': 'palmtree',
    'restaurant': 'utensils',
    'cafe': 'coffee',
    'food': 'utensils',
    'bakery': 'croissant',
    'jewel': 'gem',
    'local': 'map-pin',
    'startup': 'rocket',
    'coach': 'user-check',
    'consult': 'briefcase',
    'educat': 'graduation-cap',
    'school': 'graduation-cap',
    'health': 'heart',
    'medical': 'stethoscope',
    'tech': 'cpu',
    'finance': 'pie-chart',
    'real estate': 'home',
    'travel': 'plane',
    'art': 'brush',
    'music': 'music',
    'fitness': 'dumbbell',
    'gym': 'dumbbell',
    'event': 'calendar',
    'photo': 'camera',
    'video': 'video',
    'store': 'shopping-bag',
    'shop': 'shopping-cart',
    'fashion': 'shirt',
    'beauty': 'sparkles',
    'spa': 'flower-2',
    'auto': 'car',
    'law': 'scale',
    'non-profit': 'globe',
    'charity': 'heart-handshake',
    'agency': 'briefcase',
    'b2b': 'building-2',
    'b2c': 'users',
    
    // Services
    'web': 'monitor',
    'app': 'smartphone',
    'ui': 'layout',
    'ux': 'pointer',
    'brand': 'pen-tool',
    'social': 'share-2',
    'market': 'target',
    'seo': 'search',
    'design': 'palette',
    'develop': 'code',
    'write': 'edit-3',
    'content': 'file-text',
    'maintain': 'settings',
    'support': 'life-buoy',
    'host': 'server',
    'cloud': 'cloud',
    'security': 'shield',
    'data': 'database',
    'analytic': 'line-chart',
    'strategy': 'map',
    'print': 'printer',
    'packag': 'package',
    'logo': 'hexagon',
    'illustrat': 'image',
    'animation': 'film',
    'motion': 'play-circle',
  };

  for (const [keyword, iconName] of Object.entries(keywordMap)) {
    if (lowerText.includes(keyword)) {
      return iconName;
    }
  }

  return 'check-circle-2'; // Default fallback
}
