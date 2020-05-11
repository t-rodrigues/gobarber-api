import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoute = Router();
const upload = multer(uploadConfig);

usersRoute.post('/', async (req, res) => {
  const { name, email, password, passwordConfirmation } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email: email.toLowerCase(),
    password,
    passwordConfirmation,
  });

  return res.json(user);
});

usersRoute.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  },
);

export default usersRoute;
