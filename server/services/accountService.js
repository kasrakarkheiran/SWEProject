// Function to split database logic from controllers, used both by signup function and create account function
async function createAccountInDb(db, accountObj) {

  const result = await db.collection('accounts').insertOne(accountObj)

  const inserted = await db.collection('accounts').findOne({ _id: result.insertedId })

  if (inserted) delete inserted.password
  return inserted
}
module.exports = { createAccountInDb }