import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        transformOptions: {
          enableCircularCheck: true,
        },
      }),
    );
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector), {
        enableCircularCheck: true,
        enableImplicitConversion: true,
        exposeUnsetFields: false,
      }),
    );

    const options = new DocumentBuilder()
      .setTitle('Klaim api')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(process.env.API_GATEWAY_PORT);
  } catch (error) {
    throw new Error(`Global express error: ${JSON.stringify(error)}`);
  }
}
bootstrap();
