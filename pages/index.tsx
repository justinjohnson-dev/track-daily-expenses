import ExpenseForm from '../components/expense/expenseForm';
import IncomeForm from '../components/income/incomeForm';

export default function Home() {
  return (
    <>
      <div
        style={{
          width: '90%',
          margin: '25px auto 65px auto',
        }}
      >
        <ExpenseForm />
      </div>

      <div
        style={{
          width: '90%',
          margin: '50px auto',
        }}
      >
        <IncomeForm />
      </div>
    </>
  );
}
