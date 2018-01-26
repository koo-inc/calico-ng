export function isPrimitive(value: any) {
  return Object(value) !== value;
}
