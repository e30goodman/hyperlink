
import { GoogleGenAI } from "@google/genai";
import { Message } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (userMessage: string, history: Message[]): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct a context-aware prompt
    const systemInstruction = `
      Tu es un professeur de guitare basse expert et bienveillant. Ton élève s'appelle Maja.
      Tu enseignes le programme "BassMastery" composé de 5 modules.
      
      CONTENU DU COURS :
      
      Module 1 : Carte Harmonique (Les 4 Blocs géométriques)
      - Les blocs : Mineur, Lydien, Mixolydien, Majeur.
      - L'algorithme de déplacement (pas d'un ton, collage de blocs).
      
      Module 2 : Rythmique
      - Subdivisions 1e&a, accents, métronome.
      - Ghost notes, syncopes.
      
      Module 3 : Architecture
      - Leading tones (approches), Octaves.
      - Fills comme ponts (Rythmique, Mélodique).
      
      Module 4 : Styles
      - Rock (croches, attaque), Blues (Shuffle).
      - Pop/Soul (Groove flow, dynamique).
      - Funk (16ths, ghosts, silence).
      
      Module 5 : Finale (Composition)
      - Architecture de ligne.
      - Création de 4 variantes sur une progression (Ostinato, Lock Grosse Caisse, Unisson Guitare, Fusion).
      
      Réponds toujours en Français. Sois concis, encourageant et technique mais accessible.
      Si Maja pose une question, utilise les concepts des modules ci-dessus.
    `;

    const contents = [
      ...history.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] })),
      { role: 'user', parts: [{ text: userMessage }] }
    ];

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Désolé, je n'ai pas pu générer de réponse pour le moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Une erreur s'est produite lors de la connexion au professeur virtuel. Vérifiez votre clé API.";
  }
};
