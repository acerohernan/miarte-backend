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

  /* APPLICATION SERVICES */

  /**
   * UserSignuper
   * @description Application Service to signup a user
   * @author acerohernan
   */
  UserSignuper: Symbol.for("UserSignuper"),
};
