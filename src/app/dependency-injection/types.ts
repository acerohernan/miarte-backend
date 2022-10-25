export const CONTAINER_TYPES = {
  /* CONTROLLERS */

  /**
   * StatusGetController
   * @description Rest Controller to get the status of the server
   * @author acerohernan
   */
  StatusGetController: Symbol.for("StatusGetController"),

  /**
   * UserSignUpPostController
   * @description Rest Controller to create the user account
   * @author acerohernan
   */
  UserSignUpPostController: Symbol.for("UserSignUpPostController"),

  /**
   * UserLoginPostController
   * @description Rest Controller to authenticate a user
   * @author acerohernan
   */
  UserLoginPostController: Symbol.for("UserLoginPostController"),

  /* APPLICATION SERVICES */

  /**
   * UserSignuper
   * @description Application Service to signup a user
   * @author acerohernan
   */
  UserSignuper: Symbol.for("UserSignuper"),

  /**
   * UserAuthenticator
   * @description Application Service to authenticate an user
   * @author acerohernan
   */
  UserAuthenticator: Symbol.for("UserAuthenticator"),

  /* INFRAESTRUCTURE */
  /**
   * UserRepository
   * @description Repository for user entity
   * @author acerohernan
   */
  UserRepository: Symbol.for("UserRepository"),

  /**
   * EnvironmentArranger
   * @description An environment arranger for the tests features
   * @author acerohernan
   */
  EnvironmentArranger: Symbol.for("EnvironmentArranger"),
};
