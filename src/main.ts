import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import * as morgan from 'morgan';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ExceptionHandlerFilter } from './filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  // COMPRESSION
  app.use(compression());

  // CORS enabled
  app.enableCors({
    origin: '*',
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const errorMsg = errors.map((err) =>
          Object.values(err.constraints).join(', '),
        );
        throw new BadRequestException(errorMsg.join(' && '));
      },
    }),
  );

  app.useGlobalFilters(new ExceptionHandlerFilter());

  // SET GLOBAL PREFIX TO /api/v1
  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('Skill-showcase')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  // USE MORGAN IN DEVELOPMENT MODE
  if (process.env.NODE_ENV == 'development') {    
    app.use(morgan('tiny'));
  }

  await app.listen(configService.get<number>('appConfig.port'), () => {
    console.log(`Listening on ${configService.get<number>('appConfig.port')}`);
  });
}
bootstrap();
