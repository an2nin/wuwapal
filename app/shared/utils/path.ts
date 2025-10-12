export function toFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/_/g, '-') // underscore to dash
    .replace(/ /g, '-') // space to dash
    .replace(/#/g, '') // remove #
    .replace(/'/g, '') // remove apostrophes
    .replace(/:/g, '') // remove colons
    .replace(/&/g, 'n') // remove ampersands
    .replace(/\(|\)/g, ''); // remove parentheses
}
