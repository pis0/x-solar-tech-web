/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

const log = (context: string, ...text: any[]): void => {
  // if (process.env.DEBUG)
  console.log(context, ...text);
};

export { log };
