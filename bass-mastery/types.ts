
export interface SubTask {
  id: string;
  text: string;
  isCompleted: boolean;
  details?: string; // Additional text shown when expanded
  imageUrls?: string[]; // Default/Placeholder URLs
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  details?: string[]; // Bullet points for theory
  tasks: SubTask[];
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  lessons: Lesson[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
