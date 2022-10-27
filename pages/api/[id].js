// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const names = [
  { id: 1, name: "Maher" },
  { id: 2, name: "Sam" },
  { id: 3, name: "John" },
  { id: 4, name: "Maher" },
  { id: 5, name: "Sam" },
  { id: 6, name: "John" },
  { id: 7, name: "Maher" },
  { id: 8, name: "Sam" },
  { id: 9, name: "John" },
];
export default function handler(req, res) {
  const { id } = req.query;
  if (id) {
    let newNames = names.slice(0, id);
    res.status(200).json(newNames);
  } else {
    res.status(200).json(names);
  }
}
