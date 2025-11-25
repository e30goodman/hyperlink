

import { Module } from './types';

export const COURSE_CONTENT: Module[] = [
  {
    id: 'mod-1',
    title: 'MODULE 1',
    subtitle: 'CARTE HARMONIQUE DU MANCHE (BLOCS)',
    lessons: [
      {
        id: 'm1-l1',
        title: 'Leçon 1 — Technique, Chanson & 4 Blocs',
        description: 'Placement de main et formes géométriques.',
        details: [
          'Technique Main Droite.',
          'Théorie : Se rappeler du Mode Ré Dorien (D Dorian) et Sol Majeur (G Ionian).',
          'Géométrie : Les 4 Blocs se jouent sur tout le manche.'
        ],
        tasks: [
          { 
            id: 't1-1-1', 
            text: 'Se rappeler : Mode Ré Dorien (D) & Sol Majeur (G)', 
            details: 'Voisins (1 ton d\'écart). Ré Dorien = position de base. Sol Majeur (Ionien) = 1 ton plus bas.',
            isCompleted: false 
          },
          { 
            id: 't1-1-2', 
            text: 'Mémoriser les 4 formes géométriques (Voir photos)',
            details: 'Visualiser les formes "wireframe" sur le manche. Cliquez sur "Voir les photos" pour consulter ou ajouter vos images.',
            isCompleted: false,
            // Default images removed as per user request. User uploads will be used instead.
            imageUrls: [] 
          },
          { 
            id: 't1-1-3', 
            text: 'Jouer "Do You Wanna Be My Girl?"', 
            details: 'Focus sur l\'extraction du son main droite. Le son doit être uniforme et stable, même sur une seule note. (ongles courts recommandés)',
            isCompleted: false 
          },
        ],
      },
      {
        id: 'm1-l2',
        title: 'Leçon 2 — Algorithme de Déplacement',
        description: 'Navigation fluide sur le manche via la logique des blocs.',
        details: [
          'Les 4 Blocs : Mineur, Majeur, Lydien, Mixolydien',
          'Pas principal : UN TON (2 cases)',
          'Mineurs jumelés & Voisins majeurs',
          'Collage : Mineur → Majeur (+1/2 ton)',
          'Collage : Majeur → Mineur (+1 ton)'
        ],
        tasks: [
          { id: 't1-2-1', text: 'Pratiquer le saut de ton', isCompleted: false },
          { id: 't1-2-2', text: 'Connecter Mineur vers Majeur', isCompleted: false },
        ],
      },
      {
        id: 'm1-prac',
        title: 'PRATIQUE DU MODULE 1',
        description: 'Validation des acquis : Les 4 Blocs sur tout le manche.',
        details: [
          'Objectif : Fluidité de navigation sur les 4 formes.',
          'Séquence : Accords → Arpèges → Aléatoire.'
        ],
        tasks: [
           { id: 't1-prac-1', text: 'Étape 1 : Jeu en Accords (Positions fixes)', isCompleted: false },
           { id: 't1-prac-2', text: 'Étape 2 : Jeu en Arpèges (Délié)', isCompleted: false },
           { id: 't1-prac-3', text: 'Étape 3 : Notes Aléatoires (Connexions)', isCompleted: false },
        ]
      }
    ]
  },
  {
    id: 'mod-2',
    title: 'MODULE 2',
    subtitle: 'RYTHMIQUE ET GROOVE FONDAMENTAL',
    lessons: [
      {
        id: 'm2-l1',
        title: 'Leçon 1 — Base Rythmique du Bassiste',
        description: 'Subdivisions, accents et solidité du temps.',
        details: [
          'Comptage : 1e&a, 2e&a',
          'Gestion des accents forts/faibles',
          'Métronome : Déplacer le clic sur 2 et 4, puis sur 1',
          'Groove mono-note avec variations de caractère'
        ],
        tasks: [
          { id: 't2-1-1', text: 'Exercice de subdivision (1e&a)', isCompleted: false },
          { id: 't2-1-2', text: 'Groove sur une seule note (stabilité)', isCompleted: false },
        ],
      },
      {
        id: 'm2-l2',
        title: 'Leçon 2 — Ghost Notes et Patterns',
        description: 'Ajouter de la percussivité et du "bavardage" rythmique.',
        details: [
          'Ghost notes isolées vs Séries',
          'Syncopes et contre-temps',
          'Contrôle absolu du métronome (zéro drift)'
        ],
        tasks: [
          { id: 't2-2-1', text: 'Maîtriser les ghosts en série', isCompleted: false },
        ],
      },
      {
        id: 'm2-prac',
        title: 'PRATIQUE DU MODULE 2',
        description: 'Validation des acquis : Groove & Timing.',
        tasks: [
           { id: 't2-prac-1', text: 'Groove 4 mesures stable avec ghosts', isCompleted: false },
        ]
      }
    ]
  },
  {
    id: 'mod-3',
    title: 'MODULE 3',
    subtitle: 'ARCHITECTURE LINÉAIRE : HODS ET LIENS',
    lessons: [
      {
        id: 'm3-l1',
        title: 'Leçon 1 — Notes de Passage (Leading Tones)',
        description: 'Comment relier les accords de manière fluide.',
        details: [
          'Approche Diatonique',
          'Utilisation des Octaves',
          'Arpèges et degrés stables',
          'Construction de lignes mélodiques'
        ],
        tasks: [
          { id: 't3-1-1', text: 'Créer des approches diatoniques', isCompleted: false },
          { id: 't3-1-2', text: 'Intégrer les octaves dans le jeu', isCompleted: false },
        ],
      },
      {
        id: 'm3-l2',
        title: 'Leçon 2 — Fills comme Ponts',
        description: 'Le fill n\'est pas un solo, c\'est un connecteur.',
        details: [
          'Types de Fills : Rythmique, Mélodique, Chromatique',
          'Le "Drive-in" en fin de mesure',
          'Continuité du groove pendant le fill'
        ],
        tasks: [
          { id: 't3-2-1', text: 'Travailler le fill rythmique', isCompleted: false },
        ],
      },
      {
        id: 'm3-prac',
        title: 'PRATIQUE DU MODULE 3',
        description: 'Validation des acquis : Transitions & Fills.',
        tasks: [
           { id: 't3-prac-1', text: 'Transitions Am-D-G-C + 3 types de fills', isCompleted: false },
        ]
      }
    ]
  },
  {
    id: 'mod-4',
    title: 'MODULE 4',
    subtitle: 'STYLES ET VARIATIONS DE GROOVE',
    lessons: [
      {
        id: 'm4-l1',
        title: 'Leçon 1 — Rock et Blues',
        description: 'Les fondations de la musique moderne.',
        details: [
          'Rock : Croches (8ths), Octaves, Attaque dense',
          'Blues : Shuffle (triolets), Chromatisme, Grille I-IV-V'
        ],
        tasks: [
          { id: 't4-1-1', text: 'Enregistrer un groove Rock (au médiator ou doigts)', isCompleted: false },
          { id: 't4-1-2', text: 'Enregistrer une grille Blues Shuffle', isCompleted: false },
        ],
      },
      {
        id: 'm4-l2',
        title: 'Leçon 2 — Pop / Soul',
        description: 'L\'art de faire danser et soutenir la chanson.',
        details: [
          'Syncopes légères et aérées',
          'Groove Flow : Évolution tous les 2-4 mesures',
          'Dynamique : Contraste Couplet vs Refrain'
        ],
        tasks: [
          { id: 't4-2-1', text: 'Créer une ligne avec contraste dynamique', isCompleted: false },
        ],
      },
      {
        id: 'm4-l3',
        title: 'Leçon 3 — Funk (Niveau Final)',
        description: 'Précision rythmique extrême.',
        details: [
          'Doubles-croches (16ths)',
          'Séries de Ghost notes',
          'Syncopes complexes (Niveau 2-3)',
          'Discipline du Groove et "Air" (silences)'
        ],
        tasks: [
           { id: 't4-3-1', text: 'Exercice de double-croches', isCompleted: false },
        ],
      },
      {
        id: 'm4-prac',
        title: 'PRATIQUE DU MODULE 4',
        description: 'Validation des acquis : Polyvalence Stylistique.',
        tasks: [
           { id: 't4-prac-1', text: 'Jouer une harmonie en Rock → Blues → Pop → Funk', isCompleted: false },
        ]
      }
    ]
  },
  {
    id: 'mod-5',
    title: 'MODULE 5',
    subtitle: 'FINALE : COMPOSITION DE VOTRE LIGNE DE BASSE',
    lessons: [
      {
        id: 'm5-l1',
        title: 'Leçon 1 — Architecture de la ligne de basse',
        description: 'Comprendre les rôles fondamentaux et les stratégies de construction.',
        details: [
          'Rôles : Rythme → Harmonie → Remplissage → Soutien',
          'Stratégies : Ostinato, Harmonique, Mélodique',
          'Interaction : Unisson, Doublage, Contraste',
          'Adaptation : Guitare vs Batterie'
        ],
        tasks: [
          { id: 't5-1-1', text: 'Analyser les rôles rythmiques', isCompleted: false },
          { id: 't5-1-2', text: 'Comprendre les changements de position', isCompleted: false },
          { id: 't5-1-3', text: 'Étudier les interactions d\'ensemble', isCompleted: false },
        ],
      },
      {
        id: 'm5-l2',
        title: 'Leçon 2 — Création de 4 Variantes',
        description: 'Appliquer 4 approches différentes sur une même progression (ex: Am – F – C – G).',
        tasks: [
          { id: 't5-2-1', text: 'Variante 1 : Ostinato + Fills (Stabilité + Ornements)', isCompleted: false },
          { id: 't5-2-2', text: 'Variante 2 : Ostinato + Grosse Caisse (Style Prog-Rock)', isCompleted: false },
          { id: 't5-2-3', text: 'Variante 3 : Jeu avec la Guitare (Unisson/Riff)', isCompleted: false },
          { id: 't5-2-4', text: 'Variante 4 : Fusion Totale (Guitare + Grosse Caisse)', isCompleted: false },
        ],
      },
      {
        id: 'm5-prac',
        title: 'PRATIQUE FINALE',
        description: 'Démontrer la maîtrise des 4 styles dans une performance continue.',
        details: [
          'Jouer 4 variantes distinctes de la même progression',
          '16–24 mesures par style (ou 8 minimum)',
          'Démontrer : Groove stable, contrôle rythmique, transitions fluides',
          'Dynamique et musicalité obligatoires'
        ],
        tasks: [
          { id: 'ex-1', text: 'Variante Ostinato + Fills', isCompleted: false },
          { id: 'ex-2', text: 'Variante Lock Grosse Caisse', isCompleted: false },
          { id: 'ex-3', text: 'Variante Unisson Guitare', isCompleted: false },
          { id: 'ex-4', text: 'Variante Combo (Fusion)', isCompleted: false },
          { id: 'ex-5', text: 'Performance complète', isCompleted: false },
        ],
      }
    ]
  }
];
