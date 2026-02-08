export interface ImageItem {
  src: string
  blockType: "half" | "full"
  offsetTop: number
  offsetRight: number
}

export interface Category {
  id: number
  title: string
  previewImage: string
  description: string[]
  images: readonly ImageItem[]
}

export type CategoryId = number
