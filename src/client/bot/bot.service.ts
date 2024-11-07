// import { Category } from '@modules';
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { createReadStream } from 'fs';
// import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf';
// import * as path from 'path';
// import { Context } from 'telegraf';

// @Injectable()
// @Update()
// export class BotService {
//   constructor(@InjectModel(Category) private categoryModel: typeof Category) {}
//   @Action('start')
//   @Start()
//   async startBot(@Ctx() context: Context) {
//     const categories = await this.categoryModel.findAll();
//     context.reply('start chiqdi');
//     const categoryButtons = [];
//     for (let i = 0; i < categories.length; i += 2) {
//       const buttonRow = [];
//       buttonRow.push({
//         text: categories[i].name,
//         callback_data: `category_${categories[i].id}`,
//       });
//       if (i + 1 < categories.length) {
//         buttonRow.push({
//           text: categories[i + 1].name,
//           callback_data: `category_${categories[i + 1].id}`,
//         });
//       }
//       categoryButtons.push(buttonRow);
//     }

//     const imagepath = path.join(
//       __dirname,
//       '../../../',
//       'public',
//       'images',
//       'restaurant.jpg',
//     );
//     context.reply(imagepath);
//     await context.replyWithPhoto(
//       { source: createReadStream(imagepath) },
//       {
//         caption: 'Skill-showcase ga hush kelibsiz',
//         reply_markup: {
//           inline_keyboard: [
//             [
//               { callback_data: 'start', text: 'Start command' },
//               { callback_data: 'help', text: 'Help command' },
//             ],
//             [{ callback_data: 'categories', text: 'Taom turlari' }],
//           ],
//           resize_keyboard: true,
//           // keyboard: [
//           //     [{text: "Phone", request_contact: true}, {text: "Location", request_location: true}]
//           // ],
//           one_time_keyboard: true,
//         },
//       },
//     );
//   }

//   @Action('help')
//   @Command('help')
//   async helpCommand(@Ctx() context: Context): Promise<void> {
//     context.reply('Skill-Showcase botidan qanday yordam kerak');
//     // context.replyWithHTML(`<b>Botdagi komandalar:</b>
//     //         <i>start - botni qayta ishga tushurish</i>
//     //         <i>help - botdagi komandalarni ko'rish</i>
//     //         `);
//   }

//   @Action('menu')
//   @Command('menu')
//   async menuBot(@Ctx() context: Context): Promise<void> {
//     context.reply('menu');
//     // const categories = await this.categoryModel.findAll();
//     // const categoryButtons = [];
//     // const imagePath = path.join(
//     //   __dirname,
//     //   '../../../',
//     //   'public',
//     //   'images',
//     //   'image.png',
//     // );

//     // context.reply(imagePath);
//     // for (let i = 0; i < categories.length; i += 2) {
//     //   const buttonRow = [];
//     //   buttonRow.push({
//     //     text: categories[i].name,
//     //     callback_data: `category_${categories[i].id}`,
//     //   });
//     //   if (i + 1 < categories.length) {
//     //     buttonRow.push({
//     //       text: categories[i + 1].name,
//     //       callback_data: `category_${categories[i + 1].id}`,
//     //     });
//     //   }
//     //   categoryButtons.push(buttonRow);
//     // }
//   }
// }
import { Category } from '@modules';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createReadStream } from 'fs';
import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf';
import * as path from 'path';
import { Context } from 'telegraf';

@Injectable()
@Update()
export class BotService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  @Start()
  async startBot(@Ctx() context: Context) {
    try {
      // Kategoriyalarni DB'dan olish
      const categories = await this.categoryModel.findAll();
      if (!categories.length) {
        await context.reply('Kategoriyalar topilmadi');
        return;
      }

      // Kategoriya tugmalarini yaratish
      const categoryButtons = [];
      for (let i = 0; i < categories.length; i += 2) {
        const buttonRow = [];
        buttonRow.push({
          text: categories[i].name,
          callback_data: `category_${categories[i].id}`,
        });
        if (i + 1 < categories.length) {
          buttonRow.push({
            text: categories[i + 1].name,
            callback_data: `category_${categories[i + 1].id}`,
          });
        }
        categoryButtons.push(buttonRow);
      }

      // Rasmlarni yuborish yo'li
      const imagepath = path.join(
        __dirname,
        '../../../',
        'public',
        'images',
        'restaurant.jpg',
      );

      // Rasm bilan birga kategoriyalar tugmalari
      await context.replyWithPhoto(
        { source: createReadStream(imagepath) },
        {
          caption: 'Skill-showcase ga hush kelibsiz',
          reply_markup: {
            inline_keyboard: [
              ...categoryButtons, // Kategoriyalar tugmasini qo'shish
              [
                { callback_data: 'start', text: 'Start command' },
                { callback_data: 'help', text: 'Help command' },
              ],
              [{ callback_data: 'categories', text: 'Taom turlari' }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        },
      );
    } catch (error) {
      console.error('Xato:', error);
      await context.reply(
        'Botda xatolik yuz berdi. Keyinroq qayta urinib ko‘ring.',
      );
    }
  }

  @Command('help')
  async helpCommand(@Ctx() context: Context): Promise<void> {
    await context.reply('Skill-Showcase botidan qanday yordam kerak');
  }

  @Command('menu')
  async menuBot(@Ctx() context: Context): Promise<void> {
    await context.reply('Menyu');
  }

  @Command('video')
  async fileUpload(@Ctx() context: Context): Promise<void> {
    const videoUrl = 'https://www.youtube.com/watch?v=dr80c3kVZLo';

    await context.replyWithVideo(videoUrl, {
      caption: 'skill-showcase',
      reply_markup: {
        inline_keyboard: [
          [{ callback_data: 'Ortga', text: 'Ortga qaytish commandasi' }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }
}
