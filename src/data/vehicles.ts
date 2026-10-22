// ============================================================
// AUTOMOTIVE TIME MACHINE — Vehicle Data
// All data sourced from established automotive records.
// Specifications marked with * are approximate/range figures.
// ============================================================

export type Era =
  | 'birth'
  | 'golden'
  | 'midcentury'
  | 'performance'
  | 'modern'
  | 'supercar'
  | 'electric'
  | 'formula1'
  | 'beyond';

export interface VehicleSpec {
  label: string;
  value: string;
}

export interface Vehicle {
  id: string;
  era: Era;
  manufacturer: string;
  model: string;
  year: string;
  category: string;
  significance: string;
  engineDescription: string;
  specs: VehicleSpec[];
  historicalContext: string;
  imageUrl: string;
  imageAlt: string;
  imageCredit?: string;
  accentColor: string;
}

// ─── ERA 1: BIRTH OF THE AUTOMOBILE ───────────────────────
const birthVehicles: Vehicle[] = [
  {
    id: 'benz-patent-1886',
    era: 'birth',
    manufacturer: 'Benz & Cie.',
    model: 'Patent-Motorwagen',
    year: '1885–1886',
    category: 'Pioneering Motor Vehicle',
    significance:
      'Widely regarded as the world\'s first true automobile powered by a gasoline internal-combustion engine.',
    engineDescription: 'Single-cylinder four-stroke gasoline engine, 954 cc',
    specs: [
      { label: 'Power Output', value: '0.75 hp (0.56 kW)' },
      { label: 'Top Speed', value: 'approx. 16 km/h (10 mph)*' },
      { label: 'Cylinders', value: '1' },
      { label: 'Drive', value: 'Rear-wheel, chain drive' },
      { label: 'Weight', value: 'approx. 265 kg' },
      { label: 'Production', value: '~25 units (1886–1893)' },
    ],
    historicalContext:
      'Karl Benz filed German patent DRP 37435 on 29 January 1886. His wife Bertha Benz undertook the first long-distance automobile journey in August 1888, driving from Mannheim to Pforzheim — a journey of approximately 106 km — demonstrating the vehicle\'s practical potential to a skeptical public.',
    imageUrl: './vehicles/benz-patent-1886.jpg',
    imageAlt: 'Benz Patent-Motorwagen 1886, the first gasoline-powered automobile',
    imageCredit: 'Wikimedia Commons — Public Domain',
    accentColor: '#C7A985',
  },
  {
    id: 'de-dion-1899',
    era: 'birth',
    manufacturer: 'De Dion-Bouton',
    model: 'Type D Voiturette',
    year: '1899',
    category: 'Early Production Automobile',
    significance:
      'One of the first mass-produced automobiles; the De Dion-Bouton engine became the template for early automotive powertrains worldwide.',
    engineDescription: 'Single-cylinder De Dion water-cooled engine, 402 cc',
    specs: [
      { label: 'Power Output', value: '3.5 hp' },
      { label: 'Top Speed', value: 'approx. 35 km/h*' },
      { label: 'Weight', value: 'approx. 290 kg' },
      { label: 'Drive', value: 'Rear-wheel' },
    ],
    historicalContext:
      'De Dion-Bouton became the world\'s largest automobile manufacturer by 1900, producing more than 3,000 vehicles annually. Their lightweight single-cylinder engine design was licensed and copied by dozens of manufacturers across Europe and North America.',
    imageUrl: './vehicles/de-dion-1899.jpg',
    imageAlt: 'De Dion-Bouton Type D Voiturette circa 1899',
    imageCredit: 'Wikimedia Commons — Public Domain',
    accentColor: '#DEC5A6',
  },
  {
    id: 'ford-model-t-1908',
    era: 'birth',
    manufacturer: 'Ford Motor Company',
    model: 'Model T',
    year: '1908–1927',
    category: 'Mass-Produced Automobile',
    significance:
      'Transformed personal transportation by making the automobile affordable to ordinary working families through moving-assembly-line production.',
    engineDescription: '2.9 L inline four-cylinder side-valve engine',
    specs: [
      { label: 'Power Output', value: '20 hp (15 kW)' },
      { label: 'Top Speed', value: 'approx. 72 km/h (45 mph)' },
      { label: 'Cylinders', value: '4' },
      { label: 'Weight', value: 'approx. 540 kg' },
      { label: 'Production', value: 'More than 15 million units' },
      { label: 'Original Price', value: '\$825 (1908); fell to \$260 (1924)' },
    ],
    historicalContext:
      'Henry Ford introduced the moving assembly line at the Highland Park plant in 1913, reducing the time to build a Model T from more than twelve hours to approximately ninety-three minutes. By 1921 the Model T accounted for more than half of all cars on American roads.',
    imageUrl: './vehicles/ford-model-t-1908.jpg',
    imageAlt: 'Ford Model T circa 1910, the car that put America on wheels',
    imageCredit: 'Wikimedia Commons — Public Domain',
    accentColor: '#8F6E4F',
  },
];

// ─── ERA 2: GOLDEN AGE OF CLASSICS ────────────────────────
const goldenVehicles: Vehicle[] = [
  {
    id: 'bugatti-type35-1924',
    era: 'golden',
    manufacturer: 'Bugatti',
    model: 'Type 35',
    year: '1924–1930',
    category: 'Grand Prix Racing Car',
    significance:
      'One of the most successful racing cars of all time, with an estimated 2,000 victories in its production life. Considered a masterpiece of automotive sculpture.',
    engineDescription: '2.0 L inline eight-cylinder supercharged (Type 35B)',
    specs: [
      { label: 'Power Output', value: '128 hp (Type 35B)*' },
      { label: 'Top Speed', value: 'approx. 210 km/h (130 mph)*' },
      { label: 'Cylinders', value: '8' },
      { label: 'Production', value: 'approx. 340 units' },
      { label: 'Weight', value: 'approx. 750 kg' },
    ],
    historicalContext:
      'Designed by Ettore Bugatti and his son Jean, the Type 35 debuted at the 1924 French Grand Prix at Lyon. Its distinctive cast aluminium wheels with integral brake drums, exposed hollow front axle, and horseshoe-shaped radiator established Bugatti\'s reputation for marrying engineering precision with visual beauty.',
    imageUrl: './vehicles/bugatti-type35-1924.jpg',
    imageAlt: 'Bugatti Type 35 racing car, circa 1924',
    imageCredit: 'Wikimedia Commons — CC BY-SA 3.0',
    accentColor: '#C7A985',
  },
  {
    id: 'mercedes-540k-1936',
    era: 'golden',
    manufacturer: 'Mercedes-Benz',
    model: '540 K Special Roadster',
    year: '1936–1939',
    category: 'Grand Touring Roadster',
    significance:
      'Widely regarded as one of the most beautiful automobiles ever built. Its long bonnet, sweeping wings, and supercharged engine represent pre-war automotive design at its apex.',
    engineDescription: '5.4 L inline eight-cylinder with Roots supercharger',
    specs: [
      { label: 'Power Output', value: '115 hp normally aspirated; 180 hp supercharged' },
      { label: 'Top Speed', value: 'approx. 170 km/h (106 mph)' },
      { label: 'Cylinders', value: '8' },
      { label: 'Production', value: 'approx. 26 Special Roadsters' },
      { label: 'Weight', value: 'approx. 2,900 kg' },
    ],
    historicalContext:
      'Only 406 examples of the 540 K were produced in total, with the Special Roadster being the rarest and most desirable configuration. Today, these cars regularly achieve prices in excess of \$10 million at auction, reflecting their status as some of the most coveted pre-war automobiles in existence.',
    imageUrl: './vehicles/mercedes-540k-1936.jpg',
    imageAlt: 'Mercedes-Benz 540 K Special Roadster 1937',
    imageCredit: 'Wikimedia Commons — Public Domain',
    accentColor: '#EAD3B4',
  },
  {
    id: 'jaguar-xk120-1948',
    era: 'golden',
    manufacturer: 'Jaguar',
    model: 'XK120',
    year: '1948–1954',
    category: 'Sports Car',
    significance:
      'The XK120 was the fastest production car in the world at the time of its introduction, and its twin-cam XK engine powered Jaguars for four decades.',
    engineDescription: '3.4 L inline six-cylinder twin-cam XK engine',
    specs: [
      { label: 'Power Output', value: '160 hp (119 kW)' },
      { label: 'Top Speed', value: '201 km/h (125 mph) — as tested' },
      { label: 'Cylinders', value: '6' },
      { label: 'Production', value: 'approx. 12,055 units' },
      { label: '0–60 mph', value: 'approx. 10 seconds*' },
    ],
    historicalContext:
      'Unveiled at the 1948 Earls Court Motor Show, the XK120 was intended as a low-volume model to showcase the new XK engine. Overwhelming public demand prompted full production. The name refers to its claimed top speed of 120 mph (193 km/h), later exceeded by test examples. The XK120 established Jaguar as a maker of credible high-performance sports cars at accessible prices.',
    imageUrl: './vehicles/jaguar-xk120-1948.jpg',
    imageAlt: 'Jaguar XK120 Roadster 1954',
    imageCredit: 'Wikimedia Commons — CC BY-SA 2.0',
    accentColor: '#927148',
  },
];

// ─── ERA 3: MID-CENTURY REVOLUTION ────────────────────────
const midcenturyVehicles: Vehicle[] = [
  {
    id: 'ferrari-250gto-1962',
    era: 'midcentury',
    manufacturer: 'Ferrari',
    model: '250 GTO',
    year: '1962–1964',
    category: 'Grand Touring Racing Car',
    significance:
      'Considered by many authorities to be the greatest Ferrari ever built and among the most valuable automobiles in history. Three consecutive GT class wins at Le Mans.',
    engineDescription: '3.0 L Colombo V12, Type 168 Comp/62',
    specs: [
      { label: 'Power Output', value: 'approx. 300 hp (224 kW)*' },
      { label: 'Top Speed', value: 'approx. 280 km/h (174 mph)*' },
      { label: 'Cylinders', value: 'V12' },
      { label: 'Production', value: '36 units (Series I–III)' },
      { label: 'Weight', value: 'approx. 880 kg' },
    ],
    historicalContext:
      'The 250 GTO was built to satisfy the FIA\'s Group 3 Grand Touring Car regulations and required a minimum production run of 100 units — regulations that Ferrari famously circumvented. Engineered by Giotto Bizzarrini and styled by Sergio Scaglietti, it won the International GT Championship for Ferrari in 1962, 1963, and 1964. Auction records for surviving examples have exceeded \$70 million.',
    imageUrl: './vehicles/ferrari-250gto-1962.jpg',
    imageAlt: 'Ferrari 250 GTO at Goodwood Revival 2012',
    imageCredit: 'Wikimedia Commons — CC BY-SA 2.0',
    accentColor: '#C7A985',
  },
  {
    id: 'shelby-cobra-427-1965',
    era: 'midcentury',
    manufacturer: 'Shelby American',
    model: 'Cobra 427',
    year: '1965–1967',
    category: 'American Sports Car',
    significance:
      'The result of Carroll Shelby\'s collaboration with AC Cars and Ford: a lightweight British roadster body over a massive American V8. Became an icon of raw performance.',
    engineDescription: 'Ford 427 FE V8, 7.0 L side-oiler',
    specs: [
      { label: 'Power Output', value: 'approx. 425–485 hp*' },
      { label: 'Top Speed', value: 'approx. 265 km/h (165 mph)*' },
      { label: 'Cylinders', value: 'V8' },
      { label: '0–60 mph', value: 'approx. 4.2 seconds*' },
      { label: 'Weight', value: 'approx. 1,060 kg' },
      { label: 'Production', value: 'approx. 348 big-block units' },
    ],
    historicalContext:
      'Carroll Shelby conceived the Cobra after approaching AC Cars with a proposal to install an American V8 into their existing roadster. Ford provided engineering support and engines. The 427 S/C Competition variant was among the fastest production cars of its era and remains one of the most desirable American sports cars ever built.',
    imageUrl: './vehicles/shelby-cobra-427-1965.jpg',
    imageAlt: 'Shelby Cobra 427 at Goodwood Festival of Speed 2012',
    imageCredit: 'Wikimedia Commons — CC BY-SA 2.0',
    accentColor: '#8F6E4F',
  },
  {
    id: 'porsche-911-1963',
    era: 'midcentury',
    manufacturer: 'Porsche',
    model: '911',
    year: '1963–present',
    category: 'Sports Car',
    significance:
      'One of the most enduring and continuously developed sports car platforms in history. The 911 has competed in and won virtually every major motorsport category.',
    engineDescription: '2.0 L air-cooled flat-six (original 901/911 engine)',
    specs: [
      { label: 'Power Output', value: '130 hp (original)' },
      { label: 'Top Speed', value: '210 km/h (original)' },
      { label: 'Cylinders', value: '6 (flat/horizontally opposed)' },
      { label: '0–100 km/h', value: '9.1 seconds (original)' },
      { label: 'Weight', value: 'approx. 1,080 kg (original)' },
    ],
    historicalContext:
      'Designed by Ferdinand "Butzi" Porsche and introduced at the 1963 Frankfurt Motor Show as the successor to the 356. The 911\'s distinctive shape, rear-engine layout, and air-cooled flat-six engine were controversially retained through decades of development. It remains in production, now with a water-cooled engine, representing more than sixty years of continuous evolution.',
    imageUrl: './vehicles/porsche-911-1963.jpg',
    imageAlt: 'Porsche 911 Carrera RS 2.7 from 1973',
    imageCredit: 'Wikimedia Commons — CC BY-SA 3.0',
    accentColor: '#DEC5A6',
  },
  {
    id: 'ford-gt40-1964',
    era: 'midcentury',
    manufacturer: 'Ford / Shelby American',
    model: 'GT40',
    year: '1964–1969',
    category: 'Racing Sports Car',
    significance:
      'Built specifically to defeat Ferrari at Le Mans, the GT40 achieved four consecutive overall victories from 1966 to 1969, including a famous 1–2–3 finish in 1966.',
    engineDescription: 'Ford 427 FE V8, 7.0 L (1966 Le Mans specification)',
    specs: [
      { label: 'Power Output', value: 'approx. 485 hp (Le Mans spec)*' },
      { label: 'Top Speed', value: 'approx. 335 km/h (208 mph)*' },
      { label: 'Cylinders', value: 'V8' },
      { label: 'Height', value: '40.5 inches (1,029 mm) — origin of the name' },
      { label: 'Production', value: '107 units total (Mk I–IV)' },
    ],
    historicalContext:
      'Henry Ford II\'s determination to defeat Ferrari at Le Mans after Enzo Ferrari withdrew from a proposed acquisition deal led to the GT40 programme. With help from Shelby American and engineer Roy Lunn, Ford developed the car in record time. The 1966 finish — with Bruce McLaren and Chris Amon crossing the line first — is one of the most celebrated moments in motorsport history.',
    imageUrl: './vehicles/ford-gt40-1964.jpg',
    imageAlt: 'Ford GT40 at Goodwood Festival of Speed 2019',
    imageCredit: 'Wikimedia Commons — CC BY-SA 4.0',
    accentColor: '#927148',
  },
];

// ─── ERA 4: PERFORMANCE ERA ────────────────────────────────
const performanceVehicles: Vehicle[] = [
  {
    id: 'lamborghini-countach-1974',
    era: 'performance',
    manufacturer: 'Lamborghini',
    model: 'Countach LP400',
    year: '1974–1990',
    category: 'Supercar',
    significance:
      'The Countach redefined automotive design with its extreme wedge silhouette, scissor doors, and mid-engine layout. It became the archetypal supercar poster car for a generation.',
    engineDescription: '3.9 L (LP400) to 5.2 L (LP5000 QV) V12',
    specs: [
      { label: 'Power Output', value: '375 hp (LP400); 455 hp (LP5000 QV)' },
      { label: 'Top Speed', value: 'approx. 290 km/h (180 mph)* (LP400)' },
      { label: 'Cylinders', value: 'V12' },
      { label: 'Production', value: 'approx. 2,049 units (all variants)' },
      { label: '0–100 km/h', value: 'approx. 5.9 seconds (LP400)*' },
    ],
    historicalContext:
      'Designed by Marcello Gandini at Bertone, the Countach caused a sensation at the 1971 Geneva Motor Show as a concept (LP500). The production LP400 debuted in 1973. The name "Countach" is a Piedmontese exclamation of astonishment — reportedly the word uttered by Bertone workers when they first saw the design. Production continued until 1990.',
    imageUrl: './vehicles/lamborghini-countach-1974.jpg',
    imageAlt: 'Lamborghini Countach LP400 1974',
    imageCredit: 'Wikimedia Commons — CC BY-SA 3.0',
    accentColor: '#C7A985',
  },
  {
    id: 'ferrari-f40-1987',
    era: 'performance',
    manufacturer: 'Ferrari',
    model: 'F40',
    year: '1987–1992',
    category: 'Supercar',
    significance:
      'The last Ferrari personally commissioned by Enzo Ferrari, who died in 1988. The first production car to exceed 200 mph (322 km/h). A defining supercar of the 1980s.',
    engineDescription: '2.9 L twin-turbocharged V8 (F120A)',
    specs: [
      { label: 'Power Output', value: '478 hp (357 kW)' },
      { label: 'Top Speed', value: '324 km/h (201 mph)' },
      { label: '0–100 km/h', value: '3.8 seconds' },
      { label: 'Cylinders', value: 'V8' },
      { label: 'Weight', value: '1,100 kg (dry)' },
      { label: 'Production', value: '1,315 units' },
    ],
    historicalContext:
      'Developed to celebrate Ferrari\'s 40th anniversary, the F40 was designed by Pininfarina\'s Leonardo Fioravanti on a race-derived Kevlar and carbon-fibre body. No power steering, no ABS, no traction control — a pure driving machine. Its aggressive aerodynamics and twin-turbo V8 produced performance that remained unmatched by any street-legal production car until the McLaren F1 arrived in 1992.',
    imageUrl: './vehicles/ferrari-f40-1987.jpg',
    imageAlt: 'Ferrari F40 1990',
    imageCredit: 'Wikimedia Commons — CC BY-SA 2.0',
    accentColor: '#8F6E4F',
  },
];

// ─── ERA 5: MODERN AUTOMOTIVE ERA ─────────────────────────
const modernVehicles: Vehicle[] = [
  {
    id: 'mclaren-f1-1992',
    era: 'modern',
    manufacturer: 'McLaren Automotive',
    model: 'F1',
    year: '1992–1998',
    category: 'Supercar / Hypercar',
    significance:
      'Held the record for the fastest production car for twelve years. The first road car with a carbon-fibre monocoque chassis. A landmark of engineering, design, and performance.',
    engineDescription: 'BMW S70/2, 6.1 L naturally aspirated V12',
    specs: [
      { label: 'Power Output', value: '627 hp (468 kW)' },
      { label: 'Top Speed', value: '391 km/h (243 mph) — production record at the time' },
      { label: '0–100 km/h', value: '3.2 seconds' },
      { label: 'Cylinders', value: 'V12' },
      { label: 'Weight', value: '1,138 kg (dry)' },
      { label: 'Production', value: '106 units total' },
    ],
    historicalContext:
      'Designed by Gordon Murray, the McLaren F1 remains one of the greatest engineering achievements in automotive history. Its three-seat central-driving-position layout, titanium construction, gold-lined engine bay, and bespoke BMW engine represented no-compromise thinking. The GTR variant won the 1995 24 Hours of Le Mans on its debut, driven by Yannick Dalmas, J.J. Lehto, and Masanori Sekiya.',
    imageUrl: './vehicles/mclaren-f1-1992.jpg',
    imageAlt: 'McLaren F1 road car',
    imageCredit: 'Wikimedia Commons — CC BY 2.0',
    accentColor: '#C7A985',
  },
  {
    id: 'porsche-carrera-gt-2004',
    era: 'modern',
    manufacturer: 'Porsche',
    model: 'Carrera GT',
    year: '2004–2006',
    category: 'Supercar',
    significance:
      'The last naturally aspirated Porsche supercar before the turbocharging era. Its V10 engine originated from an aborted Le Mans prototype programme.',
    engineDescription: '5.7 L naturally aspirated V10 (68B)',
    specs: [
      { label: 'Power Output', value: '612 hp (456 kW) at 8,000 rpm' },
      { label: 'Top Speed', value: '330 km/h (205 mph)' },
      { label: '0–100 km/h', value: '3.9 seconds' },
      { label: 'Cylinders', value: 'V10' },
      { label: 'Weight', value: '1,380 kg (dry)' },
      { label: 'Production', value: '1,270 units' },
    ],
    historicalContext:
      'The Carrera GT\'s V10 engine was derived from a Porsche Le Mans prototype project that was cancelled following the 9/11 attacks in 2001. The production car featured a carbon-fibre monocoque, a ceramic clutch, and a wooden gearshift knob, referencing early racing cars. Its demanding dynamics made it one of the most driver-focused supercars of its decade.',
    imageUrl: './vehicles/porsche-carrera-gt-2004.jpg',
    imageAlt: 'Porsche Carrera GT in silver',
    imageCredit: 'Wikimedia Commons — CC BY-SA 3.0',
    accentColor: '#EAD3B4',
  },
];

// ─── ERA 6: SUPERCAR REVOLUTION ───────────────────────────
const supercarVehicles: Vehicle[] = [
  {
    id: 'bugatti-veyron-2005',
    era: 'supercar',
    manufacturer: 'Bugatti Automobiles',
    model: 'Veyron 16.4',
    year: '2005–2011',
    category: 'Hypercar',
    significance:
      'The first production car to exceed 400 km/h. An engineering tour de force combining a 16-cylinder quad-turbocharged engine with 1,001 horsepower in a practical grand touring package.',
    engineDescription: '8.0 L quad-turbocharged W16 engine',
    specs: [
      { label: 'Power Output', value: '1,001 hp (736 kW)' },
      { label: 'Top Speed', value: '408.47 km/h (253.81 mph) — verified' },
      { label: '0–100 km/h', value: '2.5 seconds' },
      { label: 'Cylinders', value: 'W16 (4 banks of 4)' },
      { label: 'Turbos', value: '4' },
      { label: 'Production', value: '450 units' },
    ],
    historicalContext:
      'The Veyron project was initiated by Ferdinand Piëch, then chairman of Volkswagen Group, as a demonstration of what VW Group engineering could achieve with unlimited resources. Development cost an estimated €1.5 billion. Each car was reported to cost Bugatti approximately €5 million to produce, against a selling price of approximately €1.2 million. It redefined what was possible in a road car.',
    imageUrl: './vehicles/bugatti-veyron-2005.jpg',
    imageAlt: 'Bugatti Veyron 16.4 in Düsseldorf 2012',
    imageCredit: 'Wikimedia Commons — CC BY-SA 3.0',
    accentColor: '#927148',
  },
  {
    id: 'lamborghini-aventador-2011',
    era: 'supercar',
    manufacturer: 'Lamborghini',
    model: 'Aventador LP700-4',
    year: '2011–2022',
    category: 'Supercar',
    significance:
      'The successor to the Murciélago and last naturally aspirated V12 Lamborghini flagship, maintaining the brand\'s commitment to atmospheric V12 power across a decade of production.',
    engineDescription: '6.5 L naturally aspirated V12 (L539)',
    specs: [
      { label: 'Power Output', value: '700 hp (515 kW) at 8,250 rpm' },
      { label: 'Top Speed', value: '350 km/h (217 mph)' },
      { label: '0–100 km/h', value: '2.9 seconds' },
      { label: 'Cylinders', value: 'V12' },
      { label: 'Weight', value: '1,575 kg' },
      { label: 'Drive', value: 'All-wheel drive (AWD)' },
    ],
    historicalContext:
      'The Aventador featured a carbon-fibre monocoque as standard and debuted Lamborghini\'s pushrod suspension at all four corners. Its angular styling, inspired by stealth aircraft, was designed by Filippo Perini. The Aventador LP 780-4 Ultimae, produced as the final variant in 2021–2022, represented the high-water mark of naturally aspirated Lamborghini road cars.',
    imageUrl: './vehicles/lamborghini-aventador-2011.jpg',
    imageAlt: 'Lamborghini Aventador LP700-4 in white',
    imageCredit: 'Wikimedia Commons — CC BY 2.0',
    accentColor: '#C7A985',
  },
  {
    id: 'koenigsegg-agera-r-2011',
    era: 'supercar',
    manufacturer: 'Koenigsegg',
    model: 'Agera R',
    year: '2011–2014',
    category: 'Hypercar',
    significance:
      'Held multiple Guinness World Records for acceleration and speed. A Swedish engineering achievement that competed with the Veyron for hypercar supremacy.',
    engineDescription: '5.0 L twin-turbocharged V8 (KKV8)',
    specs: [
      { label: 'Power Output', value: '1,140 hp on E85 biofuel' },
      { label: 'Top Speed', value: 'over 440 km/h (claimed)' },
      { label: '0–300 km/h', value: '14.53 seconds — Guinness record at the time' },
      { label: 'Cylinders', value: 'V8' },
      { label: 'Weight', value: '1,435 kg' },
      { label: 'Production', value: '18 units' },
    ],
    historicalContext:
      'Christian von Koenigsegg founded his company in 1994. The Agera R broke Guinness World Records for 0–300 km/h and 300–0 km/h acceleration in 2011. The successor, the One:1, achieved a power-to-weight ratio of 1,000 hp per 1,000 kg — a 1:1 ratio — and was the first production car to reach 1 megawatt of power.',
    imageUrl: './vehicles/koenigsegg-agera-r-2011.jpg',
    imageAlt: 'Koenigsegg Agera R 2011',
    imageCredit: 'Wikimedia Commons — CC BY-SA 3.0',
    accentColor: '#DEC5A6',
  },
];

// ─── ERA 7: ELECTRIC REVOLUTION ───────────────────────────
const electricVehicles: Vehicle[] = [
  {
    id: 'tesla-roadster-2008',
    era: 'electric',
    manufacturer: 'Tesla Motors',
    model: 'Roadster (first generation)',
    year: '2008–2012',
    category: 'Electric Sports Car',
    significance:
      'The first highway-capable all-electric production car in the modern era. Demonstrated that electric vehicles could be both practical and performance-oriented.',
    engineDescription: 'AC induction electric motor with lithium-ion battery pack',
    specs: [
      { label: 'Power Output', value: '248 hp (185 kW)' },
      { label: 'Top Speed', value: '201 km/h (125 mph)' },
      { label: '0–60 mph', value: '3.7 seconds' },
      { label: 'Range', value: 'approx. 394 km (245 miles) EPA' },
      { label: 'Battery', value: '53 kWh lithium-ion' },
      { label: 'Production', value: '2,450 units' },
    ],
    historicalContext:
      'Based on a heavily modified Lotus Elise platform, the Tesla Roadster proved that electric cars could be desirable and competitive. It established Tesla\'s credibility and funded the development of the Model S. The second-generation Roadster, announced in 2017, promises significantly higher performance figures.',
    imageUrl: './vehicles/tesla-roadster-2008.jpg',
    imageAlt: 'Tesla Roadster first generation 2010',
    imageCredit: 'Wikimedia Commons — CC BY-SA 3.0',
    accentColor: '#CFCFB7',
  },
  {
    id: 'rimac-nevera-2021',
    era: 'electric',
    manufacturer: 'Rimac Automobili',
    model: 'Nevera',
    year: '2021–present',
    category: 'Electric Hypercar',
    significance:
      'The fastest accelerating production car ever tested. Set multiple acceleration records and demonstrated Croatia\'s capability to produce world-class hypercars.',
    engineDescription: 'Four independent electric motors, one per wheel',
    specs: [
      { label: 'Combined Power', value: '1,914 hp (1,427 kW)' },
      { label: 'Top Speed', value: '412 km/h (256 mph)' },
      { label: '0–100 km/h', value: '1.74 seconds — production car record*' },
      { label: 'Battery', value: '120 kWh' },
      { label: 'Range', value: 'approx. 490 km (305 miles) WLTP' },
      { label: 'Production', value: '150 units planned' },
    ],
    historicalContext:
      'Mate Rimac founded Rimac Automobili in Croatia in 2009. The Nevera, named after a type of fierce Mediterranean storm, set numerous Guinness World Records for electric vehicle performance. Rimac\'s technology division supplies battery systems and powertrains to Aston Martin, Porsche, and others. Porsche AG acquired a majority stake in Rimac Group in 2022.',
    imageUrl: './vehicles/rimac-nevera-2021.jpg',
    imageAlt: 'Rimac Nevera electric hypercar at IAA Munich 2021',
    imageCredit: 'Wikimedia Commons — CC BY-SA 4.0',
    accentColor: '#927148',
  },
  {
    id: 'porsche-taycan-2019',
    era: 'electric',
    manufacturer: 'Porsche',
    model: 'Taycan Turbo S',
    year: '2019–present',
    category: 'Electric Sports Sedan',
    significance:
      'Porsche\'s first fully electric production car, demonstrating that electrification could preserve a brand\'s performance character and driving dynamics.',
    engineDescription: 'Dual permanent-magnet synchronous motors, 800V architecture',
    specs: [
      { label: 'Power Output', value: '761 hp (568 kW) overboost with Launch Control' },
      { label: 'Top Speed', value: '260 km/h (162 mph)' },
      { label: '0–100 km/h', value: '2.8 seconds' },
      { label: 'Battery', value: '93.4 kWh usable' },
      { label: 'Range', value: 'approx. 412 km (256 miles) WLTP' },
      { label: 'Charging', value: 'up to 270 kW DC (800V)' },
    ],
    historicalContext:
      'The Taycan set a new Nürburgring lap record for electric vehicles in 2019. Its 800-volt electrical architecture, a first for a production car, enables significantly faster charging than conventional 400V EV systems. The car\'s name derives from Old Turkish, meaning approximately "soul of a spirited young horse."',
    imageUrl: './vehicles/porsche-taycan-2019.jpg',
    imageAlt: 'Porsche Taycan Turbo S 2020',
    imageCredit: 'Wikimedia Commons — CC BY-SA 4.0',
    accentColor: '#C7A985',
  },
];

// ─── ERA 8: FORMULA 1 ──────────────────────────────────────
const f1Vehicles: Vehicle[] = [
  {
    id: 'alfa-romeo-158-1950',
    era: 'formula1',
    manufacturer: 'Alfa Romeo',
    model: '158/159 Alfetta',
    year: '1938–1951',
    category: 'Formula 1 Grand Prix Car',
    significance:
      'Won the first two FIA Formula One World Championship seasons (1950 and 1951), driven by Nino Farina and Juan Manuel Fangio respectively.',
    engineDescription: '1.5 L supercharged straight-eight Tipo 158',
    specs: [
      { label: 'Power Output', value: 'approx. 350–425 hp* (evolved)' },
      { label: 'Top Speed', value: 'approx. 290 km/h*' },
      { label: 'Cylinders', value: '8 inline' },
      { label: 'Supercharger', value: 'Twin-stage Roots' },
    ],
    historicalContext:
      'The 158 was designed by Gioacchino Colombo in 1938. Originally a voiturette (1.5 L supercharged class) car, it was hidden during World War II and re-emerged in 1946. By the start of the Formula One World Championship in 1950, it was the most advanced Grand Prix car available. The evolved 159 won in 1951 before fuel consumption made it uncompetitive against the Ferrari 375.',
    imageUrl: './vehicles/alfa-romeo-158-1950.jpg',
    imageAlt: 'Alfa Romeo 159 at Goodwood Festival of Speed 2014',
    imageCredit: 'Wikimedia Commons — CC BY-SA 2.0',
    accentColor: '#C7A985',
  },
  {
    id: 'lotus-49-1967',
    era: 'formula1',
    manufacturer: 'Lotus',
    model: '49',
    year: '1967–1970',
    category: 'Formula 1 Car',
    significance:
      'First car to use the engine as a stressed structural member. Introduced the iconic red-gold-white Gold Leaf livery — the first commercially sponsored F1 car.',
    engineDescription: 'Cosworth DFV 3.0 L V8',
    specs: [
      { label: 'Power Output', value: 'approx. 408 hp*' },
      { label: 'Cylinders', value: 'V8' },
      { label: 'Weight', value: 'approx. 530 kg' },
    ],
    historicalContext:
      'The Lotus 49 introduced the Ford Cosworth DFV engine, which was designed specifically for it and went on to win 155 Formula One races — more than any other engine in the sport\'s history. Jim Clark won on its debut at the 1967 Dutch Grand Prix. The Gold Leaf livery of 1968 broke with the tradition of national racing colours and began the modern era of commercial sponsorship in Formula One.',
    imageUrl: './vehicles/lotus-49-1967.jpg',
    imageAlt: 'Lotus 49 at Goodwood Revival 2012',
    imageCredit: 'Wikimedia Commons — CC BY-SA 2.0',
    accentColor: '#DEC5A6',
  },
  {
    id: 'mclaren-mp4-4-1988',
    era: 'formula1',
    manufacturer: 'McLaren International',
    model: 'MP4/4',
    year: '1988',
    category: 'Formula 1 Car',
    significance:
      'Statistically the most dominant Formula 1 car ever built, winning 15 of 16 races in 1988. Driven by Ayrton Senna and Alain Prost, it achieved a championship season unprecedented in the sport.',
    engineDescription: 'Honda RA168-E 1.5 L twin-turbocharged V6',
    specs: [
      { label: 'Power Output', value: 'approx. 685 hp in race trim; over 900 hp in qualifying*' },
      { label: 'Wins', value: '15 from 16 races (1988 season)' },
      { label: 'Cylinders', value: 'V6 turbocharged' },
      { label: 'Chassis', value: 'Carbon-fibre monocoque' },
    ],
    historicalContext:
      'Designed by Gordon Murray and Steve Nichols with Honda\'s turbo V6, the MP4/4 arrived for the final year of turbocharged engines in Formula One. Senna won 8 races; Prost won 7. Only Gerhard Berger\'s Ferrari denied them a clean sweep, winning the final race at Monza. The 1988 Constructors\' Championship score was 199 points to Ferrari\'s 65.',
    imageUrl: './vehicles/mclaren-mp4-4-1988.jpg',
    imageAlt: 'McLaren MP4/4 at Donington Park',
    imageCredit: 'Wikimedia Commons — CC BY-SA 2.0',
    accentColor: '#8F6E4F',
  },
  {
    id: 'ferrari-f2004-2004',
    era: 'formula1',
    manufacturer: 'Scuderia Ferrari',
    model: 'F2004',
    year: '2004',
    category: 'Formula 1 Car',
    significance:
      'Michael Schumacher\'s final championship-winning car, completing his unprecedented fifth consecutive title. One of the most dominant Formula 1 seasons on record.',
    engineDescription: 'Ferrari Tipo 053, 3.0 L V10',
    specs: [
      { label: 'Power Output', value: 'approx. 900 hp*' },
      { label: 'Wins', value: '15 from 18 races' },
      { label: 'Cylinders', value: 'V10' },
      { label: 'Weight', value: '605 kg (minimum with driver)' },
    ],
    historicalContext:
      'The F2004 won 15 of 18 races in the 2004 season, with Schumacher taking 13 victories and Rubens Barrichello taking 2. It was the last year of naturally aspirated V10 engines, as new regulations mandated a switch to V8s for 2006. The car represented the pinnacle of Ferrari\'s Schumacher-Brawn-Todt era of domination.',
    imageUrl: './vehicles/ferrari-f2004-2004.jpg',
    imageAlt: 'Ferrari F2004 at Goodwood Festival of Speed 2014',
    imageCredit: 'Wikimedia Commons — CC BY-SA 2.0',
    accentColor: '#927148',
  },
];

// ─── ERA 9: BEYOND THE MAINSTREAM ─────────────────────────
const beyondVehicles: Vehicle[] = [
  {
    id: 'range-rover-1970',
    era: 'beyond',
    manufacturer: 'Land Rover',
    model: 'Range Rover Classic',
    year: '1970–1996',
    category: 'Luxury Off-Road Vehicle',
    significance:
      'Created the luxury off-road vehicle segment that has shaped the automotive industry for more than five decades. Displayed at the Louvre as an example of industrial design.',
    engineDescription: '3.5 L Buick-derived aluminium V8 (original)',
    specs: [
      { label: 'Power Output', value: '130 hp (original V8)' },
      { label: 'Drive', value: 'Four-wheel drive with low-range transfer box' },
      { label: 'Cylinders', value: 'V8' },
      { label: 'Production', value: 'More than 317,000 units over 26 years' },
    ],
    historicalContext:
      'Designed by Spen King and Gordon Bashford, the Range Rover was the first vehicle to combine genuine off-road capability with a car-like, relatively refined interior. Its coil-spring suspension (replacing the industry-standard leaf springs) delivered unprecedented comfort on-road. The Louvre in Paris accepted a 1970 Range Rover into its permanent collection in 1971 as an aesthetic and industrial-design object.',
    imageUrl: './vehicles/range-rover-1970.jpg',
    imageAlt: 'Range Rover Classic 1970 at Goodwood 2013',
    imageCredit: 'Wikimedia Commons — CC BY-SA 2.0',
    accentColor: '#DEC5A6',
  },
  {
    id: 'citroen-ds-1955',
    era: 'beyond',
    manufacturer: 'Citroën',
    model: 'DS',
    year: '1955–1975',
    category: 'Avant-Garde Saloon',
    significance:
      'Named the most beautiful car ever made by a poll of automotive design experts. Its hydropneumatic suspension system, aerodynamic body, and technological innovation were twenty years ahead of their time.',
    engineDescription: 'Various inline four-cylinder engines, 1.9–2.2 L',
    specs: [
      { label: 'Power Output', value: '75–141 hp (depending on variant)' },
      { label: 'Suspension', value: 'Self-levelling hydropneumatic' },
      { label: 'Production', value: 'More than 1.4 million units' },
      { label: 'Drag Coefficient', value: 'Cd 0.38 (1955) — exceptional for its era' },
    ],
    historicalContext:
      'Roland Barthes wrote a celebrated essay about the DS in 1957, describing it as having "the best spiritual meaning of the word" — a near-supernatural object. French President Charles de Gaulle survived an assassination attempt in 1962 largely because the DS\'s hydropneumatic suspension allowed the car to continue driving on burst tyres. The DS name was a deliberate pun on "déesse" — French for goddess.',
    imageUrl: './vehicles/citroen-ds-1955.jpg',
    imageAlt: 'Citroën DS in green',
    imageCredit: 'Wikimedia Commons — CC BY-SA 3.0',
    accentColor: '#C7A985',
  },
];

// ─── COMBINED EXPORT ───────────────────────────────────────
export const allVehicles: Vehicle[] = [
  ...birthVehicles,
  ...goldenVehicles,
  ...midcenturyVehicles,
  ...performanceVehicles,
  ...modernVehicles,
  ...supercarVehicles,
  ...electricVehicles,
  ...f1Vehicles,
  ...beyondVehicles,
];

export const vehiclesByEra: Record<Era, Vehicle[]> = {
  birth: birthVehicles,
  golden: goldenVehicles,
  midcentury: midcenturyVehicles,
  performance: performanceVehicles,
  modern: modernVehicles,
  supercar: supercarVehicles,
  electric: electricVehicles,
  formula1: f1Vehicles,
  beyond: beyondVehicles,
};

export const getVehicleById = (id: string): Vehicle | undefined =>
  allVehicles.find((v) => v.id === id);
