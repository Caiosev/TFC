import UserModel from '../database/models/User';

export default class UserService {
  private userModel = UserModel;

  public async find(email: string): Promise<UserModel | null> {
    return this.userModel.findOne({ where: { email } })
      .then((user: UserModel | null) => user?.dataValues);
  }
}
