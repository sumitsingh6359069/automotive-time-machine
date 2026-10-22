// Era metadata — visual identity and narrative context for each section
import type { Era } from './vehicles';

export interface EraConfig {
  id: Era;
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  narrative: string;
  theme: 'renaissance' | 'mythological' | 'gothic';
  accentHex: string;
  bgGradient: string;
  order: number;
  isMainJourney: boolean;
}

export const eraConfigs: EraConfig[] = [
  {
    id: 'birth',
    slug: 'birth',
    title: 'The Birth of the Automobile',
    subtitle: 'Pioneering the Road',
    period: '1885 — 1910',
    narrative:
      'From Karl Benz\'s single-cylinder invention to the mass-produced Ford Model T, this era saw the automobile transform from a curiosity into a force that would reshape civilization.',
    theme: 'renaissance',
    accentHex: '#C7A985',
    bgGradient: 'linear-gradient(160deg, #1a0a05 0%, #420409 40%, #2c1a0e 100%)',
    order: 0,
    isMainJourney: true,
  },
  {
    id: 'golden',
    slug: 'golden',
    title: 'The Golden Age of Classics',
    subtitle: 'Elegance in Motion',
    period: '1920 — 1955',
    narrative:
      'Pre-war and post-war classics defined automotive elegance — sweeping coachwork, handcrafted interiors, chrome and brass, and silhouettes that will never be surpassed.',
    theme: 'renaissance',
    accentHex: '#EAD3B4',
    bgGradient: 'linear-gradient(160deg, #1a0a05 0%, #50070E 30%, #3a1a0a 100%)',
    order: 1,
    isMainJourney: true,
  },
  {
    id: 'midcentury',
    slug: 'midcentury',
    title: 'The Mid-Century Revolution',
    subtitle: 'Power, Style, and Speed',
    period: '1955 — 1975',
    narrative:
      'American muscle, Italian passion, British precision. The decades from the 1950s through the 1970s produced some of the most iconic and celebrated automobiles in history.',
    theme: 'mythological',
    accentHex: '#927148',
    bgGradient: 'linear-gradient(160deg, #141519 0%, #1D1E22 60%, #0e0d0b 100%)',
    order: 2,
    isMainJourney: true,
  },
  {
    id: 'performance',
    slug: 'performance',
    title: 'The Performance Era',
    subtitle: 'Engineering Without Compromise',
    period: '1975 — 1995',
    narrative:
      'Aerodynamics, turbocharging, carbon fibre, and raw power outputs that would have seemed impossible a decade earlier. Performance engineering entered a new dimension.',
    theme: 'mythological',
    accentHex: '#CFCFB7',
    bgGradient: 'linear-gradient(160deg, #141519 0%, #252320 70%, #1D1E22 100%)',
    order: 3,
    isMainJourney: true,
  },
  {
    id: 'modern',
    slug: 'modern',
    title: 'The Modern Automotive Era',
    subtitle: 'Precision at Every Level',
    period: '1995 — 2010',
    narrative:
      'Advanced materials science, digital engine management, and a new generation of engineering talent produced road cars that once would have qualified as racing machinery.',
    theme: 'gothic',
    accentHex: '#A899B0',
    bgGradient: 'linear-gradient(160deg, #18191E 0%, #22202a 60%, #18191E 100%)',
    order: 4,
    isMainJourney: true,
  },
  {
    id: 'supercar',
    slug: 'supercar',
    title: 'The Supercar Revolution',
    subtitle: 'Beyond All Limits',
    period: '2005 — Present',
    narrative:
      'Hypercars and supercars that shattered previous performance barriers, commanding eight-figure price tags and redefining what a road car could achieve.',
    theme: 'gothic',
    accentHex: '#AFA0B7',
    bgGradient: 'linear-gradient(160deg, #18191E 0%, #1a1520 60%, #18191E 100%)',
    order: 5,
    isMainJourney: true,
  },
  {
    id: 'electric',
    slug: 'electric',
    title: 'The Electric Revolution',
    subtitle: 'A New Kind of Power',
    period: '2008 — Present',
    narrative:
      'Electric motors rewrote the rules of automotive performance. The world\'s fastest accelerating production cars are now electric, and the transformation is only beginning.',
    theme: 'gothic',
    accentHex: '#BDBCC1',
    bgGradient: 'linear-gradient(160deg, #0d0f18 0%, #18191E 50%, #141519 100%)',
    order: 6,
    isMainJourney: true,
  },
  {
    id: 'formula1',
    slug: 'formula1',
    title: 'Formula 1',
    subtitle: 'The Pinnacle of Motorsport',
    period: '1950 — Present',
    narrative:
      'Racing machines that embody the absolute frontier of automotive technology, aerodynamic understanding, and human skill — the ultimate proving ground.',
    theme: 'mythological',
    accentHex: '#C7A985',
    bgGradient: 'linear-gradient(160deg, #0e0a06 0%, #1a1410 60%, #141519 100%)',
    order: 7,
    isMainJourney: false,
  },
  {
    id: 'beyond',
    slug: 'beyond',
    title: 'Beyond the Mainstream',
    subtitle: 'Remarkable Machines',
    period: 'Various Eras',
    narrative:
      'Not every significant automobile fits a single narrative. From the Citroën DS to the original Range Rover, some machines redefined their categories entirely.',
    theme: 'renaissance',
    accentHex: '#DEC5A6',
    bgGradient: 'linear-gradient(160deg, #1a0f08 0%, #2c1a0e 60%, #420409 100%)',
    order: 8,
    isMainJourney: false,
  },
];

export const mainJourneyEras = eraConfigs
  .filter((e) => e.isMainJourney)
  .sort((a, b) => a.order - b.order);

export const getEraConfig = (id: Era): EraConfig =>
  eraConfigs.find((e) => e.id === id) ?? eraConfigs[0];
