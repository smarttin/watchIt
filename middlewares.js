import routes from './routes';

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'watchIT',
  res.locals.routes = routes,
  next();
}