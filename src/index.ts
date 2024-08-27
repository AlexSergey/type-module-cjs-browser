import { helloWorld } from './common/messages/message.js';

export const bootstrap = (): void => {
  global.console.log(helloWorld());
};

export { helloWorld };
