import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "@app/user/user.controller";
import { UserEntity } from "@app/user/user.entity";
import { UserService } from "@app/user/user.service";
import { AuthMiddleware } from "@app/user/middleware/auth.middleware";
import { AuthGuard } from "@app/user/guards/auth.guard";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
