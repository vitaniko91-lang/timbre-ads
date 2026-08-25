// Type-only: augments Vitest's `Assertion` interface with jest-dom matchers
// (toBeInTheDocument, ...). Runtime registration happens via the side-effect
// import in vitest.setup.ts — this file adds no runtime code.
import '@testing-library/jest-dom/vitest'
