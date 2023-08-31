import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { OpenAiApi } from '../lib/utils/llm';
import log from '../lib/utils/logger';

const router = Router();

/**
 * Post chat route
 * @route POST /iframe/chat
 * @group iframe - Operations about the chatbox iframe
 * @param {string} context.body.required - The context of the article
 * @param {string} prompt.body.required - The prompt itself
 * @returns {object} 200 - The response from the AI
 * @returns {Error}  default - Unexpected error
 */
router.post('/start', async (req: Request, res: Response) => {
  const chatId = uuidv4();
  const { context, prompt } = req.body;

  if (!prompt) {
    console.log(req.body);
    res.status(400).json({ message: 'Prompt is required' });
    return;
  }

  const openAiApi = new OpenAiApi();

  try {
    const aiMessage = await openAiApi.getSuggestion(prompt, context);
    res.status(200).json({ chatId, aiMessage });
  } catch (error: unknown) {
    log.error(`chat -> unknown error occured while getting the chat ${error}`);
    res.status(500).json({ message: 'Unknown error' });
  }
});

export default router;
