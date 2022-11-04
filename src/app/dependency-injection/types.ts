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

  /**
   * UserForgotPasswordPostController
   * @description Rest Controller to get the code to restore the password
   * @author acerohernan
   */
  UserForgotPasswordPostController: Symbol.for(
    "UserForgotPasswordPostController"
  ),

  /**
   * UserVerifyForgotPasswordPostController
   * @description Rest Controller to verify the forgot password code
   * @author acerohernan
   */
  UserVerifyForgotPasswordPostController: Symbol.for(
    "UserVerifyForgotPasswordPostController"
  ),

  /**
   * UserRestorePasswordPostController
   * @description Rest Controller to restore the user password with forgot password code
   * @author acerohernan
   */
  UserRestorePasswordPostController: Symbol.for(
    "UserRestorePasswordPostController"
  ),

  /**
   * UserGetController
   * @description Rest Controller to get the user information
   * @author acerohernan
   */
  UserGetController: Symbol.for("UserGetController"),

  /**
   * UserInformationPutController
   * @description Rest Controller to update the user information
   * @author acerohernan
   */
  UserInformationPutController: Symbol.for("UserInformationPutController"),

  /**
   * FileImagePostController
   * @description Rest Controller to upload an image
   * @author acerohernan
   */
  FileImagePostController: Symbol.for("FileImagePostController"),

  /**
   * UserStepsGetController
   * @description Rest Controller to get the user steps
   * @author acerohernan
   */
  UserStepsGetController: Symbol.for("UserStepsGetController"),

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

  /**
   * UserForgotPasswordHandler
   * @description Application Service to handler when a user forgot his password
   * @author acerohernan
   */
  UserForgotPasswordHandler: Symbol.for("UserForgotPasswordHandler"),

  /**
   * UserForgotPasswordVerifier
   * @description Application Service to verify the forgot password code
   * @author acerohernan
   */
  UserForgotPasswordVerifier: Symbol.for("UserForgotPasswordVerifier"),

  /**
   * UserPasswordRestorer
   * @description Application Service to to restore the password with the forgot password code
   * @author acerohernan
   */
  UserPasswordRestorer: Symbol.for("UserPasswordRestorer"),

  /**
   * UserGetter
   * @description Application Service to get the user information
   * @author acerohernan
   */
  UserGetter: Symbol.for("UserGetter"),

  /**
   * UserInformationUpdater
   * @description Application Service to update the user information
   * @author aceorhernan
   */
  UserInformationUpdater: Symbol.for("UserInformationUpdater"),

  /**
   * UserStepsFinder
   * @description Application Service to find the user steps
   * @author acerohernan
   */
  UserStepsFinder: Symbol.for("UserStepsFinder"),

  /**
   * UserStepsCreator
   * @description Application Service to create the user steps
   * @author acerohernan
   */
  UserStepsCreator: Symbol.for("UserStepsCreator"),

  /* DOMAIN EVENT SUBSCRIBERS */
  /**
   * DomainEventSubscriber
   * @description Name for all the domain event's subscribers
   * @author acerohernan
   */
  DomainEventSubscriber: Symbol.for("DomainEventSubscriber"),

  /* INFRAESTRUCTURE */
  /**
   * EnvironmentArranger
   * @description An environment arranger for the tests features
   * @author acerohernan
   */
  EnvironmentArranger: Symbol.for("EnvironmentArranger"),

  /**
   * EventBus
   * @description Asynchronous bus to send and consume the domain events
   * @author acerohernan
   */
  EventBus: Symbol.for("EventBus"),

  /**
   * RabbitMqConnection
   * @description RabbitMq connection
   * @author acerohernan
   */
  RabbitMqConnection: Symbol.for("RabbitMqConnection"),

  /**
   * UserRepository
   * @description Repository for user entity
   * @author acerohernan
   */
  UserRepository: Symbol.for("UserRepository"),

  /**
   * UserStepsRepository
   * @description Repository for user steps entity
   * @author acerohernan
   */
  UserStepsRepository: Symbol.for("UserStepsRepository"),
};
