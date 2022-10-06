const validateRate = (request, response, next) => {
  const { talk: { rate } } = request.body;
  if (!rate) {
    return response.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (Number(rate) < 1 || Number(rate) > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = validateRate;