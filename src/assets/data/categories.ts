type HexColor = `#${string}`
export type Category = {
  id: number
  title: string
  color: HexColor
}

export const categories: Category[] = [
  {
    id: 1,
    title: "Gulay",
    color: "#45B46A"
  },
  {
    id: 2,
    title: "Prutas",
    color: "#F7B038"
  },
  {
    id: 3,
    title: "Karne",
    color: "#E3504D"
  },
  {
    id: 4,
    title: "Isda",
    color: "#359CCE"
  },
  {
    id: 5,
    title: "Bigas at Butil",
    color: "#A8653A"
  },
  {
    id: 6,
    title: "Rekado",
    color: "#EE7839"
  },
]
