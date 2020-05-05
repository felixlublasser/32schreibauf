import { Coords, Area } from '@/models/utils'

function coordsInArea (coords: Coords, area: Area) {
  return coords.x >= area.left &&
    coords.x <= area.right &&
    coords.y >= area.top &&
    coords.y <= area.bottom
}

export function areasOverlap (area1: Area, area2: Area) {
  return coordsInArea({ x: area1.left, y: area1.top }, area2) ||
    coordsInArea({ x: area1.left, y: area1.bottom }, area2) ||
    coordsInArea({ x: area1.right, y: area1.top }, area2) ||
    coordsInArea({ x: area1.right, y: area1.bottom }, area2)
}
