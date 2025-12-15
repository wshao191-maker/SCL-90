export interface Option {
  label: string;
  value: number;
  colorClass: string;
}

export interface Question {
  id: number;
  text: string;
}

export interface Factor {
  key: string;
  name: string;
  questionIds: number[];
  description: string;
}

export interface ScoreResult {
  factorName: string;
  score: number; // Average score (1-4)
  rawScore: number; // Sum
  description: string;
  severity: '无' | '轻度' | '中度' | '重度';
}
