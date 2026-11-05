import { DgaProvider, type DgaProviderProps } from '@dev-dga/react';

export type DgaUiProviderProps = DgaProviderProps;

/**
 * Wrap the app once. Upstream components read direction, locale and theme
 * from this context; local components read direction from the DOM, so a
 * single `dir` here drives both.
 */
export function DgaUiProvider({ dir = 'ltr', ...props }: DgaUiProviderProps) {
  return <DgaProvider dir={dir} {...props} />;
}
