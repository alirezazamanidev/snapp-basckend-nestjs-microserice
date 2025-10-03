import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

export const swaggerConfig=(app:NestExpressApplication)=>{
    const theme = new SwaggerTheme();
    const darkStyle = theme.getBuffer(SwaggerThemeNameEnum.DARK);
    
    const config=new DocumentBuilder()
    .setTitle('Snapp api')
    .setDescription('Snapp api Documentation')
    .setVersion('1.0')
    .build();
    const document=SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('swagger',app,document, {
        customCss: darkStyle
    });
}