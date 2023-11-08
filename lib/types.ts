export type ActionResult =
  | { type: 'none' }
  | { type: 'success'; message: string }
  | { type: 'failure'; message: string };
