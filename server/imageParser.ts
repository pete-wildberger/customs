import { createWorker } from 'tesseract.js';

export const parseImage = async (image: string): Promise<string> => {
  try {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(image);
    return text;
  } catch (e) {
    console.log('Parse failure ', e);
    throw e;
  }
};
