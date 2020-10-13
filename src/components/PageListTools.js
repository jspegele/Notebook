import React, { useContext, useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu'
import { BiSortDown } from 'react-icons/bi'
import { FiArrowUp, FiArrowDown } from 'react-icons/fi'
import { FiltersContext } from '../contexts/filters'

import styles from './style/PageListTools.module.scss'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'center',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'center',
      horizontal: 'center',
    }}
    {...props}
  />
));

const PageListTools = () => {
  const { filters, updateFilters } = useContext(FiltersContext)
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopup = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopup = () => {
    setAnchorEl(null)
  }

  const handleSort = sort => {
    handleClosePopup()
    updateFilters({
      sort
    })
  }

  return (
    <div className={styles.tools}>
      <button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handlePopup}
      >
        {filters.sort === 'createdAsc' ? (
          <span>Created <FiArrowUp /></span>
        ) : (
          filters.sort === 'createdDesc' ? (
            <span>Created <FiArrowDown /></span>
          ) : (
            filters.sort === 'titleAsc' ? (
              <span>Title <FiArrowUp /></span>
            ) : (
              filters.sort === 'titleDesc' ? (
                <span>Title <FiArrowDown /></span>
              ) : (
                <span>Sort Notes</span>
              )
            )
          )
        )}
        
      </button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClosePopup}
      >
        <span className={styles.title}>Sort Notes</span>
        <ul className={styles.menu}>
          {filters.sort === 'createdDesc' ? (
            <li onClick={() => handleSort('createdAsc')}><FiArrowUp />Created</li>
          ) : (
            <li onClick={() => handleSort('createdDesc')}><FiArrowDown />Created</li>
          )}
          {filters.sort === 'titleAsc' ? (
            <li onClick={() => handleSort('titleDesc')}><FiArrowDown />Title</li>
          ) : (
            <li onClick={() => handleSort('titleAsc')}><FiArrowUp />Title</li>
          )}
        </ul>
      </StyledMenu>
    </div>
  )
}
 
export default PageListTools
