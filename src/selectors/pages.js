export const getVisiblePages = (pages, { tab, section, text }) => {
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
  })
}
