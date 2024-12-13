import { ModeType } from '@yuanfudao/ada-school-utils';

export const APP_MODE = process.env.APP_MODE as ModeType;
console.log(`APP_MODE: ${APP_MODE}`);
