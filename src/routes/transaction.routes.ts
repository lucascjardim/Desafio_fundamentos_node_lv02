import { Router } from 'express';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const transactionRepository = new TransactionsRepository();

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionRepository.all();
    const balance = transactionRepository.getBalance();
    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type }: Transaction = request.body;

    const createTransactionService = new CreateTransactionService(
      transactionRepository,
    );
    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
