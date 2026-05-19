export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

sleep(5).then(() => {
  console.log("5 seconds passed");
});
