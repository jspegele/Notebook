export const getVisiblePages = (pages, { tab, section }) => {
  return pages.filter(page => {
    const tabMatch = (tab === 'all' || tab === 'categories') ? !page.trash : (
      tab === 'favorites' ? page.favorite : (
        tab === 'trash' ? page.trash : (
          tab === 'uncategorized' ? (!page.section && !page.trash) : false
        )
      )
    )
    const sectionMatch = section ? page.section === section : true
    return tabMatch && sectionMatch
  })
}
