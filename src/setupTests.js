import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Corrige problemas com TextEncoder/TextDecoder em Jest
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
