export const getVisiblePages = (pages, { tab, section }) => {
  return pages.filter(page => {
    const tabMatch = (tab === 'all' || tab === 'categories') ? !page.trash : (
      tab === 'favorites' ? page.favorite : (
        tab === 'trash' ? page.trash : false
      )
    )
    const sectionMatch = section ? page.section === section : true
    return tabMatch && sectionMatch
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