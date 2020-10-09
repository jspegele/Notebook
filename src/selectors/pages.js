export const getVisiblePages = (pages, { group, section }) => {
  return pages.filter(page => {
    const groupMatch = group === 'all' ? !page.trash : (
      group === 'favorites' ? page.favorite : (
        group === 'trash' ? page.trash : false
      )
    )
    const sectionMatch = section ? page.section === section : true
    return groupMatch && sectionMatch
  })
}


// Get visible expenses

// export const visibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
//   return expenses.filter((expense) => {
//     const createdAtMoment = moment(expense.createdAt);
//     const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
//     const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
//     const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) || expense.tags.includes(text.toLowerCase());

//     return startDateMatch && endDateMatch && textMatch;
//   }).sort((a, b) => {
//     if(sortBy === 'date') {
//       return a.createdAt < b.createdAt ? 1 : -1;
//     } else if(sortBy === 'amount') {
//       return a.amount < b.amount ? 1 : -1;
//     }
//   });
// };