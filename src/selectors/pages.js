export const getVisiblePages = (pages, { tab, section, text, sort }) => {
  return pages.filter(page => {
    const textMatch = page.title.toLowerCase().includes(text.toLowerCase()) ||
      page.body.toLowerCase().includes(text.toLowerCase())
    const tabMatch = (tab === 'all' || tab === 'categories') ? !page.trash : (
      tab === 'favorites' ? page.favorite : (
        tab === 'trash' ? page.trash : (
          tab === 'uncategorized' ? (!page.section && !page.trash) : false
        )
      )
    )
    const sectionMatch = section ? page.section === section : true
    return textMatch && tabMatch && sectionMatch
  }).sort((a, b) => {
    if(sort === 'createdAsc') {
      return a.created > b.created ? 1 : -1
    } else if(sort === 'createdDesc') {
      return a.created < b.created ? 1 : -1
    } else if(sort === 'titleAsc') {
      return a.title > b.title ? 1 : -1
    } else if(sort === 'titleDesc') {
      return a.title < b.title ? 1 : -1
    } else {
      return a > b ? 1 : -1
    }
  })
}
