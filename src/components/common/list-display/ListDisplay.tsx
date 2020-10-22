// React
import React from 'react';

// Components
import IconButton from '../../common/icon-button/IconButton';

// Font Awesome
import { faGripHorizontal, faList, faBreadSlice } from '@fortawesome/free-solid-svg-icons';

// Styles
import './ListDisplay.scss';

/**
 * @interface ListDisplayProps
 * @description The acceptable props for the list display component
 * @author J.T.
 * @property { boolean } tile
 * @property { boolean } list
 * @property { boolean } breadcrumb
 * @property { boolean } isTileActive
 * @property { boolean } isListActive
 * @property { boolean } isBreadcrumbActive
 * @property { function } onClickTile
 * @property { function } onClickList
 * @property { function } onClickBreadcrumb
 */
interface ListDisplayProps {
    tile?: boolean,
    list?: boolean,
    breadcrumb?: boolean,
    isTileActive?: boolean,
    isListActive?: boolean,
    isBreadcrumbActive?: boolean,
    onClickTile?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    onClickList?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    onClickBreadcrumb?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};

/**
 * @function ListDisplay
 * @summary List Display Component
 * @description A component to toggle the appearance of a collection of items.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const ListDisplay: React.FunctionComponent<ListDisplayProps> = (props) => {
    return (
        <div className="common-listdisplay">
            <div className="common-listdisplay__buttons">
                { props.tile ? 
                    <IconButton title="Tile View" 
                        icon={ faGripHorizontal } 
                        active={ props.isTileActive }
                        size="small"
                        onClick={ props.onClickTile ? props.onClickTile : () => null }
                    /> : null 
                }

                { props.list ? 
                    <IconButton title="List View" 
                        icon={ faList } 
                        active={ props.isListActive }
                        size="small"
                        onClick={ props.onClickList ? props.onClickList : () => null }
                    /> : null 
                }
                
                { props.breadcrumb ? 
                    <IconButton title="Breadcrumbs View" 
                        icon={ faBreadSlice } 
                        active={ props.isBreadcrumbActive }
                        size="small"
                        onClick={ props.onClickBreadcrumb ? props.onClickBreadcrumb : () => null }
                    /> : null 
                }
            </div>
        </div>
    );
};

ListDisplay.defaultProps = {
    tile: false,
    list: false,
    breadcrumb: false,
    isTileActive: false,
    isListActive: false,
    isBreadcrumbActive: false
}

export default ListDisplay;