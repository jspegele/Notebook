import React, { useContext } from 'react'
import { FiFile, FiStar, FiTrash } from 'react-icons/fi'
import { PagesContext } from '../contexts/pages'
import { FiltersContext } from '../contexts/filters'
import SectionList from './SectionList'

import styles from './style/AppSidebar.module.scss'
import itemStyles from './style/ListItem.module.scss'

const AppSidebar = ({ visibleSections, currentSectionId }) => {
  const { pages } = useContext(PagesContext)
  const favorites = pages.filter(page => page.favorite)
  const trash = pages.filter(page => page.trash)
  const { filters, updateFilters } = useContext(FiltersContext)
  return (
    <div className={styles.sidebar}>
      <div
        className={(filters.tab === 'all' && !currentSectionId) ? itemStyles.activeItem : itemStyles.item}
        onClick={() => updateFilters({
          tab: 'all',
          section: null,
          page: pages[0].id
        })}
      >
        <div className={itemStyles.title}>
          <div className={itemStyles.icon}><FiFile size="1.2rem" /></div>
          <div className={itemStyles.text}>All Notes</div>
        </div>
      </div>
      <div
        className={filters.tab === 'favorites' ? itemStyles.activeItem : itemStyles.item}
        onClick={() => updateFilters({
          tab: 'favorites',
          section: null,
          page: favorites.length ? favorites[0].id : null
        })}
      >
        <div className={itemStyles.title}>
          <div className={itemStyles.icon}><FiStar size="1.2rem" /></div>
          <div className={itemStyles.text}>Favorites</div>
        </div>
      </div>
      <div
        className={filters.tab === 'trash' ? itemStyles.activeItem : itemStyles.item}
        onClick={() => updateFilters({
          tab: 'trash',
          section: null,
          page: trash.length ? trash[0].id : null
        })}
      >
        <div className={itemStyles.title}>
          <div className={itemStyles.icon}><FiTrash size="1.2rem" /></div>
          <div className={itemStyles.text}>Trash</div>
        </div>
      </div>
      <div className={styles.sectionHeader}>Categories</div>
      <SectionList
        visibleSections={visibleSections}
        currentSectionId={currentSectionId}
      />
    </div>
  )
}
 
export default AppSidebar
