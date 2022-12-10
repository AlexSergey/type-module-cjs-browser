import { helloWorld } from './common/messages/message.js';

export const bootstrap = (): void => {
  // eslint-disable-next-line no-console
  global.console.log(helloWorld());
};

export { helloWorld };
