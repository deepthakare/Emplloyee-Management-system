export function notFound(req, res) {
  res.status(404).json({ error: 'Route not found' });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}
