import { createWorker } from 'tesseract.js';

export const parseImage = async (image: string): Promise<string> => {
  try {
    console.log('Parsing started');
    const worker = createWorker({
      logger: (m) => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(image);
    await worker.terminate();
    return text;
  } catch (e) {
    console.log('Parse failure ', e);
    throw e;
  }
};
