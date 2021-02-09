export const bind: MethodDecorator = (_, name, descriptor) => {
  const { value } = descriptor
  if (typeof value != 'function') return
  return { get() { return value.bind(this) } }
}