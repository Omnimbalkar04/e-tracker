import { Budget } from "../models/budget.model.js";

export const getBudget = async (req, res) => {
  try {
    const budgets = await Budget.find({ author: req.user._id
   })
   .populate("author", "name username profilePicture");

   res.status(200).json(budgets);
  } catch (error) {
    console.error("Error in getBudget", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createBudget = async (req, res) => {
  try {
    const { setbudget, setincome } = req.body;
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    let budget = await Budget.findOne({ author:req.user._id,  month: currentMonth, year: currentYear })

    if(budget) {
      budget.setincome = setincome;
      budget.setbudget = setbudget;

      await budget.save();
    } else {
      budget = new Budget({
        author:req.user._id,
        setbudget,
        setincome,
        month: currentMonth,
        year: currentYear
      })

      await budget.save();
    }   

    res.status(201).json(budget);
  } catch (error) {
    console.error("Error in createBudget", error.message);
    res.status(500).json({ message: "Server Error" });
  }
}


export const addExpense = async(req, res) => {
  try{
  const expenseId = req.params.id;
  const { enteramount, reason, paid, category } = req.body;

  const budget = await Budget.findByIdAndUpdate(expenseId, {
    $push: { expenses: { user:req.user._id, enteramount, reason, paid, category } },
  },
  { new: true }
).populate("author","name email username profilePicture " );

   res.status(200).json(budget);
} catch (error) {
  console.error("Error in addExpense", error.message);
  res.status(500).json({ message: "Server Error" });
}
}