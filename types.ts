
export enum Mode {
  FACT_CHECK = 'Fact-check',
  ROAST = 'Roast',
  ANALYSIS = 'Analysis'
}

export interface GeminiResponse {
  id: string;
  originalText: string;
  processedText: string;
  mode: Mode;
  timestamp: number;
}

export type ViewState = 'compose' | 'result' | 'history' | 'settings' | 'viewer';
