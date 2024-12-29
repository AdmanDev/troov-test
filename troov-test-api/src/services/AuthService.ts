import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/UserModel'
import { ApiError } from '../types/errors/ApiError'
import { User } from '../types/databases/User'
import { AccessTokenPayload } from '../types/auth/AccessTokenPayload'

/**
 * Service to manage authentication of users
 */
export class AuthService {
  /**
   * Register a new user
   * @param email The email of the user
   * @param psw The password of the user
   * @param pswConfirm The password confirmation
   * @returns The signed user
   */
  public static async registerUser(email: string, psw: string, pswConfirm: string) {
    if (psw !== pswConfirm) {
      throw new ApiError('Les mots de passe ne correspondent pas', 400)
    }

    const isUserAlreadyRegistered = await UserModel.exists({ email })

    if (isUserAlreadyRegistered) {
      throw new ApiError('Cet utilisateur existe deja', 400)
    }

    const hashedPassword = this.hashPassword(psw)

    const userData: Omit<User, '_id'> = {
      password: hashedPassword,
      email,
    }

    const user = new UserModel(userData)
    await user.save()

    return user
  }

  /**
   * Logs in a user
   * @param email The email of the user
   * @param psw The password of the user
   * @returns The access token
   */
  public static async logInUser(email: string, psw: string) {
    const user = await UserModel.findOne({ email })

    if (!user) {
      throw new ApiError('Email ou mot de passe incorrect', 404)
    }

    const isPasswordCorrect = bcrypt.compareSync(psw, user.password)

    if (!isPasswordCorrect) {
      throw new ApiError('Email ou mot de passe incorrect', 404)
    }

    const token = this.generateToken(user._id)

    return token
  }

  /**
   * Generates an access token
   * @param userId The user's id
   * @returns The access token
   */
  private static generateToken(userId: string) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string
    const expiresIn = process.env.ACCESS_TOKEN_EXPIRE_IN as string

    const accessTokenPayload: AccessTokenPayload = {
      userId,
    }

    return jwt.sign(
      accessTokenPayload,
      jwtSecretKey,
      { expiresIn },
    )
  }

  /**
   * Generate hashed password
   * @param psw The password to be hashed
   * @returns The hashed password
   */
  public static hashPassword(psw: string) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(psw, salt)
  }
}
