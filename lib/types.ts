export type ActionResult<TResult extends Record<string, unknown> = {}> =
  | { type: 'none' }
  | (TResult & { type: 'success' })
  | (TResult & { type: 'failure' });

export type MessageActionResult<TMessage extends string = string> =
  ActionResult<{ message: TMessage }>;
export type OptionalMessageActionResult<TMessage extends string = string> =
  ActionResult<{ message?: TMessage }>;
