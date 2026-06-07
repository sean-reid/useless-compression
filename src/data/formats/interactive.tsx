import BCompressor from '@/components/BCompressor'

// id → component for the few formats that actually run.
export const INTERACTIVE: Record<string, () => JSX.Element> = {
  'b-compress': () => <BCompressor />,
}
