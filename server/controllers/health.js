import responder from './../util/responder.js';

export const getHealth = (req, res) => {
  responder(res, null, 'Email already exists', false);
};
