import { Question } from '../types';

export const questions: Question[] = [
  // Variables
  { number: 'x', correctCategory: 'variable' },
  { number: 'y', correctCategory: 'variable' },
  { number: 'a', correctCategory: 'variable' },
  { number: 'm', correctCategory: 'variable' },
  { number: 'z', correctCategory: 'variable' },

  // Constants
  { number: '5', correctCategory: 'constant' },
  { number: '-3', correctCategory: 'constant' },
  { number: '12', correctCategory: 'constant' },
  { number: '0', correctCategory: 'constant' },
  { number: '-7', correctCategory: 'constant' },

  // Expressions
  { number: '2x + 3', correctCategory: 'expression' },
  { number: 'y - 5', correctCategory: 'expression' },
  { number: 'a^2 + 4a + 4', correctCategory: 'expression' },
  { number: '3m - 7', correctCategory: 'expression' },
  { number: 'x/2 + 1', correctCategory: 'expression' },

  // Equations
  { number: 'x + 2 = 5', correctCategory: 'equation' },
  { number: '2y - 3 = 7', correctCategory: 'equation' },
  { number: 'a^2 = 16', correctCategory: 'equation' },
  { number: '3m - 7 = 2', correctCategory: 'equation' },
  { number: 'x/2 + 1 = 4', correctCategory: 'equation' },
]; 