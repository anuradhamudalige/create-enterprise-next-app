import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import { TextDecoder, TextEncoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });