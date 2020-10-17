import React, { useContext } from 'react'
import { FiFile, FiStar, FiLayers, FiTrash } from 'react-icons/fi'
import { PagesContext } from '../contexts/pages'
import { FiltersContext } from '../contexts/filters'

import itemStyles from './style/ListItem.module.scss'

const AppNav = () => {
  const { pages } = useContext(PagesContext)
  const { filters, updateFilters } = useContext(FiltersContext)
  const favorites = pages.filter(page => page.favorite)
  const uncategorized = pages.filter(page => !page.section)
  const trash = pages.filter(page => page.trash)
  const currentSectionId = filters.section || null
  return (
    <div>
      <div
        className={(filters.tab === 'all' && !currentSectionId) ? itemStyles.activeItem : itemStyles.item}
        onClick={() => updateFilters({
          tab: 'all',
          section: null,
          page: pages[0].id
        })}
      >
        <div className={itemStyles.titleContainer}>
          <div className={itemStyles.title}>
            <div className={itemStyles.icon}><FiFile size="1.2rem" /></div>
            <div className={itemStyles.text}>All Notes</div>
          </div>
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
        <div className={itemStyles.titleContainer}>
          <div className={itemStyles.title}>
            <div className={itemStyles.icon}><FiStar size="1.2rem" /></div>
            <div className={itemStyles.text}>Favorites</div>
          </div>
        </div>
      </div>
      <div
        className={filters.tab === 'uncategorized' ? itemStyles.activeItem : itemStyles.item}
        onClick={() => updateFilters({
          tab: 'uncategorized',
          section: null,
          page: uncategorized.length ? uncategorized[0].id : null
        })}
      >
        <div className={itemStyles.titleContainer}>
          <div className={itemStyles.title}>
            <div className={itemStyles.icon}><FiLayers size="1.2rem" /></div>
            <div className={itemStyles.text}>Uncategorized</div>
          </div>
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
        <div className={itemStyles.titleContainer}>
          <div className={itemStyles.title}>
            <div className={itemStyles.icon}><FiTrash size="1.2rem" /></div>
            <div className={itemStyles.text}>Trash</div>
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default AppNav
