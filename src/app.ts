import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { appConfig, dbConfig } from './config';
import { User, UserModule } from '@modules';
import { Category } from './modules/category/model/category.model';
import { CategoryModule } from './modules/category/category.module';
import { Project, ProjectModule } from './modules/projects';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UploadModule } from './upload';
import { jwtConfig } from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { TelegrafModule } from 'nestjs-telegraf';
import { ThrottlerModule } from '@nestjs/throttler';
import { BotModule } from './client';
// import { CheckAuthGuard } from './guards/check-auth.guard';
// import { APP_GUARD } from '@nestjs/core';
// import { CheckRoleGuard } from './guards/check-role.guard';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 30000,
        limit: 300,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, jwtConfig],
    }),
    ServeStaticModule.forRoot({
      serveRoot: './uploads',
      rootPath: './uploads',
    }),
    JwtModule.register({
      secret: 'secretKey',
      global: true,
      signOptions: {
        expiresIn: 60 * 15,
      },
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'psql',
            database: 'skillshowcase',
            // port: parseInt(process.env.DB_PORT),
            // host: process.env.DB_HOST,
            // dbName: process.env.DB_NAME,
            // password: process.env.DB_PASSWORD,
            // user: process.env.DB_USER,
            models: [Category, User, Project],
            synchronize: true,
            // sync: { force: true },
            logging: console.log,
            autoLoadModels: true,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
    TelegrafModule.forRoot({
      token: '7658731760:AAFGo4klsmzhyGKZMgTVr_et2QriLunfhuM',
      // token: process.env.TELEGRAM_BOT_TOKEN,
    }),
    UserModule,
    CategoryModule,
    ProjectModule,
    UploadModule,
    BotModule,
    AuthModule
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard
    // },
    // {
    //   useClass: CheckAuthGuard,
    //   provide: APP_GUARD,
    // },
    // {
    //   useClass: CheckRoleGuard,
    //   provide: APP_GUARD,
    // },
  ],
})
export class AppModule {}
