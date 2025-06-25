import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'variable',
    name: 'Variable',
    description: 'A symbol (usually a letter) that represents an unknown or changeable value in an expression or equation.'
  },
  {
    id: 'constant',
    name: 'Constant',
    description: 'A fixed value that does not change within a given mathematical context.'
  },
  {
    id: 'expression',
    name: 'Expression',
    description: 'A mathematical phrase that can contain numbers, variables, and operators, but does not include an equals sign.'
  },
  {
    id: 'equation',
    name: 'Equation',
    description: 'A mathematical statement that shows the equality of two expressions, typically containing an equals sign.'
  }
]; 