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
 * @property { any } onClickTile
 * @property { any } onClickList
 * @property { any } onClickBreadcrumb
 */
interface ListDisplayProps {
    tile?: boolean,
    list?: boolean,
    breadcrumb?: boolean,
    // TODO: onClick: any
    onClickTile?: any,
    onClickList?: any,
    onClickBreadcrumb?: any
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
            <div className="common-listdisplay-buttons">
                { props.tile ? 
                    <IconButton title="Tile View" 
                        icon={ faGripHorizontal } 
                        onClick={ props.onClickTile } 
                    /> : null 
                }

                { props.list ? 
                    <IconButton title="List View" 
                        icon={ faList } 
                        onClick={ props.onClickList } 
                    /> : null 
                }
                
                { props.breadcrumb ? 
                    <IconButton title="Breadcrumbs View" 
                        icon={ faBreadSlice } 
                        onClick={ props.onClickBreadcrumb } 
                    /> : null 
                }
            </div>
        </div>
    );
};

export default ListDisplay;