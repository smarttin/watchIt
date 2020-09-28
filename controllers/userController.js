import passport from 'passport';
import User from '../models/userModel';
import routes from '../routes';

export const getJoin = (req, res) => res.render('join', {pageTitle: 'Join'});

export const postJoin = async (req, res, next) => {
  const {
    body: {name, email, password, password2},
  } = req;
  if (password !== password2) {
    // req.flash('error', "Passwords don't match");
    res.status(400);
    res.render('join', {pageTitle: 'Join'});
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => res.render('login', {pageTitle: 'Login'});
export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  // successFlash: "Welcome",
  // failureFlash: "Can't log in. Check email and/or password"
});

export const logout = (req, res) => {
  // req.flash("info", "Logged out, see you later");
  req.logout();
  res.redirect(routes.home);
};

export const githubLogin = passport.authenticate(
  'github',
  //  {
  //   successFlash: 'Welcome',
  //   failureFlash: "Can't log in at this time",
  // }
);

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {id, avatar_url: avatarUrl, name, email},
  } = profile;
  try {
    const user = await User.findOne({email});
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('videos');
    res.render('userDetail', {pageTitle: 'User Detail', user});
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const facebookLogin = passport.authenticate('facebook',
//  {
//   successFlash: 'Welcome',
//   failureFlash: "Can't log in at this time",
// }
);

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {id, name, email},
  } = profile;
  try {
    const user = await User.findOne({email});
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const userDetail = async (req, res) => {
  const {
    params: {id},
  } = req;
  try {
    const user = await User.findById(id).populate('videos');
    res.render('userDetail', {pageTitle: 'User Detail', user});
  } catch (error) {
    // req.flash("error", "User not found");
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) => res.render('editProfile', {pageTitle: 'Edit Profile'});
export const changePassword = (req, res) =>
  res.render('changePassword', {pageTitle: 'Change Password'});
